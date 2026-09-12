export type SkillLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  description: string;
  cue: string;
  prerequisites?: string[];
  focus: string[];
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
  workDuration: number; // in seconds
  restDuration: number; // in seconds
  warmupDuration: number; // in seconds
  skills?: string[]; // IDs of skills to practice
}

export interface SessionResult {
  id: string;
  date: string;
  duration: number; // total active seconds
  config: WorkoutConfig;
  estimatedCalories: number;
}
