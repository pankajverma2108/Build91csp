import {
  Lightbulb,
  Plane,
  ShoppingCart,
  Factory,
  Truck,
  Hammer,
  LucideIcon,
} from 'lucide-react';

export type StageCode = 'PLANNING' | 'TRAVEL' | 'ORDERING' | 'MANUFACTURING' | 'DELIVERY' | 'INSTALLATION';

export interface StageConfig {
  stageCode: StageCode;
  label: string;
  description: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

export const STAGE_CONFIGS: Record<StageCode, StageConfig> = {
  PLANNING: {
    stageCode: 'PLANNING',
    label: 'Planning',
    description: 'Initial planning and requirements gathering',
    color: 'blue',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    icon: Lightbulb,
  },
  TRAVEL: {
    stageCode: 'TRAVEL',
    label: 'Travel',
    description: 'Travel to China for sourcing',
    color: 'purple',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-300',
    icon: Plane,
  },
  ORDERING: {
    stageCode: 'ORDERING',
    label: 'Ordering',
    description: 'Placing orders with suppliers',
    color: 'orange',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    icon: ShoppingCart,
  },
  MANUFACTURING: {
    stageCode: 'MANUFACTURING',
    label: 'Manufacturing',
    description: 'Products being manufactured',
    color: 'emerald',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-300',
    icon: Factory,
  },
  DELIVERY: {
    stageCode: 'DELIVERY',
    label: 'Delivery',
    description: 'Shipping and delivery in progress',
    color: 'blue',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    icon: Truck,
  },
  INSTALLATION: {
    stageCode: 'INSTALLATION',
    label: 'Installation',
    description: 'Installation and final setup',
    color: 'slate',
    textColor: 'text-slate-700',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
    icon: Hammer,
  },
};

export function getStageConfig(stageCode: StageCode): StageConfig {
  return STAGE_CONFIGS[stageCode];
}

export function getStageConfigSafe(stageCode: string): StageConfig {
  if (stageCode in STAGE_CONFIGS) {
    return STAGE_CONFIGS[stageCode as StageCode];
  }
  // Return default config for unknown stages
  return {
    stageCode: stageCode as StageCode,
    label: stageCode,
    description: 'Unknown stage',
    color: 'slate',
    textColor: 'text-slate-700',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
    icon: Lightbulb,
  };
}

export const STAGE_ORDER: StageCode[] = [
  'PLANNING',
  'TRAVEL',
  'ORDERING',
  'MANUFACTURING',
  'DELIVERY',
  'INSTALLATION',
];
