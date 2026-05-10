import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Info } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-[#F9F7F2] border-b-2 border-[#1A1A1A]">
      <div className="flex flex-col">
        <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#666] uppercase mb-1">Weekly Intelligence</span>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#BF3131]" />
          <span className="font-editorial-serif font-black text-2xl tracking-tighter text-[#1A1A1A] uppercase">LT Inflation</span>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-12">
        <a href="#dashboard" className="text-xs font-sans font-bold uppercase tracking-widest text-[#1A1A1A] hover:underline decoration-2 underline-offset-4">Index</a>
        <a href="#analysis" className="text-xs font-sans font-bold uppercase tracking-widest text-[#1A1A1A] hover:underline decoration-2 underline-offset-4">Analysis</a>
        <a href="#methodology" className="text-xs font-sans font-bold uppercase tracking-widest text-[#1A1A1A] hover:underline decoration-2 underline-offset-4">Archive</a>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-sans font-bold tracking-widest text-[#999] uppercase">OSP DATA SOURCE</span>
        <div className="text-sm font-editorial-serif italic font-bold text-[#1A1A1A]">Vol. 2025 • No. 042</div>
      </div>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center items-start pt-32 px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full"
      >
        <div className="w-full flex justify-between items-end border-b-4 border-[#1A1A1A] pb-8 mb-12">
          <div>
            <p className="text-[12px] font-sans font-black tracking-[0.3em] text-[#666] uppercase mb-4">The Official Economic Digest</p>
            <h1 className="text-7xl md:text-9xl font-editorial-serif font-black leading-[0.85] tracking-tighter text-[#1A1A1A] uppercase">
              Lithuanian <br />
              <span className="italic underline decoration-[#EBC515] decoration-8 underline-offset-16">Inflation</span>
            </h1>
          </div>
          <div className="hidden lg:block text-right max-w-xs pb-4">
            <p className="text-lg font-editorial-serif leading-tight italic text-[#444]">
              "A comprehensive analysis of consumer price indices and harmonised trends for a changing continent."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8">
            <p className="text-2xl font-editorial-serif font-medium leading-snug text-[#1A1A1A]">
              As the Eurozone enters a new phase of stability, the Baltic sector presents a unique case study in economic resilience. Current HICP data reveals a complex narrative of stabilization following the peak volatility of 2022.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-4">
             <a href="#dashboard" className="flex-1 text-center px-6 py-4 bg-[#1A1A1A] text-white font-sans font-bold uppercase tracking-widest text-xs hover:bg-[#BF3131] transition-all">
                Access Data
              </a>
              <button className="p-4 border-2 border-[#1A1A1A] hover:bg-white transition-all">
                <Info className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>
            <div className="flex gap-2">
              <div className="h-1 flex-1 bg-[#BF3131]"></div>
              <div className="h-1 flex-1 bg-[#EBC515]"></div>
              <div className="h-1 flex-1 bg-[#006847]"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
