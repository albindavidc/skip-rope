import { RopeType, Skill, Combo, SkillMedia } from './types';

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

export const CATEGORIES = [
  "Basic / Foundation Jumps",
  "Directional Jumps",
  "Split & Stance Variations",
  "Alternate Foot & Running Patterns",
  "Heel & Toe Footwork",
  "Shuffle & Complex Footwork",
  "Swing / Rope Manipulation",
  "Crossover / Arm Coordination",
  "Rotation & Turning",
  "Knee / Leg Elevation",
  "Power / Plyometric"
];

const [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11] = CATEGORIES;

const defaultMedia: SkillMedia = {
  thumbnailImage: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=500&q=60',
  demoGif: null,
  demoGifAlt: 'Skill demonstration',
  durationHint: 3
};

const createSkill = (partial: Partial<Skill> & { id: string, name: string, categories: string[] }): Skill => ({
  alternativeNames: [],
  level: null,
  prerequisites: [],
  description: 'A standard skipping rope movement technique.',
  coachingCues: ['Stay light on your feet.', 'Keep your core engaged.', 'Turn the rope with your wrists.'],
  commonMistakes: ['Jumping too high.', 'Swinging from the shoulders.', 'Landing flat-footed.'],
  progressions: [],
  media: defaultMedia,
  ...partial
});

export const SKILLS: Skill[] = [
  // C1
  createSkill({ id: 'basic-bounce', name: 'Basic Bounce / Feet-Together Jump', categories: [C1], level: 1 }),
  createSkill({ id: 'double-bounce', name: 'Double Bounce', categories: [C1] }),
  createSkill({ id: 'alt-foot', name: 'Alternate Foot / Step Jump', categories: [C1, C4] }),
  createSkill({ id: 'jogging-step', name: 'Jogging Step', categories: [C1, C4] }),
  createSkill({ id: 'boxer-skip', name: 'Boxer Step / Boxer Skip', categories: [C1, C4] }),
  createSkill({ id: 'backward-basic', name: 'Backward Basic', categories: [C1] }),
  createSkill({ id: 'hop', name: 'Hop', categories: [C1] }),
  createSkill({ id: 'single-leg', name: 'Single-Leg Jump', categories: [C1] }),
  createSkill({ id: 'alt-single-leg', name: 'Alternating Single-Leg Jump', categories: [C1] }),

  // C2
  createSkill({ id: 'side-to-side', name: 'Side-to-Side Jump', categories: [C2] }),
  createSkill({ id: 'front-to-back', name: 'Front-to-Back Jump', categories: [C2] }),
  createSkill({ id: 'backward-jump', name: 'Backward Jump', categories: [C2] }),
  createSkill({ id: 'skier-jump', name: 'Skier Jump', categories: [C2] }),
  createSkill({ id: 'diagonals', name: 'Diagonals', categories: [C2], level: 4 }),
  createSkill({ id: 'diagonal-raise', name: 'Diagonal + Raise', categories: [C2], level: 5 }),
  createSkill({ id: 'side-raise', name: 'Side + Raise', categories: [C2], level: 6 }),
  createSkill({ id: 'full-twist', name: 'Full Twist', categories: [C2, C9] }),
  createSkill({ id: 'half-twist', name: 'Half Twist / Turn Jump', categories: [C2, C9] }),

  // C3
  createSkill({ id: 'side-split', name: 'Side Split', categories: [C3], level: 2 }),
  createSkill({ id: 'front-split', name: 'Front Split', categories: [C3] }),
  createSkill({ id: 'side-straddle', name: 'Side Straddle', categories: [C3] }),
  createSkill({ id: 'front-straddle', name: 'Front Straddle', categories: [C3] }),
  createSkill({ id: 'back-straddle', name: 'Back Straddle', categories: [C3] }),
  createSkill({ id: 'toe-to-toe', name: 'Toe-to-Toe Jump', categories: [C3] }),
  createSkill({ id: 'bell-jump', name: 'Bell Jump', categories: [C3] }),
  createSkill({ id: 'in-and-out', name: 'In-and-Out', categories: [C3] }),

  // C4 & C10 cross
  createSkill({ id: 'high-knee-step', name: 'High Knee Step', categories: [C4, C10] }),
  createSkill({ id: 'high-knee-jump', name: 'High Knee Jump', categories: [C4, C10] }),
  createSkill({ id: 'running-step', name: 'Running Step', categories: [C4] }),
  createSkill({ id: 'butt-kicks', name: 'Butt Kicks', categories: [C4, C10] }),
  createSkill({ id: 'scissors', name: 'Scissors', categories: [C4, C10] }),
  createSkill({ id: 'can-can', name: 'Can Can', categories: [C4, C10] }),

  // C5
  createSkill({ id: 'heel-to-heel', name: 'Heel-to-Heel', categories: [C5] }),
  createSkill({ id: 'heel-to-toe', name: 'Heel-to-Toe', categories: [C5] }),
  createSkill({ id: 'toe-to-heel', name: 'Toe-to-Heel', categories: [C5] }),
  createSkill({ id: 'heel-toe-heel', name: 'Heel-Toe-Heel', categories: [C5], level: 10 }),
  createSkill({ id: 'fancy-heels', name: 'Fancy Heels', categories: [C5], level: 9 }),
  createSkill({ id: 'tyson-heel', name: 'Tyson Heel', categories: [C5], level: 8 }),
  createSkill({ id: 'toe-taps', name: 'Toe Taps', categories: [C5] }),
  createSkill({ id: 'heel-kicks', name: 'Heel Kicks', categories: [C5] }),

  // C6
  createSkill({ id: 'shuffle', name: 'Shuffle', categories: [C6], level: 7 }),
  createSkill({ id: 'forward-shuffle', name: 'Forward Shuffle', categories: [C6] }),
  createSkill({ id: 'backward-shuffle', name: 'Backward Shuffle', categories: [C6], level: 11 }),
  createSkill({ id: 'side-shuffle', name: 'Side Shuffle', categories: [C6] }),
  createSkill({ id: 'x-foot-cross', name: 'X-Foot Cross', categories: [C6, C8] }),
  createSkill({ id: 'wounded-duck', name: 'Wounded Duck', categories: [C6] }),
  createSkill({ id: 'hopscotch', name: 'Hopscotch', categories: [C6] }),
  createSkill({ id: 'joe-jump', name: 'Joe + Jump', categories: [C6] }),
  createSkill({ id: 'cross-step', name: 'Cross-Step', categories: [C6] }),
  createSkill({ id: 'indian-step', name: 'Indian Step', categories: [C6] }),

  // C7
  createSkill({ id: 'side-swing', name: 'Side Swing', categories: [C7] }),
  createSkill({ id: 'swing-jump', name: 'Swing Jump', categories: [C7] }),
  createSkill({ id: 'side-swing-plus-jump', name: 'Side Swing + Jump', categories: [C7] }),
  createSkill({ id: 'double-side-swing', name: 'Double Side Swing', categories: [C7] }),
  createSkill({ id: 'side-swing-to-jump', name: 'Side Swing → Jump', categories: [C7] }),
  createSkill({ id: 'side-swing-crossover', name: 'Side Swing → Crossover', categories: [C7, C8] }),

  // C8
  createSkill({ id: 'criss-cross', name: 'Criss-Cross / Crossover', categories: [C8] }),
  createSkill({ id: 'front-arm-cross', name: 'Front Arm Cross', categories: [C8] }),
  createSkill({ id: 'side-cross', name: 'Side Cross', categories: [C8] }),
  createSkill({ id: 'cross-uncross', name: 'Cross → Uncross', categories: [C8] }),
  createSkill({ id: 'double-crossover', name: 'Double Crossover', categories: [C8] }),
  createSkill({ id: 'crossover-double-under', name: 'Crossover → Double Under', categories: [C8, C11] }),

  // C9
  createSkill({ id: 'half-turn', name: 'Half Turn', categories: [C9] }),
  createSkill({ id: '180-turn', name: '180° Turn', categories: [C9] }),
  createSkill({ id: '360-turn', name: '360° Turn', categories: [C9] }),
  createSkill({ id: 'twist-jump', name: 'Twist + Jump', categories: [C9] }),
  createSkill({ id: 'crossover-twist', name: 'Crossover + Twist', categories: [C9] }),

  // C10 & C11
  createSkill({ id: 'high-jump', name: 'High Jump', categories: [C10, C11] }),
  createSkill({ id: 'tuck-jump', name: 'Tuck Jump', categories: [C10, C11] }),
  createSkill({ id: 'power-jump', name: 'Power Jump', categories: [C11] }),
  createSkill({ id: 'single-leg-power', name: 'Single-Leg Power Jump', categories: [C11] }),
  createSkill({ id: 'alt-power-jump', name: 'Alternating Power Jump', categories: [C11] }),
  createSkill({ id: 'double-under', name: 'Double Under', categories: [C11] }),
  createSkill({ id: 'consec-double-under', name: 'Consecutive Double Unders', categories: [C11] }),
  createSkill({ id: 'triple-under', name: 'Triple Under', categories: [C11] }),
  createSkill({ id: 'power-skip', name: 'Power Skip', categories: [C11] }),
];

