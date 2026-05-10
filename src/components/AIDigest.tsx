import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, BrainCircuit, RefreshCw, FileText, TrendingUp } from 'lucide-react';
import { generateWeeklyDigest } from '../services/geminiService';
import { cn } from '../lib/utils';

export const AIDigest = ({ data, pulseData }: { data: any[], pulseData: any }) => {
  const [digest, setDigest] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDigest = async () => {
    setLoading(true);
    const result = await generateWeeklyDigest(data, pulseData);
    setDigest(result || "Analysis unavailable.");
    setLoading(false);
  };

  useEffect(() => {
    if (data && data.length > 0 && pulseData) {
      fetchDigest();
    }
  }, [data, pulseData]);

  return (
    <div id="analysis" className="w-full bg-[#F9F7F2] border-2 border-[#1A1A1A] p-0 relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(26,26,26,0.05)]">
      <div className="flex items-center justify-between p-8 border-b-2 border-[#1A1A1A]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center">
            <BrainCircuit className="w-7 h-7 text-[#EBC515]" />
          </div>
          <div>
            <h3 className="text-[#1A1A1A] font-editorial-serif font-black text-2xl tracking-tighter italic">Machine Narrative</h3>
            <p className="text-[#666] text-[10px] font-sans font-bold uppercase tracking-widest">Generative Intelligence // Sector Analysis</p>
          </div>
        </div>
        <button 
          onClick={fetchDigest}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] hover:bg-[#BF3131] text-white text-xs font-sans font-bold uppercase tracking-widest transition-all disabled:opacity-50"
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          Recalibrate
        </button>
      </div>

      <div className="relative min-h-[400px] p-8">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#F9F7F2]/80 backdrop-blur-sm z-20">
            <div className="w-10 h-10 border-4 border-[#1A1A1A]/10 border-t-[#BF3131] rounded-full animate-spin" />
            <p className="text-[#1A1A1A] font-editorial-serif italic text-sm">Synthesizing economic patterns...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4 space-y-6">
              <div className="p-6 border-l-4 border-[#BF3131] bg-white shadow-sm">
                <Sparkles className="w-5 h-5 text-[#BF3131] mb-3" />
                <h4 className="text-[#1A1A1A] font-sans font-black text-xs uppercase tracking-tighter mb-2">WEEKLY BRIEFING</h4>
                <p className="text-[#444] text-sm leading-relaxed font-sans">
                  Targeted structural insights focused on Baltic consumption parity and purchasing power.
                </p>
              </div>
              <div className="p-6 border-l-4 border-[#006847] bg-white shadow-sm">
                <TrendingUp className="w-5 h-5 text-[#006847] mb-3" />
                <h4 className="text-[#1A1A1A] font-sans font-black text-xs uppercase tracking-tighter mb-2">MACRO SYNOPSIS</h4>
                <p className="text-[#444] text-sm leading-relaxed font-sans">
                  High-level European context integrated with local statistical variation.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 p-8 bg-white border border-[#D1D1D1] relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText className="w-24 h-24 text-[#1A1A1A]" />
              </div>
              <div className="prose prose-zinc max-w-none">
                <div className="font-editorial-serif text-lg text-[#1A1A1A] leading-relaxed whitespace-pre-wrap first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:text-[#BF3131]">
                  {digest}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-[#E0E0E0] flex justify-between items-center">
                <span className="text-[9px] font-sans font-bold text-[#999] uppercase tracking-[0.2em]">End of AI Transcript // Confidential Analysis</span>
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#1A1A1A]"></div>)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
