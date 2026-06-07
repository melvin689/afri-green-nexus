import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Search, Leaf, Info, AlertCircle, CheckCircle, Recycle, History, Trash2, Globe, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface GreenScan {
  id: number;
  item: string;
  impact: string;
  date: string;
  status: 'High' | 'Medium' | 'Low';
}

const OBJECT_DB: Record<string, any> = {
  "Plastic Bottle": {
    impact: "High",
    decomposition: "450 years",
    carbon: "82.8g CO2e",
    recyclability: "High (PET 1)",
    instructions: [
      "Empty and rinse the bottle thoroughly.",
      "Crush the bottle to save collection space.",
      "Dispose in Blue Bin or sell via Trash2Cash."
    ],
    image: "https://images.unsplash.com/photo-1554224155-aa5cdd09fa65?q=80&w=400&auto=format&fit=crop"
  },
  "Paper Coffee Cup": {
    impact: "Medium",
    decomposition: "20-30 years",
    carbon: "60.4g CO2e",
    recyclability: "Low (Composite)",
    instructions: [
      "Separate the plastic lid from the paper cup.",
      "Check for wax lining - most are not recyclable with paper.",
      "Compost only if certified biodegradable."
    ],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop"
  },
  "Aluminium Can": {
    impact: "Medium",
    decomposition: "80-200 years",
    carbon: "1.2kg CO2e (new)",
    recyclability: "Excellent (Infinitely)",
    instructions: [
      "Rinse out any liquid residue.",
      "Do not crush if using automated sorting systems.",
      "Aluminium is highly valuable - list on Trash2Cash!"
    ],
    image: "https://images.unsplash.com/photo-1594315513233-68f23795f5c9?q=80&w=400&auto=format&fit=crop"
  }
};

