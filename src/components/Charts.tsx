import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, LineChart as LineChartIcon, SlidersHorizontal } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A1A] border-2 border-[#1A1A1A] p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <p className="text-[10px] text-white/50 uppercase font-sans font-bold tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-editorial-serif font-black text-white">
          {payload[0].value.toFixed(1)}%
        </p>
        <div className="h-1 w-full bg-[#BF3131] mt-2"></div>
      </div>
    );
  }
  return null;
};

export const InflationChart = ({ 
  data, 
  selectedYear, 
  setSelectedYear 
}: { 
  data: any[], 
  selectedYear: string,
  setSelectedYear: (year: string) => void
}) => {
  const [chartType, setChartType] = React.useState<'line' | 'bar'>('line');
  const years = ['All', '2021', '2022', '2023', '2024', '2025'];

  const filteredData = selectedYear === 'All' 
    ? data 
    : data.filter(d => d.month.startsWith(selectedYear));

  return (
    <div className="w-full h-[600px] bg-white border-2 border-[#1A1A1A] p-0 relative overflow-hidden flex flex-col">
      <div className="p-8 border-b border-[#D1D1D1] bg-[#F9F7F2]/50 flex justify-between items-start">
        <div>
          <h3 className="text-[#1A1A1A] font-editorial-serif font-black text-3xl tracking-tighter mb-1">
            Harmonised Index <span className="italic">of</span> Consumer Prices
          </h3>
          <p className="text-[#666] text-[10px] font-sans font-black uppercase tracking-[0.2em]">
            Annual Growth Rate (HICP % Change) // {selectedYear === 'All' ? 'Full Cycle' : `Internal Audit: ${selectedYear}`}
          </p>
        </div>
        
        <div className="flex flex-col gap-4 items-end">
          <div className="flex bg-[#E0E0E0] p-1 gap-1">
            <button 
              onClick={() => setChartType('line')}
              className={`p-2 transition-all ${chartType === 'line' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
            >
              <LineChartIcon className="w-4 h-4 text-[#1A1A1A]" />
            </button>
            <button 
              onClick={() => setChartType('bar')}
              className={`p-2 transition-all ${chartType === 'bar' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
            >
              <BarChart3 className="w-4 h-4 text-[#1A1A1A]" />
            </button>
          </div>
          
          <div className="flex gap-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`text-[9px] font-sans font-black uppercase tracking-widest px-3 py-1 border transition-all ${
                  selectedYear === year 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                    : 'bg-transparent text-[#999] border-[#D1D1D1] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-8">
        <ResponsiveContainer width="100%" height="100%">
          <AnimatePresence mode="wait">
            {chartType === 'line' ? (
              <motion.div
                key="line-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <AreaChart
                  data={filteredData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BF3131" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#BF3131" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" vertical={true} stroke="#E0E0E0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={{ stroke: '#1A1A1A', strokeWidth: 2 }} 
                    tickLine={{ stroke: '#1A1A1A' }} 
                    tick={{ fill: '#1A1A1A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Inter' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={{ stroke: '#1A1A1A', strokeWidth: 2 }} 
                    tickLine={{ stroke: '#1A1A1A' }} 
                    tick={{ fill: '#1A1A1A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Inter' }}
                    dx={-10}
                    unit="%"
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1A1A1A', strokeWidth: 2, strokeDasharray: '4 4' }} />
                  
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#BF3131" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </motion.div>
            ) : (
              <motion.div
                key="bar-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <BarChart
                  data={filteredData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#E0E0E0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={{ stroke: '#1A1A1A', strokeWidth: 2 }} 
                    tickLine={{ stroke: '#1A1A1A' }} 
                    tick={{ fill: '#1A1A1A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Inter' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={{ stroke: '#1A1A1A', strokeWidth: 2 }} 
                    tickLine={{ stroke: '#1A1A1A' }} 
                    tick={{ fill: '#1A1A1A', fontSize: 10, fontWeight: 'bold', fontFamily: 'Inter' }}
                    dx={-10}
                    unit="%"
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A1A', opacity: 0.05 }} />
                  <Bar 
                    dataKey="value" 
                    animationDuration={1500}
                  >
                    {filteredData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value > 10 ? '#BF3131' : entry.value > 2 ? '#EBC515' : '#006847'} />
                    ))}
                  </Bar>
                </BarChart>
              </motion.div>
            )}
          </AnimatePresence>
        </ResponsiveContainer>
      </div>
      <div className="bg-[#1A1A1A] p-3 flex justify-between items-center text-white px-8">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3 h-3 opacity-50" />
          <span className="text-[9px] font-sans font-bold tracking-[0.3em]">REACTIONARY FISCAL TRACKING</span>
        </div>
        <span className="text-[9px] font-sans font-black tracking-[0.3em] uppercase">
          {selectedYear === 'All' ? 'Full Historical Audit' : `Deep Dive // FY ${selectedYear}`}
        </span>
      </div>
    </div>
  );
};
