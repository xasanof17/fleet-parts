export interface StatePricing {
  stateCode: string;
  taxRate: number;
  baseOverride?: number;
}

export interface PartSEO {
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
}

export interface Part {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  compatibleTrucks?: string[];
  images?: string[];
  basePrice: number;
  statePricing?: StatePricing[];
  notes?: string;
  seo?: PartSEO;
}

export interface ComputedPrice {
  basePrice: number;
  taxRate: number;
  taxAmount: number;
  finalPrice: number;
  stateCode: string;
}

export type ViewMode = "cards" | "table" | "grid";

export const STATE_NAMES: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export const CATEGORY_LABELS: Record<string, string> = {
  engine: "Engine",
  transmission: "Transmission",
  brakes: "Brakes",
  suspension: "Suspension",
  electrical: "Electrical",
  body: "Body",
  exhaust: "Exhaust",
  cooling: "Cooling",
  "fuel-system": "Fuel System",
  other: "Other",
};
