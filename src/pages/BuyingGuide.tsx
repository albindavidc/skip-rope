import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ROPE_TYPES } from '../data';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Step = 'level' | 'goal' | 'result';

export function BuyingGuide() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('level');
  const [answers, setAnswers] = useState({
    level: '',
    goal: ''
  });

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (key === 'level') setStep('goal');
    if (key === 'goal') setStep('result');
  };

  const getRecommendation = () => {
    if (answers.goal === 'kids') return ROPE_TYPES.find(r => r.id === 'beaded');
    if (answers.goal === 'tricks' || answers.level === 'beginner') return ROPE_TYPES.find(r => r.id === 'pvc');
    if (answers.goal === 'cardio' && answers.level === 'advanced') return ROPE_TYPES.find(r => r.id === 'cable');
    if (answers.goal === 'strength') return ROPE_TYPES.find(r => r.id === 'weighted');
    return ROPE_TYPES.find(r => r.id === 'pvc'); // default
  };

  const recommendedRope = getRecommendation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold uppercase tracking-tight">Find Your Rope</h1>
        <p className="text-slate-400">Answer a few questions to get matched.</p>
      </div>

      <Card className="p-6 md:p-8">
        <AnimatePresence mode="wait">
        {step === 'level' && (
          <motion.div 
            key="level"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-6 text-center">What is your experience level?</h2>
            <div className="space-y-3">
              {[
                { id: 'beginner', label: 'Beginner', desc: 'Just starting out or learning basic bounce' },
                { id: 'intermediate', label: 'Intermediate', desc: 'Can string jumps together, learning alternate foot' },
                { id: 'advanced', label: 'Advanced', desc: 'Working on double unders and complex combos' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect('level', opt.id)}
                  className="w-full text-left p-4 rounded-xl border border-dark-700 bg-dark-900/50 hover:border-accent hover:bg-dark-700 transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-200 group-hover:text-white">{opt.label}</div>
                    <div className="text-sm text-slate-500 mt-1">{opt.desc}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-dark-700 group-hover:text-accent transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'goal' && (
          <motion.div 
            key="goal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-6 text-center">What is your primary goal?</h2>
            <div className="space-y-3">
              {[
                { id: 'cardio', label: 'Speed & Cardio', desc: 'Max calorie burn, double unders, intense intervals' },
                { id: 'tricks', label: 'Learning Tricks', desc: 'Footwork, crossovers, freestyle flow' },
                { id: 'strength', label: 'Strength', desc: 'Upper body engagement, heavy resistance' },
                { id: 'kids', label: 'For a Child', desc: 'Safe, durable, easy to learn with' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect('goal', opt.id)}
                  className="w-full text-left p-4 rounded-xl border border-dark-700 bg-dark-900/50 hover:border-accent hover:bg-dark-700 transition-all group flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-200 group-hover:text-white">{opt.label}</div>
                    <div className="text-sm text-slate-500 mt-1">{opt.desc}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-dark-700 group-hover:text-accent transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'result' && recommendedRope && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Your Match
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">{recommendedRope.name}</h2>
            <p className="text-slate-400 mb-6">{recommendedRope.description}</p>
            
            <div className="bg-dark-900 rounded-xl p-4 mb-6 text-left border border-dark-700">
              <h4 className="text-sm font-bold uppercase tracking-wide text-slate-300 mb-2">Why this rope?</h4>
              <p className="text-sm text-slate-400 mb-4">
                Based on your {answers.level} experience and goal of {answers.goal === 'kids' ? 'getting a rope for a child' : answers.goal}, this rope provides the perfect balance of weight and feedback.
              </p>
              <div className="text-xs space-y-1">
                <div><span className="text-slate-500 uppercase mr-2">Material:</span> {recommendedRope.material}</div>
                <div><span className="text-slate-500 uppercase mr-2">Weight:</span> {recommendedRope.typicalWeight}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate('/ropes')} variant="primary" className="flex-1">
                Browse All Ropes
              </Button>
              <Button onClick={() => { setStep('level'); setAnswers({level:'', goal:''}); }} variant="outline" className="flex-none px-4">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
