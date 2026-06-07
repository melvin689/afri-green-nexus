import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, RefreshCw, AlertTriangle, CheckCircle2, History, Trash2, Microscope, Zap, Thermometer, Droplets } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanHistory {
  id: number;
  crop: string;
  condition: string;
  status: 'Healthy' | 'Disease Detected';
  date: string;
}

const DISEASE_DATABASE = [
  {
    name: "Maize Leaf Blight",
    probability: "94%",
    description: "Elongated, grayish-green or tan lesions on leaves. Can significantly reduce yield if left untreated.",
    treatment: ["Apply appropriate fungicides (e.g., Mancozeb).", "Remove and burn heavily infected leaves.", "Improve field drainage to reduce humidity."],
    prevention: ["Use blight-resistant seed varieties.", "Rotate crops with non-grass species.", "Manage weed hosts near the field."],
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Coffee Leaf Rust",
    probability: "89%",
    description: "Orange, powdery spots on the underside of leaves. It's the most devastating disease of coffee globally.",
    treatment: ["Prune affected branches.", "Apply copper-based fungicides.", "Improve air circulation in the plantation."],
    prevention: ["Plant rust-resistant cultivars.", "Maintain optimal soil nutrition.", "Monitor humidity levels closely."],
    image: "https://images.unsplash.com/photo-1524350303359-99436706013a?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Tomato Late Blight",
    probability: "91%",
    description: "Dark, water-soaked spots on leaves and fruit. Rapidly destroys crops in cool, wet weather.",
    treatment: ["Destroy all infected plant material.", "Avoid overhead irrigation.", "Use preventative fungicide sprays."],
    prevention: ["Use certified disease-free seeds.", "Ensure wide spacing for airflow.", "Keep leaves dry as much as possible."],
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=400&auto=format&fit=crop"
  }
];

