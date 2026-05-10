import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Sector {
  name: string;
  value: number;
  color: string;
  description: string;
}

export const SectorBreakdown = ({ sectors }: { sectors: Sector[] }) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-end border-b border-[#D1D1D1] pb-4">
        <div>
          <h4 className="text-[10px] font-sans font-black text-[#666] uppercase tracking-[0.25em] mb-1">Sector Analysis</h4>
          <p className="text-2xl font-editorial-serif font-black uppercase text-[#1A1A1A]">Contribution breakdown</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-sans font-bold text-[#999] uppercase tracking-widest">MAR 2025 RECORD</span>
        </div>
      </div>

      <div className="space-y-12">
        {sectors.map((sector, idx) => (
          <motion.div 
            key={sector.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="flex justify-between items-end mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3" style={{ backgroundColor: sector.color }} />
                <span className="text-sm font-sans font-black uppercase tracking-widest text-[#1A1A1A]">{sector.name}</span>
              </div>
              <span className={`text-3xl font-editorial-serif font-black ${sector.value < 0 ? 'text-[#BF3131]' : 'text-[#1A1A1A]'}`}>
                {sector.value > 0 ? '+' : ''}{sector.value}%
              </span>
            </div>
            <div className="w-full bg-[#E0E0E0] h-[2px] relative overflow-hidden">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.abs(sector.value * 10)}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full" 
                  style={{ backgroundColor: sector.color }} 
               />
            </div>
            <p className="mt-3 text-xs font-editorial-serif italic text-[#666] opacity-0 group-hover:opacity-100 transition-opacity">
              {sector.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-6 bg-[#1A1A1A] text-white">
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] opacity-40 mb-2">Internal Advisory</p>
        <p className="text-md font-editorial-serif leading-tight italic">
          "Core services remain sticky; policy attention shifting from energy to wage-price spirals."
        </p>
      </div>
    </div>
  );
};
