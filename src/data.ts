import { RopeType, Skill } from './types';

export const ROPE_TYPES: RopeType[] = [
  {
    id: 'cable',
    name: 'Cable Rope',
    description: 'Thin, ultra-fast wire ropes primarily used for speed skipping and double unders.',
    bestFor: 'Advanced / CrossFit / Double Unders',
    material: 'Bare or PVC-coated steel wire',
    typicalWeight: 'Very Light (1-3 oz)',
    priceTier: '$$',
    pros: ['Maximum speed', 'Cuts through air easily', 'Great for competitive skipping'],
    cons: ['Stings badly if you whip yourself', 'Tangles easily', 'Wears out quickly on concrete']
  },
  {
    id: 'pvc',
    name: 'Plastic / PVC Rope',
    description: 'The standard fitness rope. Solid PVC cord that offers a good balance of speed and feedback.',
    bestFor: 'All levels / Cardio / Tricks',
    material: 'Solid PVC',
    typicalWeight: 'Light-Medium (3-5 oz)',
    priceTier: '$',
    pros: ['Durable', 'Good feedback for learning', 'Versatile for most skills'],
    cons: ['Can kink if stored improperly', 'Slower than wire']
  },
  {
    id: 'beaded',
    name: 'Beaded Rope',
    description: 'Nylon cord strung with segmented plastic beads. Excellent for learning and rhythmic jumping.',
    bestFor: 'Beginners / Kids / Tricks / Choreography',
    material: 'Nylon cord + Plastic segments',
    typicalWeight: 'Medium (4-6 oz)',
    priceTier: '$',
    pros: ["Won't tangle", 'Excellent auditory feedback', 'Holds shape well in the air'],
    cons: ['Too slow for speed jumping', 'Heavier on the shoulders']
  },
  {
    id: 'weighted',
    name: 'Weighted Rope',
    description: 'Heavy ropes designed to increase upper body engagement and calorie burn.',
    bestFor: 'Strength / Intense Cardio',
    material: 'Thick PVC or braided poly',
    typicalWeight: 'Heavy (1/4 lb to 2+ lbs)',
    priceTier: '$$$',
    pros: ['Builds upper body strength', 'Slower rotation makes it easier to time jumps', 'High calorie burn'],
    cons: ['Fatigues you quickly', 'Hard to do advanced tricks']
  }
];

export const SKILLS: Skill[] = [
  {
    id: 'basic-bounce',
    name: 'Basic Bounce',
    level: 1,
    description: 'The foundation of all skipping. A simple, low jump with both feet together.',
    cue: 'Stay on the balls of your feet. Jump just high enough to clear the rope (about 1 inch).',
    focus: ['Cardio', 'Rhythm']
  },
  {
    id: 'side-to-side',
    name: 'Side-to-Side',
    level: 1,
    description: 'Basic bounce while shifting your landing side to side.',
    cue: 'Keep feet together, imagine a line on the ground and jump over it side to side.',
    prerequisites: ['basic-bounce'],
    focus: ['Coordination']
  },
  {
    id: 'alt-foot',
    name: 'Alternate-Foot Skip',
    level: 2,
    description: 'Like running in place while skipping. Shift weight from one foot to the other.',
    cue: "Lift your knees slightly, don't kick backwards.",
    prerequisites: ['basic-bounce'],
    focus: ['Cardio', 'Footwork']
  },
  {
    id: 'boxer-skip',
    name: 'Boxer Skip',
    level: 3,
    description: 'Rhythmic pattern: right toe -> right heel -> left toe -> left heel. Conserves energy.',
    cue: 'Shift weight side to side. The foot not taking weight taps lightly.',
    prerequisites: ['alt-foot'],
    focus: ['Balance', 'Foot speed', 'Rhythm']
  },
  {
    id: 'criss-cross',
    name: 'Criss-Cross (Crossover)',
    level: 3,
    description: 'Cross your arms in front of your body while jumping to form an X with the rope.',
    cue: 'Cross your arms far over to opposite pockets. Point handles down and out.',
    prerequisites: ['basic-bounce'],
    focus: ['Upper-body', 'Coordination']
  },
  {
    id: 'double-under',
    name: 'Double Under',
    level: 5,
    description: 'The rope passes under your feet twice in a single jump.',
    cue: 'Jump a little higher, spin the wrists much faster. Keep elbows tucked in.',
    prerequisites: ['basic-bounce'],
    focus: ['Cardio', 'Power']
  }
];
