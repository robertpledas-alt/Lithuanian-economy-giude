import React from 'react';
import { motion } from 'motion/react';
import { Scale, Building2, Leaf, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PulseData {
  economic: Array<{ label: string; value: string; trend: string; context: string }>;
  housing: Array<{ source: string; metric: string; value: string; trend: string; info: string }>;
  governance: Array<{ act: string; status: string; impact: string }>;
  openData: Array<{ source: string; update: string }>;
}

export const EconomicPulse = ({ data }: { data: PulseData }) => {
  if (!data) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-[#D1D1D1] pb-4">
        <div>
          <h4 className="text-[10px] font-sans font-black text-[#666] uppercase tracking-[0.25em] mb-1">State Pulse</h4>
          <p className="text-2xl font-editorial-serif font-black uppercase text-[#1A1A1A]">Macro Indicators</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.economic.map((item, idx) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-[#F9F7F2] border border-[#D1D1D1]"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-sans font-black text-[#666] uppercase tracking-widest leading-tight">{item.label}</span>
              {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-[#006847]" /> : <ArrowDownRight className="w-4 h-4 text-[#BF3131]" />}
            </div>
            <div className="text-2xl font-editorial-serif font-black text-[#1A1A1A]">{item.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="border-t-2 border-[#1A1A1A] pt-6">
         <h4 className="text-[10px] font-sans font-black text-[#1A1A1A] uppercase tracking-[0.25em] mb-4 italic">Real Estate Radar // Registry Center</h4>
         <div className="space-y-4">
            {data.housing.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center group cursor-help">
                <div>
                  <p className="text-[10px] font-sans font-black text-[#1A1A1A] uppercase tracking-tighter">{item.source}</p>
                  <p className="text-[9px] font-sans font-bold text-[#999] uppercase">{item.metric}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-editorial-serif font-black">{item.value}</span>
                  <div className="text-[8px] font-editorial-serif italic text-[#666] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.info}
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>

      <div className="border-t border-[#D1D1D1] pt-6 space-y-4">
         <h4 className="text-[10px] font-sans font-black text-[#1A1A1A] uppercase tracking-[0.25em]">Governance & Data.gov.lt</h4>
         
         <div className="space-y-4">
            <div className="flex gap-3 items-start">
               <Scale className="w-4 h-4 text-[#BF3131] mt-1 shrink-0" />
               <div>
                  <p className="text-xs font-sans font-black text-[#1A1A1A] uppercase">{data.governance[0].act}</p>
                  <p className="text-[10px] font-editorial-serif italic text-[#666] leading-tight mt-1">{data.governance[0].impact}</p>
               </div>
            </div>
            <div className="flex gap-3 items-start">
               <Building2 className="w-4 h-4 text-[#006847] mt-1 shrink-0" />
               <div>
                  <p className="text-xs font-sans font-black text-[#1A1A1A] uppercase">{data.openData[0].source}</p>
                  <p className="text-[10px] font-editorial-serif italic text-[#666] leading-tight mt-1">{data.openData[0].update}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
