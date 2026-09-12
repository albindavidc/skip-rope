export type SkillLevel = number | null;

export interface SkillMedia {
  thumbnailImage: string;
  demoGif: string | null;
  demoGifAlt: string;
  durationHint: number;
}

export interface Skill {
  id: string;
  name: string;
  alternativeNames: string[];
  categories: string[];
  level: SkillLevel;
  prerequisites: string[];
  description: string;
  coachingCues: string[];
  commonMistakes: string[];
  progressions: string[];
  media: SkillMedia;
}

export interface Combo {
  id: string;
  name: string;
  steps: string[];
  description: string;
}

export interface RopeType {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  material: string;
  typicalWeight: string;
  priceTier: '$' | '$$' | '$$$';
  pros: string[];
  cons: string[];
}

export interface WorkoutConfig {
  rounds: number;
  workDuration: number;
  restDuration: number;
  warmupDuration: number;
  skills?: string[];
}

export interface SessionResult {
  id: string;
  date: string;
  duration: number;
  config: WorkoutConfig;
  estimatedCalories: number;
}