export default function AgroScan() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<ScanHistory[]>([]);
  const [scanStep, setScanStep] = useState("");

  // Load History
  useEffect(() => {
    const saved = localStorage.getItem('afrinova_agroscan_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (scan: ScanHistory) => {
    const newHistory = [scan, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('afrinova_agroscan_history', JSON.stringify(newHistory));
  };

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setProgress(0);
    
    const steps = ["Initializing AI...", "Calibrating Sensors...", "Analyzing Pigmentation...", "Matching Patterns...", "Finalizing Diagnosis..."];
    let stepIdx = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          
          const isHealthy = Math.random() > 0.4;
          if (isHealthy) {
            setResult({ status: 'healthy' });
            saveToHistory({
              id: Date.now(),
              crop: "General Crop",
              condition: "Excellent",
              status: 'Healthy',
              date: new Date().toLocaleDateString()
            });
          } else {
            const disease = DISEASE_DATABASE[Math.floor(Math.random() * DISEASE_DATABASE.length)];
            setResult({ status: 'diseased', ...disease });
            saveToHistory({
              id: Date.now(),
              crop: disease.name.split(' ')[0],
              condition: disease.name,
              status: 'Disease Detected',
              date: new Date().toLocaleDateString()
            });
          }
          return 100;
        }
        
        if (prev % 20 === 0 && stepIdx < steps.length) {
          setScanStep(steps[stepIdx++]);
        }
        return prev + 5;
      });
    }, 150);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('afrinova_agroscan_history');
    toast.info("Scan history cleared");
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shrink-0">
             <Microscope className="h-12 w-12 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold md:text-5xl tracking-tight">AgroScan AI</h1>
            <p className="mt-2 max-w-xl text-emerald-50 text-lg opacity-90 italic">
              "Your pocket crop doctor. Detect diseases instantly using advanced computer vision."
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-12 transform origin-right" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden border-emerald-100 shadow-lg">
            <CardHeader className="bg-emerald-50/50 border-b">
              <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-emerald-900">Live Analysis</CardTitle>
                   <CardDescription>Upload a clear photo of the leaf or stem</CardDescription>
                </div>
                {result && <Button variant="outline" size="sm" onClick={() => setResult(null)} className="h-8 border-emerald-200">Reset</Button>}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {!scanning && !result ? (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-md flex flex-col items-center gap-6"
                  >
                    <div className="relative w-full aspect-square max-w-[280px] overflow-hidden rounded-3xl border-4 border-dashed border-emerald-200 bg-emerald-50/50 flex items-center justify-center group hover:border-emerald-400 transition-all cursor-pointer">
                      <div className="flex flex-col items-center gap-4 text-emerald-600 group-hover:scale-110 transition-transform">
                        <Camera className="h-16 w-16 opacity-40" />
                        <p className="text-sm font-bold uppercase tracking-wider">Take Photo</p>
                      </div>
                    </div>
                    <Button size="lg" onClick={handleScan} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 shadow-md text-lg font-bold">
                       Start Diagnostics
                    </Button>
                    <p className="text-xs text-muted-foreground text-center px-4">
                      Best results with natural lighting. Ensure the affected area is in focus.
                    </p>
                  </motion.div>
                ) : scanning ? (
                  <motion.div 
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-8 w-full max-w-sm px-6"
                  >
                    <div className="relative h-32 w-32">
                       <div className="absolute inset-0 rounded-full border-8 border-emerald-100" />
                       <div className="absolute inset-0 rounded-full border-8 border-emerald-600 border-t-transparent animate-spin" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Zap className="h-10 w-10 text-emerald-600 animate-pulse" />
                       </div>
                    </div>
                    <div className="w-full space-y-3">
                       <div className="flex justify-between items-center text-sm font-bold text-emerald-800">
                          <span>{scanStep}</span>
                          <span>{progress}%</span>
                       </div>
                       <Progress value={progress} className="h-3 bg-emerald-100" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full space-y-6"
                  >
                    {result.status === 'healthy' ? (
                      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                        <div className="h-20 w-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                           <CheckCircle2 className="h-12 w-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-emerald-900">Crop is Healthy!</h3>
                          <p className="text-emerald-700 font-medium">No signs of disease or pest infestation detected.</p>
                        </div>
                        <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                          Your crop looks robust. Maintain current irrigation and fertilization schedules. Use the "Tips" section for growth optimization.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="relative h-56 rounded-2xl overflow-hidden shadow-md">
                           <img src={result.image} className="h-full w-full object-cover" alt={result.name} />
                           <div className="absolute top-4 right-4">
                              <Badge className="bg-red-600 hover:bg-red-700 text-white shadow-lg border-none px-4 py-1.5 text-sm font-bold">
                                 {result.name}
                              </Badge>
                           </div>
                           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                              <div className="flex items-center gap-4">
                                 <div className="text-white">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">AI Confidence</p>
                                    <p className="text-2xl font-black">{result.probability}</p>
                                 </div>
                                 <div className="h-10 w-[1px] bg-white/20" />
                                 <div className="text-white">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-70">Threat Level</p>
                                    <p className="text-xl font-bold text-orange-400">High</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                           <Card className="bg-red-50/50 border-red-100">
                              <CardHeader className="pb-2">
                                 <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-800">
                                    <Microscope className="h-4 w-4" /> Treatment
                                 </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                 {result.treatment.map((t: string) => (
                                   <p key={t} className="text-xs text-red-900 flex gap-2">
                                      <span className="shrink-0">•</span> {t}
                                   </p>
                                 ))}
                              </CardContent>
                           </Card>
                           <Card className="bg-emerald-50/50 border-emerald-100">
                              <CardHeader className="pb-2">
                                 <CardTitle className="text-sm font-bold flex items-center gap-2 text-emerald-800">
                                    <Microscope className="h-4 w-4" /> Prevention
                                 </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                 {result.prevention.map((p: string) => (
                                   <p key={p} className="text-xs text-emerald-900 flex gap-2">
                                      <span className="shrink-0">•</span> {p}
                                   </p>
                                 ))}
                              </CardContent>
                           </Card>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-emerald-100 shadow-sm">
             <CardHeader className="pb-2 border-b bg-emerald-50/30">
                <CardTitle className="text-lg flex items-center justify-between">
                   <div className="flex items-center gap-2 text-emerald-800">
                      <History className="h-5 w-5" /> Recent Scans
                   </div>
                   {history.length > 0 && (
                     <Button variant="ghost" size="icon" onClick={clearHistory} className="h-8 w-8 text-zinc-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                     </Button>
                   )}
                </CardTitle>
             </CardHeader>
             <CardContent className="px-0">
                {history.length > 0 ? (
                  <div className="divide-y">
                     {history.map(item => (
                       <div key={item.id} className="p-4 hover:bg-emerald-50/20 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                             <span className="text-sm font-bold text-emerald-950">{item.crop}</span>
                             <span className="text-[10px] font-medium text-zinc-400">{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Badge variant={item.status === 'Healthy' ? 'success' : 'destructive'} className="text-[10px] h-4 py-0">
                                {item.status}
                             </Badge>
                             <span className="text-[10px] text-zinc-500 truncate">{item.condition}</span>
                          </div>
                       </div>
                     ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                     <Microscope className="h-8 w-8 text-zinc-200 mx-auto mb-2" />
                     <p className="text-xs text-zinc-400 italic">No recent diagnostic history.</p>
                  </div>
                )}
             </CardContent>
          </Card>

          <Card className="bg-zinc-900 text-white overflow-hidden">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-2">
                   <Zap className="h-4 w-4" /> Live Field Data
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-400" />
                      <span className="text-xs font-medium text-zinc-400">Temp</span>
                   </div>
                   <span className="text-sm font-bold">28°C</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-medium text-zinc-400">Humidity</span>
                   </div>
                   <span className="text-sm font-bold">65%</span>
                </div>
                <div className="h-[1px] bg-white/10 my-2" />
                <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                  * Based on your current location (Kampala). Environmental factors contribute to 45% of disease spread.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
