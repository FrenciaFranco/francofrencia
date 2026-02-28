"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useEffect, memo } from "react";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import { Mesh } from "three";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from "three/tsl";

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" };
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" };
const TITLE_WORDS = ["Build", "Your", "Dreams"] as const;
type WebGpuRendererOptions = ConstructorParameters<typeof THREE.WebGPURenderer>[0];

function setNumericUniform(target: { value: number }, next: number) {
  target.value = next;
}

function setVectorUniform(target: { value: THREE.Vector2 }, next: THREE.Vector2) {
  target.value.copy(next);
}

extend(THREE as unknown as never);

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const scanProgress = useMemo(() => uniform(0), []);

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as unknown as THREE.WebGPURenderer);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const scanPos = float(scanProgress);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect, scanProgress]);

  useFrame(({ clock }) => {
    setNumericUniform(scanProgress, Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    void render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<Mesh>(null);
  const uPointer = useMemo(() => uniform(new THREE.Vector2(0, 0)), []);
  const uProgress = useMemo(() => uniform(0), []);
  const visible = Boolean(rawMap && depthMap);

  const material = useMemo(() => {
    const tDepthMap = texture(depthMap);
    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(0.01))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap;

    // @ts-expect-error — three/tsl vec4/float mismatch, works at runtime
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
    const mask = dot.mul(flow).mul(vec3(10, 0, 0));
    const final = blendScreen(tMap, mask);

    const mat = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return mat;
  }, [rawMap, depthMap, uPointer, uProgress]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    setNumericUniform(uProgress, Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    const currentMaterial = meshRef.current?.material;
    if (currentMaterial && !Array.isArray(currentMaterial) && typeof currentMaterial.opacity === "number") {
      currentMaterial.opacity = THREE.MathUtils.lerp(currentMaterial.opacity, visible ? 1 : 0, 0.07);
    }
  });

  useFrame(({ pointer }) => {
    setVectorUniform(uPointer, pointer);
  });

  return (
    <mesh ref={meshRef} scale={[w * 0.4, h * 0.4, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};

/*
 * Canvas is memo'd and fully isolated — no parent state can cause it to re-render.
 * This is the key performance fix: text animation setState calls won't interrupt the GPU.
 */
const HeroCanvas = memo(function HeroCanvas() {
  return (
    <Canvas
      flat
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer(props as WebGpuRendererOptions);
        await renderer.init();
        return renderer;
      }}
    >
      <PostProcessing fullScreenEffect={true} />
      <Scene />
    </Canvas>
  );
});

/*
 * Text overlay — manages its own animation state, completely separate from Canvas.
 * Uses refs + CSS classes instead of React state for the actual visual transitions.
 */
function HeroOverlay() {
  const subtitle = "AI-powered creativity for the next generation.";
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal words one by one using direct DOM manipulation — zero React re-renders
    TITLE_WORDS.forEach((_, i) => {
      setTimeout(() => {
        const el = wordRefs.current[i];
        if (el) {
          el.classList.add("fade-in");
          el.style.animationDelay = `${i * 0.05 + Math.random() * 0.07}s`;
        }
      }, i * 600);
    });

    // Reveal subtitle after all words
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.classList.add("fade-in-subtitle");
        subtitleRef.current.style.animationDelay = `${Math.random() * 0.1}s`;
      }
    }, TITLE_WORDS.length * 600 + 800);
  }, []);

  return (
    <div className="h-svh uppercase items-center w-full absolute z-60 pointer-events-none px-10 flex justify-center flex-col">
      <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
        <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-white">
          {TITLE_WORDS.map((word, i) => (
            <div
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              style={{ opacity: 0 }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold">
        <div ref={subtitleRef} style={{ opacity: 0 }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export const HeroFuturistic = () => {
  return (
    <div className="relative h-svh w-full">
      <HeroOverlay />

      <button
        className="explore-btn"
        style={{ animationDelay: "2.2s" }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        Scroll to explore
        <span className="explore-arrow">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrow-svg"
          >
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <HeroCanvas />
    </div>
  );
};

export default HeroFuturistic;
