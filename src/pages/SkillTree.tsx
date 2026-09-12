import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SKILLS, CATEGORIES } from '../data';
import { Card } from '../components/ui/Card';
import { CheckCircle2, Play, LayoutGrid, ListOrdered } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Skill } from '../types';

export function SkillTree() {
  const [groupBy, setGroupBy] = useState<'category' | 'level'>('category');
  
  // Mock practiced skills to show completion rather than locking
  const practicedSkills = new Set(['basic-bounce', 'side-split']);

  const levels = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-10"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Skill Library</h1>
        <p className="text-slate-400 mb-8">Master the basics, unlock the flow.</p>
        
        <div className="inline-flex items-center p-1 bg-dark-800 rounded-lg border border-dark-700">
          <button
            onClick={() => setGroupBy('category')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-semibold flex items-center transition-colors",
              groupBy === 'category' ? "bg-dark-700 text-accent" : "text-slate-400 hover:text-slate-300"
            )}
          >
            <LayoutGrid className="w-4 h-4 mr-2" /> By Category
          </button>
          <button
            onClick={() => setGroupBy('level')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-semibold flex items-center transition-colors",
              groupBy === 'level' ? "bg-dark-700 text-accent" : "text-slate-400 hover:text-slate-300"
            )}
          >
            <ListOrdered className="w-4 h-4 mr-2" /> By Level
          </button>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {groupBy === 'category' ? (
            <motion.div 
              key="cat-view"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {CATEGORIES.map(category => {
                const categorySkills = SKILLS.filter(s => s.categories.includes(category));
                if (categorySkills.length === 0) return null;

                return (
                  <div key={category} className="space-y-6">
                    <h2 className="text-2xl font-display uppercase tracking-wide border-b border-dark-700 pb-2">
                      {category}
                    </h2>
                    <SkillGrid skills={categorySkills} practiced={practicedSkills} />
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="lvl-view"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-16 relative"
            >
              <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-dark-700 sm:-translate-x-1/2 z-0"></div>

              {levels.map(level => {
                const levelSkills = SKILLS.filter(s => s.level === level);
                if (levelSkills.length === 0) return null;

                return (
                  <div key={level} className="relative z-10">
                    <div className="flex items-center sm:justify-center mb-6 pl-10 sm:pl-0">
                      <div className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-dark-800 border border-dark-700 text-slate-300">
                        Level {level}
                      </div>
                    </div>
                    <SkillGrid skills={levelSkills} practiced={practicedSkills} />
                  </div>
                );
              })}

              {/* Unrated Skills */}
              <div className="relative z-10 pt-8">
                <div className="flex items-center sm:justify-center mb-6 pl-10 sm:pl-0">
                  <div className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-dark-800 border border-dark-700 text-slate-400">
                    Unrated / Style Moves
                  </div>
                </div>
                <SkillGrid skills={SKILLS.filter(s => s.level === null)} practiced={practicedSkills} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SkillGrid({ skills, practiced }: { skills: Skill[], practiced: Set<string> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map(skill => {
        const isPracticed = practiced.has(skill.id);
        
        return (
          <Link key={skill.id} to={`/skills/${skill.id}`}>
            <Card glowOnHover className="h-full flex flex-col group overflow-hidden bg-dark-800 border-dark-700">
              <div className="h-32 bg-dark-900 relative overflow-hidden">
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
                  <div className="absolute top-2 left-2 text-emerald-400 bg-dark-900/80 rounded-full p-1 border border-emerald-500/20">
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
  );
}
