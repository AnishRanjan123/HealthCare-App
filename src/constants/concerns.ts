export type Concern = {
  id: string;
  label: string;
  icon: string;
  isTop?: boolean;
};

export const topConcerns: Concern[] = [
  { id: 'hypertension', label: 'Hypertension', icon: 'heart-pulse', isTop: true },
  { id: 'anxiety', label: 'Anxiety', icon: 'brain', isTop: true },
  { id: 'obesity-1', label: 'Obesity', icon: 'human-male-height', isTop: true },
];

export const allConcerns: Concern[] = [
  { id: 'diabetes', label: 'Diabetes', icon: 'blood-bag' },
  { id: 'obesity-2', label: 'Obesity', icon: 'human-male-height' },
  { id: 'hypertension-2', label: 'Hypertension', icon: 'heart-pulse' },
  { id: 'rubella', label: 'Rubella', icon: 'face-man-shimmer' },
  { id: 'hypothermia', label: 'Hypothermia', icon: 'snowflake-alert' },
  { id: 'frostbite', label: 'Frostbite', icon: 'foot-print' },
  { id: 'glucose', label: 'Glucose', icon: 'water-percent' },
  { id: 'rash', label: 'Rash', icon: 'bandage' },
  { id: 'sprain', label: 'Sprain', icon: 'arm-flex' },
];
