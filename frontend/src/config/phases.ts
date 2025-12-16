import type { PhaseId } from "../types/phases";

export type PhaseConfig = {
  id: PhaseId;
  label: string;
  shortLabel: string;
  description: string;
  order: number;
};

export const PHASE_CONFIG: Record<PhaseId, PhaseConfig> = {
  onboarding: {
    id: "onboarding",
    label: "Onboarding",
    shortLabel: "Onboarding",
    description: "Agreement, KYC, initial payment and account setup.",
    order: 1,
  },
  planninganddesign: {
    id: "planninganddesign",
    label: "Planning & Design",
    shortLabel: "Planning",
    description: "Design plan, budgets, material selection.",
    order: 2,
  },
  travel: {
    id: "travel",
    label: "Travel",
    shortLabel: "Travel",
    description: "Flights, hotels, visas and itinerary.",
    order: 3,
  },
  shopping: {
    id: "shopping",
    label: "Shopping",
    shortLabel: "Shopping",
    description: "Market visits, supplier meetings, product selection.",
    order: 4,
  },
  ordering: {
    id: "ordering",
    label: "Ordering",
    shortLabel: "Ordering",
    description: "Purchase orders, confirmations, payments.",
    order: 5,
  },
  production: {
    id: "production",
    label: "Production",
    shortLabel: "Production",
    description: "Manufacturing, QC, inspections.",
    order: 6,
  },
  delivery: {
    id: "delivery",
    label: "Delivery",
    shortLabel: "Delivery",
    description: "Shipping, customs, final delivery.",
    order: 7,
  },
  installation: {
    id: "installation",
    label: "Installation",
    shortLabel: "Installation",
    description: "On-site installation and handover.",
    order: 8,
  },
};

export const ALL_PHASE_IDS: PhaseId[] = [
  "onboarding",
  "planninganddesign",
  "travel",
  "shopping",
  "ordering",
  "production",
  "delivery",
  "installation",
];
