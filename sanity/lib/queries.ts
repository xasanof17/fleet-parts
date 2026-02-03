import { groq } from "next-sanity";

export const partsQuery = groq`
  *[_type == "part" && !isArchived] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    category,
    description,
    compatibleTrucks,
    "images": images[].asset->url,
    basePrice,
    statePricing[] {
      stateCode,
      taxRate,
      baseOverride
    },
    seo
  }
`;

export const partBySlugQuery = groq`
  *[_type == "part" && slug.current == $slug && !isArchived][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    category,
    description,
    compatibleTrucks,
    "images": images[].asset->url,
    basePrice,
    statePricing[] {
      stateCode,
      taxRate,
      baseOverride
    },
    notes,
    seo
  }
`;

export const categoriesQuery = groq`
  array::unique(*[_type == "part" && !isArchived].category)
`;

export const partSlugsQuery = groq`
  *[_type == "part" && !isArchived] {
    "slug": slug.current
  }
`;
