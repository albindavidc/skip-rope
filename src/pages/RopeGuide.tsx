import { Link } from 'react-router-dom';
import { ROPE_TYPES } from '../data';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronRight, Settings2 } from 'lucide-react';
import { motion } from 'motion/react';

export function RopeGuide() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight">Rope Guide</h1>
          <p className="text-slate-400">Discover the right tool for your training.</p>
        </div>
        <Link to="/guide">
          <Button variant="outline" className="flex items-center">
            <Settings2 className="w-4 h-4 mr-2" />
            Help Me Choose
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ROPE_TYPES.map((rope) => (
          <Card key={rope.id} glowOnHover className="flex flex-col h-full cursor-pointer">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{rope.name}</h3>
                <span className="text-accent text-sm font-bold">{rope.priceTier}</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">{rope.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="text-xs">
                  <span className="text-slate-500 uppercase font-semibold mr-2">Best For:</span>
                  <span className="text-slate-200">{rope.bestFor}</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-500 uppercase font-semibold mr-2">Material:</span>
                  <span className="text-slate-200">{rope.material}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-dark-700 bg-dark-900/50 flex items-center justify-between text-sm">
              <span className="text-accent group-hover:text-accent-light transition-colors">View Details</span>
              <ChevronRight className="w-4 h-4 text-accent" />
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
