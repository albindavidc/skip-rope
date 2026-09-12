import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SKILLS, CATEGORIES } from '../data';
import { Card } from '../components/ui/Card';
import { CheckCircle2, Play, LayoutGrid, ListOrdered } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Skill } from '../types';

const SHORT_CATEGORIES: Record<string, string> = {
  "Basic / Foundation Jumps": "Basic",
  "Directional Jumps": "Directional",
  "Split & Stance Variations": "Split & Stance",
  "Alternate Foot & Running Patterns": "Alternate Foot",
  "Heel & Toe Footwork": "Heel & Toe",
  "Shuffle & Complex Footwork": "Shuffle",
  "Swing / Rope Manipulation": "Swing",
  "Crossover / Arm Coordination": "Crossover",
  "Rotation & Turning": "Rotation",
  "Knee / Leg Elevation": "Knee Elevation",
  "Power / Plyometric": "Power"
};

const getCategoryId = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const JUMP_STYLES = [
  "Single Rope",
  "Double Dutch",
  "Long Rope",
  "Partner",
  "Group / Team",
  "Freestyle"
];

export function SkillTree() {
  const [selectedStyle, setSelectedStyle] = useState('Single Rope');
  
  // Mock practiced skills to show completion rather than locking
  const practicedSkills = new Set(['basic-bounce', 'side-split']);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 pb-10"
    >
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Skill Library</h1>
          <p className="text-slate-400 mt-2">Master the basics, unlock the flow.</p>
        </div>
        
        <div className="flex flex-col gap-2 shrink-0 max-w-full xl:min-w-[300px]">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 pl-1">Styles</span>
          <div className="flex overflow-x-auto no-scrollbar gap-1 p-1 bg-dark-800 rounded-lg border border-dark-700 w-full">
            {JUMP_STYLES.map(style => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-colors",
                  selectedStyle === style ? "bg-dark-700 text-accent" : "text-slate-400 hover:text-slate-300 hover:bg-dark-700/50"
                )}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full mt-10">
        <AnimatePresence mode="wait">
          {selectedStyle === 'Single Rope' ? (
            <motion.div 
              key="single-rope-view"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Category Quick Links */}
              <div className="sticky top-0 z-40 flex flex-col gap-4 mb-16 pt-6 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-dark-900/95 backdrop-blur-xl border-b border-dark-800 shadow-2xl">
                <div className="flex items-center gap-4 pl-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Jump Levels</h3>
                  <div className="h-px bg-dark-700 flex-1"></div>
                </div>
                <div className="flex overflow-x-auto pb-4 gap-2 sleek-scrollbar scroll-smooth">
                  {CATEGORIES.map((category, index) => (
                    <button 
                      key={`nav-${category}`}
                      onClick={() => {
                        document.getElementById(getCategoryId(category))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-full text-xs font-semibold whitespace-nowrap text-slate-300 hover:text-accent transition-colors shadow-sm"
                    >
                      {index + 1}. {SHORT_CATEGORIES[category] || category}
                    </button>
                  ))}
                </div>
              </div>

              {CATEGORIES.map((category, index) => {
                const categorySkills = SKILLS.filter(s => s.categories.includes(category));
                if (categorySkills.length === 0) return null;

                return (
                  <div key={category} id={getCategoryId(category)} className="space-y-6 scroll-mt-40">
                    <h2 className="text-2xl font-display uppercase tracking-wide border-b border-dark-700 pb-2">
                      <span className="text-accent/60 mr-2">Level {index + 1}:</span>
                      {category}
                    </h2>
                    <SkillGrid skills={categorySkills} practiced={practicedSkills} />
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key={`empty-view-${selectedStyle}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-dark-700 rounded-2xl bg-dark-800/30"
            >
              <div className="w-16 h-16 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center mb-6">
                <Play className="w-6 h-6 text-slate-600 fill-current opacity-50" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">{selectedStyle}</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                We're currently curating a high-quality library of {selectedStyle.toLowerCase()} skills and progressions. Check back soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SkillGrid({ skills, practiced }: { skills: Skill[], practiced: Set<string> }) {
  return (
    <div className="relative group/carousel -mx-4 sm:mx-0">
      <div className="flex overflow-x-auto gap-4 px-4 sm:px-0 pb-6 snap-x snap-mandatory sleek-scrollbar">
        {skills.map(skill => {
          const isPracticed = practiced.has(skill.id);
          
          return (
            <Link 
              key={skill.id} 
              to={`/skills/${skill.id}`}
              className="w-[280px] sm:w-[320px] lg:w-[calc(20%-12.8px)] shrink-0 snap-start"
            >
              <Card glowOnHover className="h-full flex flex-col group overflow-hidden bg-dark-800 border-dark-700">
                <div className="h-36 bg-dark-900 relative overflow-hidden">
                  <img 
                    src={skill.media.thumbnailImage} 
                    alt={skill.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent"></div>
                  {skill.level !== null && (
                    <div className="absolute top-2 right-2 bg-dark-900/80 backdrop-blur text-[10px] uppercase font-bold px-2 py-1 rounded text-accent border border-accent/20">
                      Lvl {skill.level}
                    </div>
                  )}
                  {isPracticed && (
                    <div className="absolute top-2 left-2 text-emerald-400 bg-dark-900/80 rounded-full p-1 border border-emerald-500/20 shadow-lg">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-1 leading-tight">{skill.name}</h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 flex-1">{skill.description}</p>
                  
                  <div className="text-sm font-semibold text-accent flex items-center group-hover:text-accent-light transition-colors mt-auto">
                    <Play className="w-4 h-4 mr-1 fill-current opacity-70 group-hover:opacity-100" />
                    View Details
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      
      {/* Optional: Add gradient fades on the sides for desktop to indicate scrollability */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-dark-900 to-transparent sm:hidden"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-dark-900 to-transparent sm:hidden"></div>
    </div>
  );
}
