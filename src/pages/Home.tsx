import { Link } from 'react-router-dom';
import { Play, Flame, Trophy, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';

export function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      
      {/* Hero Section */}
      <section className="text-center py-12 relative">
        <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight mb-4">
          Ready to <span className="text-accent">Jump</span>?
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
          Your premium skipping-rope reference and training companion.
        </p>
        <Link to="/workout">
          <Button size="lg" className="w-full sm:w-auto shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Play className="w-5 h-5 mr-2 fill-current" />
            Quick Start Workout
          </Button>
        </Link>
      </section>

      {/* Stats / Dashboard */}
      <section className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Flame className="w-8 h-8 text-orange-500 mb-2" />
          <div className="text-3xl font-display font-bold">3</div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">Day Streak</div>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
          <div className="text-3xl font-display font-bold">12,450</div>
          <div className="text-sm text-slate-400 uppercase tracking-wider">Total Skips</div>
        </Card>
      </section>

      {/* Continue Learning */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display uppercase tracking-wide">Continue Learning</h2>
          <Link to="/skills" className="text-sm text-accent hover:text-accent-light flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <Link to="/skills">
          <Card glowOnHover className="p-4 flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-xs text-accent uppercase font-bold tracking-wider mb-1">Level 3</div>
              <h3 className="text-lg font-bold">Boxer Skip</h3>
              <p className="text-sm text-slate-400 mt-1 line-clamp-1">Rhythmic pattern: right toe, right heel...</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0 ml-4">
              <Play className="w-4 h-4 text-accent fill-current" />
            </div>
          </Card>
        </Link>
      </section>
      
      {/* Buying Guide Promo */}
      <section>
        <Card className="p-6 bg-gradient-to-br from-dark-800 to-dark-900 border-dark-700">
          <h2 className="text-xl font-display uppercase tracking-wide mb-2">Need a new rope?</h2>
          <p className="text-sm text-slate-400 mb-4">Take our 3-question quiz to find the perfect rope for your goals.</p>
          <Link to="/guide">
            <Button variant="outline" className="w-full">
              Find My Rope
            </Button>
          </Link>
        </Card>
      </section>
    </motion.div>
  );
}
