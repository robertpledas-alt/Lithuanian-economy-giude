import React, { useState, useEffect } from 'react';
import { Navbar, Hero } from './components/UI';
import { InflationChart } from './components/Charts';
import { AIDigest } from './components/AIDigest';
import { SectorBreakdown } from './components/SectorBreakdown';
import { EconomicPulse } from './components/EconomicPulse';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ExternalLink, Mail, Github, Twitter, ChevronRight, ChevronLeft } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [pulse, setPulse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarSlide, setSidebarSlide] = useState(0);
  const [selectedYear, setSelectedYear] = useState('All');

  const getYearSummary = (year: string) => {
    const snapshots: Record<string, any> = {
      '2021': { value: '10.6%', label: 'Year End', desc: 'Energy prices start to climb post-pandemic.' },
      '2022': { value: '24.1%', label: 'Peak Cycle', desc: 'Geopolitical shocks drive historic price increases.' },
      '2023': { value: '1.2%', label: 'Year End', desc: 'Rapid normalization as supply shocks fade.' },
      '2024': { value: '1.8%', label: 'Current', desc: 'Stabilization at central bank targets.' },
      '2025': { value: '1.9%', label: 'Forecast', desc: 'Resilient growth with wage-driven pressures.' },
      'All': { value: '1.9%', label: 'Mar 2025', desc: 'Lithuania returns to targeted growth corridors.' }
    };
    return snapshots[year] || snapshots['All'];
  };

  const summary = getYearSummary(selectedYear);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inflRes, sectorRes, pulseRes] = await Promise.all([
          fetch('/api/inflation'),
          fetch('/api/sectors'),
          fetch('/api/pulse')
        ]);
        const inflJson = await inflRes.json();
        const sectorJson = await sectorRes.json();
        const pulseJson = await pulseRes.json();
        
        setData(inflJson.data);
        setSectors(sectorJson);
        setPulse(pulseJson);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans selection:bg-[#EBC515] selection:text-[#1A1A1A]">
      <Navbar />
      
      <main>
        <Hero />

        {/* Dashboard Section */}
        <section id="dashboard" className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Chart */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <InflationChart 
                data={data} 
                selectedYear={selectedYear} 
                setSelectedYear={setSelectedYear} 
              />
            </motion.div>

            {/* Sidebar Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 flex flex-col gap-0 border-2 border-[#1A1A1A] bg-white overflow-hidden relative min-h-[600px]"
            >
              <AnimatePresence mode="wait">
                {sidebarSlide === 0 && (
                  <motion.div 
                    key="slide0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex flex-col h-full divide-y-2 divide-[#1A1A1A]"
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-[10px] font-sans font-black text-[#666] uppercase tracking-[0.25em] border-b border-[#D1D1D1] pb-2">Statistical Snapshot</h4>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-[#1A1A1A]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-7xl font-editorial-serif font-black text-[#006847]">{summary.value}</span>
                        <span className="text-xs font-sans font-bold text-[#999] uppercase tracking-tighter">{summary.label}</span>
                      </div>
                      <p className="text-md font-editorial-serif italic leading-snug text-[#444]">
                        {summary.desc}
                      </p>
                    </div>

                    <div className="p-8 bg-[#BF3131]/5 flex-1">
                      <h4 className="text-[10px] font-sans font-black text-[#BF3131] uppercase tracking-[0.25em] mb-6 border-b border-[#BF3131]/20 pb-2">Historical Resistance</h4>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-7xl font-editorial-serif font-black text-[#BF3131]">24.1%</span>
                        <span className="text-xs font-sans font-bold text-[#999] uppercase tracking-tighter">SEP 2022</span>
                      </div>
                      <p className="text-md font-editorial-serif italic leading-snug text-[#444]">
                        The apex of the inflationary cycle. This period remains the benchmark for systemic economic strain.
                      </p>
                    </div>

                    <button 
                      onClick={() => setSidebarSlide(1)}
                      className="w-full p-6 bg-[#1A1A1A] text-white font-sans font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#BF3131] transition-all"
                    >
                      Next: Sector Breakdown <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
                {sidebarSlide === 1 && (
                  <motion.div 
                    key="slide1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="p-8 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                       <div className="flex gap-2">
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#1A1A1A]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                       </div>
                       <button 
                        onClick={() => setSidebarSlide(0)}
                        className="text-[10px] font-sans font-black text-[#999] hover:text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3 h-3" /> Previous
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <SectorBreakdown sectors={sectors} />
                    </div>

                    <button 
                      onClick={() => setSidebarSlide(2)}
                      className="w-full p-6 bg-[#1A1A1A] mt-8 text-white font-sans font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#006847] transition-all"
                    >
                      Next: Macro Pulse <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
                {sidebarSlide === 2 && (
                  <motion.div 
                    key="slide2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="p-8 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                       <div className="flex gap-2">
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#1A1A1A]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                       </div>
                       <button 
                        onClick={() => setSidebarSlide(1)}
                        className="text-[10px] font-sans font-black text-[#999] hover:text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3 h-3" /> Previous
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <EconomicPulse data={pulse} />
                    </div>

                    <button 
                      onClick={() => setSidebarSlide(3)}
                      className="w-full p-6 bg-[#1A1A1A] mt-8 text-white font-sans font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#006847] transition-all"
                    >
                      Next: Open Data <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
                {sidebarSlide === 3 && (
                  <motion.div 
                    key="slide3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="p-8 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                       <div className="flex gap-2">
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#D1D1D1]"></div>
                          <div className="w-2 h-2 bg-[#1A1A1A]"></div>
                       </div>
                       <button 
                        onClick={() => setSidebarSlide(2)}
                        className="text-[10px] font-sans font-black text-[#999] hover:text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1"
                      >
                        <ChevronLeft className="w-3 h-3" /> Previous
                      </button>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                       <h4 className="text-[10px] font-sans font-black text-[#666] uppercase tracking-[0.25em] border-b border-[#D1D1D1] pb-2">Data.gov.lt Feed</h4>
                       <div className="space-y-4">
                          {pulse?.openData.map((item: any, i: number) => (
                            <div key={i} className="group border-l-2 border-[#D1D1D1] pl-4 py-1 hover:border-[#1A1A1A] transition-all">
                               <p className="text-[10px] font-sans font-black uppercase text-[#999] group-hover:text-[#1A1A1A]">{item.source}</p>
                               <p className="text-xs font-editorial-serif italic text-[#444] leading-tight mt-1">{item.update}</p>
                            </div>
                          ))}
                       </div>
                    </div>

                    <button 
                      onClick={() => setSidebarSlide(0)}
                      className="w-full p-6 bg-[#EBC515] mt-8 text-[#1A1A1A] font-sans font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-[#1A1A1A] hover:text-white transition-all"
                    >
                      Return to Index <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* AI Analysis Section */}
        <section className="max-w-7xl mx-auto px-8 py-24 border-t-4 border-[#1A1A1A]">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
            <h2 className="text-5xl font-editorial-serif font-black text-[#1A1A1A] uppercase leading-none">
              The <span className="italic text-[#BF3131]">Analytical</span> <br />Perspective
            </h2>
            <p className="max-w-md text-sm font-sans font-medium text-[#666] leading-relaxed">
              Utilizing large language models to synthesize complex HICP data points into coherent economic narratives for policy makers and investors.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AIDigest data={data} pulseData={pulse} />
          </motion.div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="max-w-7xl mx-auto px-8 py-32 border-t-2 border-[#D1D1D1]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="text-left">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white text-[10px] font-sans font-bold uppercase tracking-[0.25em] mb-8">
                <Info className="w-4 h-4" />
                Registry Oversight
              </div>
              <h2 className="text-6xl font-editorial-serif font-black tracking-tighter text-[#1A1A1A] mb-8 leading-none">
                Data Derived From <br /><span className="italic underline decoration-[#BF3131]">Source Truth.</span>
              </h2>
              <p className="text-lg font-editorial-serif italic text-[#444] leading-relaxed mb-8">
                "We maintain an immutable link to the Lithuanian Official Statistics Portal. Every figure, every decimal, and every trend is cross-referenced with harmonised Eurostat protocols."
              </p>
              <div className="flex gap-12 grayscale">
                <div className="text-[10px] font-sans font-black tracking-widest opacity-40">OSP.STAT.GOV.LT</div>
                <div className="text-[10px] font-sans font-black tracking-widest opacity-40">EUROSTAT REGISTRY</div>
                <div className="text-[10px] font-sans font-black tracking-widest opacity-40">ECB ARCHIVE</div>
              </div>
            </div>
            <div className="p-12 border-2 border-dashed border-[#1A1A1A] flex flex-col gap-6">
              <h4 className="text-xs font-sans font-black uppercase tracking-[0.3em] text-[#999]">Integrity Report</h4>
              <div className="space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex justify-between items-center border-b border-[#D1D1D1] pb-2">
                    <span className="text-xs font-sans font-bold uppercase text-[#444]">Metric Node {i}</span>
                    <span className="text-xs font-sans font-black text-[#006847]">VERIFIED</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white pt-32 pb-12 px-8 uppercase">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-24">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-8">
               <div className="w-4 h-4 bg-[#BF3131]" />
               <div className="w-4 h-4 bg-[#EBC515]" />
               <div className="w-4 h-4 bg-[#006847]" />
               <span className="font-editorial-serif font-black text-3xl tracking-tighter ml-2">LT INFLATION</span>
            </div>
            <p className="text-white/40 text-[10px] font-sans font-bold tracking-[0.3em] leading-relaxed max-w-sm">
              PREMIUM ECONOMIC DIGEST // EST. 2025 // BUILT FOR THE INTELLIGENT INVESTOR AND FISCAL STRATEGIST. ALL DATA PROTECTED BY STATISTICAL INTEGRITY ACTS.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-sans font-black text-[#EBC515] tracking-[0.3em] mb-8 italic">DEPARTMENTS</h5>
            <ul className="flex flex-col gap-4 text-[10px] font-bold tracking-widest text-white/60">
              <li className="hover:text-white transition-colors cursor-pointer">Indices & Data</li>
              <li className="hover:text-white transition-colors cursor-pointer">Machine Narrative</li>
              <li className="hover:text-white transition-colors cursor-pointer">Live Statistical Feed</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-sans font-black text-[#EBC515] tracking-[0.3em] mb-8 italic">CHANNELS</h5>
            <ul className="flex flex-col gap-4 text-[10px] font-bold tracking-widest text-white/60">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">Twitter / X</li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">Stat-Terminal</li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">Economic Bulletin</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 flex justify-between items-center italic text-[10px] font-sans font-bold opacity-30 tracking-[0.4em]">
          <span>© 2025 ALL RIGHTS RESERVED</span>
          <span>CONFIDENTIAL // NO. 142</span>
        </div>
      </footer>
    </div>
  );
}
