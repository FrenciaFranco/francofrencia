import type { ServiceCategory, ServiceItem } from "./servicesConfig";

export interface PricingTotals {
  oneTime: number;
  monthly: number;
}

export interface SelectedByCategory {
  categoryId: string;
  items: ServiceItem[];
}

export function calculateTotals(
  selectedIds: Set<string>,
  categories: ServiceCategory[]
): PricingTotals {
  let oneTime = 0;
  let monthly = 0;

  for (const category of categories) {
    for (const item of category.items) {
      if (selectedIds.has(item.id)) {
        if (item.billingType === "one_time") {
          oneTime += item.price;
        } else {
          monthly += item.price;
        }
      }
    }
  }

  return { oneTime, monthly };
}

export function getSelectedByCategory(
  selectedIds: Set<string>,
  categories: ServiceCategory[]
): SelectedByCategory[] {
  const result: SelectedByCategory[] = [];

  for (const category of categories) {
    const items = category.items.filter((item) => selectedIds.has(item.id));
    if (items.length > 0) {
      result.push({ categoryId: category.id, items });
    }
  }

  return result;
}

export function formatPrice(amount: number): string {
  return `€${amount.toLocaleString("de-DE")}`;
}
