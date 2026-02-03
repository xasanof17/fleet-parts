import type { Part, StatePricing, ComputedPrice } from "./types";

export function calculatePrice(
  part: Part,
  stateCode: string
): ComputedPrice | null {
  const statePricing = part.statePricing?.find(
    (sp) => sp.stateCode === stateCode
  );

  if (!statePricing) {
    return null;
  }

  const basePrice = statePricing.baseOverride ?? part.basePrice;
  const taxRate = statePricing.taxRate;
  const taxAmount = basePrice * (taxRate / 100);
  const finalPrice = basePrice + taxAmount;

  return {
    basePrice,
    taxRate,
    taxAmount,
    finalPrice,
    stateCode,
  };
}

export function calculateAllStatePrices(part: Part): ComputedPrice[] {
  if (!part.statePricing) return [];

  return part.statePricing
    .map((sp) => calculatePrice(part, sp.stateCode))
    .filter((price): price is ComputedPrice => price !== null);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${rate.toFixed(2)}%`;
}