export default function GreenLens() {
  const [analyzing, setAnalyzing] = useState(false);
  const [scannedItem, setScannedItem] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<GreenScan[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('afrinova_greenlens_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveHistory = (scan: GreenScan) => {
    const newHistory = [scan, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('afrinova_greenlens_history', JSON.stringify(newHistory));
  };

  const startScan = () => {
    setAnalyzing(true);
    setScannedItem(null);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          const keys = Object.keys(OBJECT_DB);
          const name = keys[Math.floor(Math.random() * keys.length)];
          const data = OBJECT_DB[name];
          setScannedItem({ name, ...data });
          saveHistory({
            id: Date.now(),
            item: name,
            impact: data.impact,
            date: new Date().toLocaleDateString(),
            status: data.impact
          });
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('afrinova_greenlens_history');
    toast.info("History cleared");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-green-800 via-emerald-700 to-teal-600 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="h-20 w-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/20 rotate-12">
              <Globe className="h-10 w-10 text-white" />
           </div>
           <div>
              <h1 className="text-3xl font-extrabold md:text-5xl tracking-tight">GreenLens AI</h1>
              <p className="mt-2 max-w-lg text-emerald-50 text-lg opacity-90 font-medium leading-relaxed">
                "See through waste. Understand the true environmental cost of everyday objects."
              </p>
           </div>
        </div>
        <div className="absolute -bottom-10 -right-10 h-48 w-48 bg-emerald-400/20 rounded-full blur-3xl" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden border-emerald-100 shadow-lg bg-gradient-to-b from-white to-emerald-50/20 min-h-[500px] flex flex-col">
            <CardHeader className="bg-emerald-50/30 border-b flex flex-row items-center justify-between">
              <div>
                 <CardTitle className="text-emerald-900">Environmental Scanner</CardTitle>
                 <CardDescription>Position the object within the frame</CardDescription>
              </div>
              {scannedItem && <Button variant="ghost" size="sm" onClick={() => setScannedItem(null)} className="text-emerald-700 hover:bg-emerald-100">Reset</Button>}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
              <AnimatePresence mode="wait">
                {!analyzing && !scannedItem ? (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-8 w-full max-w-sm"
                  >
                    <div className="relative w-full aspect-square bg-emerald-50/50 rounded-[40px] border-4 border-dashed border-emerald-200 flex items-center justify-center group overflow-hidden">
                       <div className="absolute inset-0 bg-emerald-600/5 group-hover:bg-emerald-600/10 transition-colors" />
                       <div className="flex flex-col items-center gap-4 text-emerald-600 transition-transform group-hover:scale-105">
                          <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center">
                             <Camera className="h-10 w-10" />
                          </div>
                          <p className="font-bold text-sm tracking-widest uppercase opacity-70">Focus Camera</p>
                       </div>
                    </div>
                    <Button onClick={startScan} size="lg" className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 shadow-lg text-lg font-bold">
                       Identify & Analyze
                    </Button>
                  </motion.div>
                ) : analyzing ? (
                  <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-8 w-full max-w-sm px-6"
                  >
                    <div className="relative h-40 w-40 flex items-center justify-center">
                       <div className="absolute inset-0 rounded-full border-[10px] border-emerald-100" />
                       <div className="absolute inset-0 rounded-full border-[10px] border-emerald-600 border-t-transparent animate-spin" />
                       <Search className="h-16 w-16 text-emerald-600" />
                       <motion.div 
                          className="absolute inset-0 border-4 border-emerald-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                       />
                    </div>
                    <div className="w-full space-y-4 text-center">
                       <p className="text-lg font-bold text-emerald-900 tracking-tight">Accessing Database...</p>
                       <Progress value={progress} className="h-2 bg-emerald-100" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full space-y-8"
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                       <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                          <img src={scannedItem.image} className="h-full w-full object-cover" alt={scannedItem.name} />
                          <div className="absolute bottom-4 left-4 right-4">
                             <Badge className="w-full justify-center h-10 bg-white/90 backdrop-blur border-none text-emerald-900 font-black text-lg shadow-xl">
                                {scannedItem.name}
                             </Badge>
                          </div>
                       </div>
                       
                       <div className="space-y-6">
                          <div>
                             <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">Core Statistics</h4>
                             <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-white border border-emerald-100 rounded-2xl shadow-sm">
                                   <p className="text-[10px] font-bold text-zinc-400 uppercase">Impact</p>
                                   <p className={`text-lg font-black ${
                                      scannedItem.impact === 'High' ? 'text-red-600' : 'text-orange-500'
                                   }`}>{scannedItem.impact}</p>
                                </div>
                                <div className="p-4 bg-white border border-emerald-100 rounded-2xl shadow-sm">
                                   <p className="text-[10px] font-bold text-zinc-400 uppercase">CO2 Cost</p>
                                   <p className="text-lg font-black text-emerald-900">{scannedItem.carbon}</p>
                                </div>
                                <div className="p-4 bg-white border border-emerald-100 rounded-2xl shadow-sm">
                                   <p className="text-[10px] font-bold text-zinc-400 uppercase">Decomp</p>
                                   <p className="text-lg font-black text-zinc-800">{scannedItem.decomposition}</p>
                                </div>
                                <div className="p-4 bg-white border border-emerald-100 rounded-2xl shadow-sm">
                                   <p className="text-[10px] font-bold text-zinc-400 uppercase">Recyclable</p>
                                   <p className="text-sm font-black text-blue-600">{scannedItem.recyclability}</p>
                                </div>
                             </div>
                          </div>
                          
                          <div className="p-5 bg-emerald-900 rounded-2xl text-white shadow-xl relative overflow-hidden">
                             <div className="relative z-10">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                                   <CheckCircle className="h-4 w-4" /> Disposal Protocol
                                </h4>
                                <ul className="space-y-2">
                                   {scannedItem.instructions.map((inst: string, i: number) => (
                                      <li key={i} className="text-xs font-medium leading-relaxed opacity-90 flex gap-2">
                                         <span className="text-emerald-400 font-bold">{i+1}.</span> {inst}
                                      </li>
                                   ))}
                                </ul>
                             </div>
                             <div className="absolute -right-4 -bottom-4 rotate-12 opacity-10">
                                <Recycle className="h-24 w-24" />
                             </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-emerald-100 shadow-sm">
             <CardHeader className="pb-3 border-b bg-emerald-50/20">
                <div className="flex items-center justify-between">
                   <CardTitle className="text-lg flex items-center gap-2 text-emerald-800">
                      <History className="h-5 w-5" /> Recent Scans
                   </CardTitle>
                   {history.length > 0 && (
                     <Button variant="ghost" size="icon" onClick={clearHistory} className="h-8 w-8 text-zinc-400 hover:text-red-500 rounded-full">
                        <Trash2 className="h-4 w-4" />
                     </Button>
                   )}
                </div>
             </CardHeader>
             <CardContent className="px-0">
                {history.length > 0 ? (
                  <div className="divide-y max-h-[400px] overflow-y-auto">
                     {history.map(item => (
                       <div key={item.id} className="p-4 hover:bg-emerald-50/30 transition-colors flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                <Search className="h-4 w-4" />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-zinc-800">{item.item}</p>
                                <p className="text-[10px] text-zinc-400">{item.date}</p>
                             </div>
                          </div>
                          <Badge 
                            variant={item.impact === 'High' ? 'destructive' : item.impact === 'Medium' ? 'outline' : 'success'}
                            className="text-[10px] h-4 py-0"
                          >
                             {item.impact}
                          </Badge>
                       </div>
                     ))}
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-3">
                     <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                        <Leaf className="h-6 w-6 text-emerald-200" />
                     </div>
                     <p className="text-xs text-zinc-400 italic">No environmental scans yet.</p>
                  </div>
                )}
             </CardContent>
          </Card>

          <Card className="bg-emerald-600 text-white shadow-lg overflow-hidden relative">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                   <TrendingUp className="h-4 w-4" /> Eco Progress
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-3xl font-black">2.4kg</p>
                      <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">CO2 Diverted</p>
                   </div>
                   <div className="text-right">
                      <p className="text-lg font-bold">Level 4</p>
                      <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">Earth Guardian</p>
                   </div>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                   <div className="h-full bg-white w-2/3" />
                </div>
                <p className="text-[10px] text-emerald-100 italic">
                  Keep scanning to unlock the "Master Recycler" badge and earn double rewards on Trash2Cash.
                </p>
             </CardContent>
             <div className="absolute top-0 right-0 p-2">
                <Info className="h-4 w-4 opacity-30" />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
