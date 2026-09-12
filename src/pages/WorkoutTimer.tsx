import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, SkipForward, Settings2, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils';
import { WorkoutConfig } from '../types';
import { motion, AnimatePresence } from 'motion/react';

type TimerState = 'setup' | 'warmup' | 'work' | 'rest' | 'done';

export function WorkoutTimer() {
  const [config, setConfig] = useState<WorkoutConfig>({
    rounds: 3,
    workDuration: 30,
    restDuration: 15,
    warmupDuration: 5,
  });

  const [state, setState] = useState<TimerState>('setup');
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // High precision timing refs
  const endTimeRef = useRef<number | null>(null);
  const pauseTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Sound refs (mocking audio for now, in a real app you'd use new Audio())
  const playBeep = () => { /* navigator.vibrate?.(100); */ };
  const playLongBeep = () => { /* navigator.vibrate?.([200, 100, 200]); */ };

  const startTimer = (duration: number, nextState: TimerState, roundIncrement = 0) => {
    setTimeLeft(duration);
    setState(nextState);
    if (roundIncrement) {
      setCurrentRound(prev => prev + roundIncrement);
    }
    endTimeRef.current = Date.now() + duration * 1000;
    setIsPaused(false);
  };

  const handleStart = () => {
    setCurrentRound(1);
    startTimer(config.warmupDuration, 'warmup');
  };

  const handlePauseResume = () => {
    if (isPaused) {
      // Resume
      if (pauseTimeRef.current && endTimeRef.current) {
        const timePaused = Date.now() - pauseTimeRef.current;
        endTimeRef.current += timePaused;
      }
      setIsPaused(false);
      pauseTimeRef.current = null;
    } else {
      // Pause
      pauseTimeRef.current = Date.now();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setState('setup');
    setIsPaused(false);
  };

  const handleSkip = () => {
    if (state === 'work') {
      if (currentRound >= config.rounds) {
        setState('done');
      } else {
        startTimer(config.restDuration, 'rest');
      }
    } else if (state === 'rest' || state === 'warmup') {
      startTimer(config.workDuration, 'work', state === 'rest' ? 1 : 0);
    }
  };

  useEffect(() => {
    if (state === 'setup' || state === 'done' || isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = () => {
      if (!endTimeRef.current) return;

      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
      
      if (remaining !== timeLeft) {
        setTimeLeft(remaining);
        
        if (remaining > 0 && remaining <= 3) {
          playBeep();
        }
      }

      if (remaining <= 0) {
        playLongBeep();
        
        // Transition state
        if (state === 'warmup') {
          startTimer(config.workDuration, 'work');
        } else if (state === 'work') {
          if (currentRound >= config.rounds) {
            setState('done');
          } else {
            startTimer(config.restDuration, 'rest');
          }
        } else if (state === 'rest') {
          startTimer(config.workDuration, 'work', 1);
        }
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state, isPaused, timeLeft, currentRound, config]);


  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const updateConfig = (key: keyof WorkoutConfig, delta: number) => {
    setConfig(prev => ({
      ...prev,
      [key]: Math.max(1, (prev[key] as number) + delta)
    }));
  };

  if (state === 'setup') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="max-w-md mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight">Workout</h1>
          <p className="text-slate-400">Configure your intervals.</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg">Rounds</div>
              <div className="text-sm text-slate-400">Total circuits</div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => updateConfig('rounds', -1)} className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-xl font-bold hover:text-accent">-</button>
              <div className="w-8 text-center font-display text-2xl">{config.rounds}</div>
              <button onClick={() => updateConfig('rounds', 1)} className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-xl font-bold hover:text-accent">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg text-accent">Work</div>
              <div className="text-sm text-slate-400">Seconds per round</div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => updateConfig('workDuration', -5)} className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-xl font-bold hover:text-accent">-</button>
              <div className="w-12 text-center font-display text-2xl">{config.workDuration}s</div>
              <button onClick={() => updateConfig('workDuration', 5)} className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-xl font-bold hover:text-accent">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg text-orange-500">Rest</div>
              <div className="text-sm text-slate-400">Seconds between rounds</div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => updateConfig('restDuration', -5)} className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-xl font-bold hover:text-accent">-</button>
              <div className="w-12 text-center font-display text-2xl">{config.restDuration}s</div>
              <button onClick={() => updateConfig('restDuration', 5)} className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-xl font-bold hover:text-accent">+</button>
            </div>
          </div>
        </Card>

        <Button size="lg" className="w-full text-xl shadow-[0_0_30px_rgba(6,182,212,0.3)]" onClick={handleStart}>
          <Play className="w-6 h-6 mr-2 fill-current" /> START WORKOUT
        </Button>
      </motion.div>
    );
  }

  if (state === 'done') {
    const totalMinutes = Math.round((config.rounds * config.workDuration) / 60);
    const calories = Math.round(totalMinutes * 14); // rough estimate

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center space-y-8 pt-12"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/20 text-accent mb-4">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-5xl font-display font-bold uppercase tracking-tight">Workout Complete</h2>
        
        <Card className="p-6 grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Time</div>
            <div className="text-3xl font-display font-bold">{totalMinutes}m</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Est. Burn</div>
            <div className="text-3xl font-display font-bold">{calories} kcal</div>
          </div>
          <div className="col-span-2 pt-4 border-t border-dark-700">
            <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Rounds Completed</div>
            <div className="text-3xl font-display font-bold text-accent">{config.rounds}</div>
          </div>
        </Card>

        <Button size="lg" className="w-full" onClick={() => setState('setup')}>
          Done
        </Button>
      </motion.div>
    );
  }

  // Active timer states
  const isWork = state === 'work';
  const isRest = state === 'rest';
  
  return (
    <motion.div 
      key="active-timer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "max-w-md mx-auto h-[70vh] flex flex-col items-center justify-center text-center transition-colors duration-1000 rounded-3xl p-8 relative overflow-hidden",
        state === 'work' ? 'bg-accent/10 border-accent/20' : 
        state === 'rest' ? 'bg-orange-500/10 border-orange-500/20' : 
        'bg-dark-800'
      )}
    >
      {/* Background Pulse during work */}
      {isWork && !isPaused && (
        <div className="absolute inset-0 bg-accent/5 animate-pulse" style={{ animationDuration: '0.5s' }}></div>
      )}

      <div className="relative z-10 w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="text-slate-400 font-bold uppercase tracking-widest">
            Round {currentRound}/{config.rounds}
          </div>
          <div className={cn(
            "px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
            isWork ? 'bg-accent text-dark-900' : 
            isRest ? 'bg-orange-500 text-dark-900' : 
            'bg-slate-200 text-dark-900'
          )}>
            {state}
          </div>
        </div>

        <div className="py-8">
          <div className={cn(
            "text-9xl font-display font-bold tracking-tighter tabular-nums transition-colors",
            isWork ? 'text-accent drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 
            isRest ? 'text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 
            'text-white'
          )}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <Button variant="ghost" size="icon" onClick={handleStop} className="text-slate-400 hover:text-white">
            <Square className="w-6 h-6 fill-current" />
          </Button>
          
          <Button 
            size="icon" 
            className={cn(
              "w-20 h-20 rounded-full",
              isWork ? "bg-accent hover:bg-accent-hover text-dark-900" : 
              "bg-slate-200 hover:bg-white text-dark-900"
            )}
            onClick={handlePauseResume}
          >
            {isPaused ? <Play className="w-8 h-8 fill-current ml-2" /> : <Pause className="w-8 h-8 fill-current" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={handleSkip} className="text-slate-400 hover:text-white">
            <SkipForward className="w-6 h-6 fill-current" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