export const COMBOS: Combo[] = [
  { id: 'combo-jump', name: 'Combo Jump', steps: [], description: 'A general combo jump.' },
  { id: 'endurance-jump', name: 'Endurance Jump', steps: [], description: 'Extended endurance series.' },
  { id: 'freestyle-combo', name: 'Freestyle Combination', steps: [], description: 'A mix of tricks.' },
  { id: 'boxer-crossover', name: 'Boxer → Crossover', steps: ['boxer-skip', 'criss-cross'], description: 'Smooth transition from boxer to crossover.' },
  { id: 'shuffle-crossover', name: 'Shuffle → Crossover', steps: ['shuffle', 'criss-cross'], description: 'Shuffle into a criss-cross.' },
  { id: 'heel-toe-crossover', name: 'Heel-Toe → Crossover', steps: ['heel-to-toe', 'criss-cross'], description: 'Footwork transition to arm cross.' },
  { id: 'high-knee-crossover', name: 'High Knee → Crossover', steps: ['high-knee-jump', 'criss-cross'], description: 'Power transition.' },
  { id: 'combo-crossover-du', name: 'Crossover → Double Under', steps: ['criss-cross', 'double-under'], description: 'Advanced power and cross.' },
  { id: 'combo-side-swing-cross', name: 'Side Swing → Crossover', steps: ['side-swing', 'criss-cross'], description: 'Basic arm manipulation sequence.' },
  { id: 'cross-full-twist', name: 'Cross → Full Twist', steps: ['criss-cross', 'full-twist'], description: 'Rotational crossover combo.' },
  { id: 'direction-change', name: 'Direction-Change Combination', steps: [], description: 'Multi-directional flow.' },
];
