import { Link } from 'react-router-dom';
import { SKILLS } from '../data';
import { Card } from '../components/ui/Card';
import { Lock, Unlock, Play } from 'lucide-react';
import { motion } from 'motion/react';

export function SkillTree() {
  // Group skills by level
  const levels = Array.from({ length: 11 }, (_, i) => i + 1);
  
  // Mock unlocked level up to 3
  const userLevel = 3;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-10"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight">Skill Tree</h1>
        <p className="text-slate-400">Master the basics, unlock the flow.</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Vertical connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-dark-700 -translate-x-1/2 z-0 hidden md:block"></div>

        <div className="space-y-12 relative z-10">
          {levels.map(level => {
            const levelSkills = SKILLS.filter(s => s.level === level);
            if (levelSkills.length === 0) return null; // Skip empty levels for now
            
            const isUnlocked = level <= userLevel;
            const isCurrent = level === userLevel;

            return (
              <div key={level} className="relative">
                {/* Level marker */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`
                    px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border
                    ${isUnlocked ? 'bg-accent/10 border-accent text-accent' : 'bg-dark-800 border-dark-700 text-slate-500'}
                  `}>
                    Level {level}
                  </div>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {levelSkills.map(skill => (
                    <Card 
                      key={skill.id} 
                      glowOnHover={isUnlocked}
                      className={`relative overflow-hidden transition-all ${!isUnlocked ? 'opacity-60 grayscale' : ''}`}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold">{skill.name}</h3>
                          {isUnlocked ? (
                            <Unlock className="w-4 h-4 text-accent opacity-50" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{skill.description}</p>
                        
                        {isUnlocked && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {skill.focus.map(f => (
                              <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-dark-700 text-slate-300 uppercase tracking-wide">
                                {f}
                              </span>
                            ))}
                          </div>
                        )}

                        {isUnlocked && (
                          <Link to="/workout">
                            <button className="text-sm font-semibold text-accent hover:text-accent-light flex items-center transition-colors">
                              <Play className="w-4 h-4 mr-1 fill-current" />
                              Practice
                            </button>
                          </Link>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
