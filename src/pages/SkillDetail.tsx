import { useParams, Link, useNavigate } from 'react-router-dom';
import { SKILLS, COMBOS } from '../data';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Play, Info, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const skill = SKILLS.find(s => s.id === id);
  const combo = COMBOS.find(c => c.id === id);
  
  const [playMotion, setPlayMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPlayMotion(!mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPlayMotion(!e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  if (!skill && !combo) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Skill not found</h2>
        <Button onClick={() => navigate('/skills')}>Back to Skills</Button>
      </div>
    );
  }

  // Handle Combos differently or adapt the view. For simplicity, if it's a skill, render skill details.
  if (skill) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8 pb-12"
      >
        <Link to="/skills" className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
        </Link>

        {/* Media Player Header */}
        <div className="relative rounded-2xl overflow-hidden bg-dark-800 border border-dark-700 aspect-video flex items-center justify-center">
          {skill.media.demoGif && playMotion ? (
            <img 
              src={skill.media.demoGif} 
              alt={skill.media.demoGifAlt}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img 
                src={skill.media.thumbnailImage} 
                alt={skill.name}
                className={cn("w-full h-full object-cover", (!skill.media.demoGif) ? "opacity-30" : "opacity-100")}
              />
              {!skill.media.demoGif && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-dark-900/60 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4 border border-dark-700">
                    <Play className="w-6 h-6 text-slate-500 fill-current opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Demo coming soon</h3>
                  <p className="text-sm text-slate-400">We're recording a high-quality demonstration for this movement.</p>
                </div>
              )}
              {skill.media.demoGif && !playMotion && (
                <button 
                  onClick={() => setPlayMotion(true)}
                  className="absolute inset-0 flex items-center justify-center bg-dark-900/40 hover:bg-dark-900/20 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-full bg-accent text-dark-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </button>
              )}
            </>
          )}
        </div>

        {/* Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {skill.level !== null && (
                <span className="px-2 py-1 rounded bg-accent/10 text-accent border border-accent/20 text-xs font-bold uppercase tracking-wider">
                  Level {skill.level}
                </span>
              )}
              {skill.categories.map(cat => (
                <span key={cat} className="px-2 py-1 rounded bg-dark-800 text-slate-300 border border-dark-700 text-xs font-bold uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight mb-2">{skill.name}</h1>
            {skill.alternativeNames.length > 0 && (
              <p className="text-slate-400 text-sm">Also known as: {skill.alternativeNames.join(', ')}</p>
            )}
          </div>
          
          <Link to="/workout">
            <Button size="lg" className="w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Play className="w-5 h-5 mr-2 fill-current" />
              Practice Timer
            </Button>
          </Link>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-display uppercase tracking-wide border-b border-dark-700 pb-2 mb-4">How to do it</h3>
              <p className="text-slate-300 leading-relaxed">{skill.description}</p>
            </section>
            
            <section>
              <h3 className="text-xl font-display uppercase tracking-wide border-b border-dark-700 pb-2 mb-4 text-accent">Coaching Cues</h3>
              <ul className="space-y-3">
                {skill.coachingCues.map((cue, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-slate-300">{cue}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-display uppercase tracking-wide border-b border-dark-700 pb-2 mb-4 text-orange-400">Common Mistakes</h3>
              <ul className="space-y-3">
                {skill.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="p-5 bg-dark-800/50">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Prerequisites</h4>
              {skill.prerequisites.length > 0 ? (
                <ul className="space-y-2">
                  {skill.prerequisites.map(pre => {
                    const req = SKILLS.find(s => s.id === pre);
                    if (!req) return null;
                    return (
                      <li key={pre}>
                        <Link to={`/skills/${pre}`} className="flex items-center text-sm text-accent hover:text-accent-light transition-colors">
                          <ArrowLeft className="w-3 h-3 mr-2 rotate-180" /> {req.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-sm text-slate-500">None required. Dive right in!</div>
              )}
            </Card>

            <Card className="p-5 bg-dark-800/50">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Progressions</h4>
              {skill.progressions.length > 0 ? (
                <ul className="space-y-2">
                  {skill.progressions.map(prog => {
                    const next = SKILLS.find(s => s.id === prog);
                    if (!next) return null;
                    return (
                      <li key={prog}>
                        <Link to={`/skills/${prog}`} className="flex items-center text-sm text-accent hover:text-accent-light transition-colors">
                          <ArrowLeft className="w-3 h-3 mr-2 rotate-180" /> {next.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-sm text-slate-500">Master this to unlock combos!</div>
              )}
            </Card>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
