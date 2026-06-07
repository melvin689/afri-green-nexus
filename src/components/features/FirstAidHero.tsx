import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Flame, 
  Wind, 
  Droplets, 
  UserRound, 
  ChevronRight, 
  PlayCircle,
  ShieldAlert,
  Volume2,
  PhoneCall,
  Clock,
  BookOpen,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const emergencies = [
  { id: 'burns', name: 'Burns', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', urgency: 'Critical' },
  { id: 'choking', name: 'Choking', icon: Wind, color: 'text-blue-600', bg: 'bg-blue-100', urgency: 'Extreme' },
  { id: 'bleeding', name: 'Bleeding', icon: Droplets, color: 'text-red-600', bg: 'bg-red-100', urgency: 'Immediate' },
  { id: 'fainting', name: 'Fainting', icon: UserRound, color: 'text-purple-600', bg: 'bg-purple-100', urgency: 'Urgent' },
];

const GUIDES: Record<string, any[]> = {
  burns: [
    {
      title: "Cool the Burn",
      desc: "Immediately hold the burned area under cool (not cold) running water for at least 20 minutes.",
      note: "DO NOT USE ICE! It can damage the tissue further.",
      image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Remove Constraints",
      desc: "Carefully remove any jewelry or clothing near the burn before the area starts to swell.",
      note: "If clothing is stuck to the burn, DO NOT pull it off.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Cover Loosely",
      desc: "Apply a clean, sterile bandage or plastic wrap loosely over the burn to protect it.",
      note: "Avoid cotton balls or fluffy materials that might stick.",
      image: "https://images.unsplash.com/photo-1583946028511-37f229713e2d?q=80&w=400&auto=format&fit=crop"
    }
  ],
  choking: [
    {
      title: "Encourage Coughing",
      desc: "If the person can speak or cough strongly, encourage them to keep coughing to clear the blockage.",
      note: "Do not interfere if they are coughing strongly.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "5 Back Blows",
      desc: "Lean them forward and give 5 sharp blows between the shoulder blades with the heel of your hand.",
      note: "Check if the object has come out after each blow.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop"
    }
  ]
};

export default function FirstAidHero() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  const startGuide = (id: string) => {
    setSelectedId(id);
    setStepIndex(0);
  };

  const activeGuide = selectedId ? GUIDES[selectedId] || GUIDES['burns'] : [];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-red-600 p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="h-20 w-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/20 shadow-inner animate-pulse">
              <ShieldAlert className="h-10 w-10 text-white" />
           </div>
           <div>
              <h1 className="text-3xl font-black md:text-5xl tracking-tight">First Aid Hero</h1>
              <p className="mt-2 max-w-lg text-red-50 text-lg font-bold opacity-90 italic">
                "Be the hero. Instant life-saving guidance for any emergency."
              </p>
           </div>
        </div>
        <div className="absolute -top-10 -left-10 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="flex gap-4 p-2 bg-white rounded-2xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for an emergency (e.g. Heart Attack, Cut, Sting)..." 
            className="pl-10 h-12 border-none focus-visible:ring-0 text-lg font-medium" 
          />
        </div>
        <Button className="h-12 px-8 bg-red-600 hover:bg-red-700 shadow-lg font-black uppercase tracking-widest text-xs">
           Search
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {emergencies.map((item) => (
              <Card 
                key={item.id} 
                className="group cursor-pointer border-none shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-[2rem] overflow-hidden"
                onClick={() => startGuide(item.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className={`mb-6 rounded-3xl p-6 ${item.bg} group-hover:scale-110 transition-transform`}>
                    <item.icon className={`h-10 w-10 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-black text-zinc-800 mb-1">{item.name}</h3>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-zinc-200">{item.urgency}</Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="guide"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-zinc-100 p-2 rounded-2xl">
               <Button variant="ghost" onClick={() => setSelectedId(null)} className="font-bold text-zinc-600 hover:bg-white rounded-xl">
                  <ChevronLeft className="mr-2 h-4 w-4" /> All Emergencies
               </Button>
               <Badge className="bg-red-600 font-black uppercase text-[10px] tracking-[0.2em] px-4 py-1.5 h-auto">
                  Emergency Live
               </Badge>
            </div>

            <Card className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
               <div className="bg-red-600 px-8 py-6 text-white flex items-center justify-between">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-80 mb-1">Emergency Protocol</p>
                     <h2 className="text-2xl font-black flex items-center gap-3">
                        {selectedId.toUpperCase()}: Step {stepIndex + 1}
                     </h2>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold opacity-60 uppercase">Step Time</p>
                        <p className="text-sm font-black flex items-center justify-end gap-1">
                           <Clock className="h-3 w-3" /> ~2m
                        </p>
                     </div>
                     <Button size="icon" variant="secondary" className="h-12 w-12 rounded-2xl shadow-lg">
                        <Volume2 className="h-6 w-6" />
                     </Button>
                  </div>
               </div>
               
               <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                     <div className="p-10 flex flex-col justify-between space-y-8">
                        <div className="space-y-6">
                           <h3 className="text-3xl font-black text-zinc-900 leading-tight">
                              {activeGuide[stepIndex]?.title}
                           </h3>
                           <p className="text-lg font-medium text-zinc-600 leading-relaxed">
                              {activeGuide[stepIndex]?.desc}
                           </p>
                           
                           <div className="bg-amber-50 border-l-8 border-amber-500 p-6 rounded-r-2xl">
                              <p className="text-xs font-black text-amber-900 uppercase tracking-widest mb-2">Crucial Note</p>
                              <p className="text-sm font-bold text-amber-800 leading-relaxed italic">
                                "{activeGuide[stepIndex]?.note}"
                              </p>
                           </div>
                        </div>

                        <div className="flex gap-4">
                           <Button 
                             variant="outline" 
                             className="flex-1 h-14 rounded-2xl font-black border-zinc-200"
                             disabled={stepIndex === 0}
                             onClick={() => setStepIndex(prev => prev - 1)}
                           >
                              <ChevronLeft className="mr-2 h-5 w-5" /> Previous
                           </Button>
                           <Button 
                             className="flex-[2] h-14 rounded-2xl font-black bg-zinc-900 hover:bg-black shadow-xl"
                             onClick={() => {
                               if (stepIndex < activeGuide.length - 1) {
                                 setStepIndex(prev => prev + 1);
                               } else {
                                 toast.success("Guide completed! Professional help should be arriving.");
                                 setSelectedId(null);
                               }
                             }}
                           >
                              {stepIndex < activeGuide.length - 1 ? "Next Step" : "Complete Guide"} 
                              <ChevronRight className="ml-2 h-5 w-5" />
                           </Button>
                        </div>
                     </div>
                     
                     <div className="relative aspect-square bg-zinc-50 flex items-center justify-center p-4">
                        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative">
                           <img src={activeGuide[stepIndex]?.image} className="h-full w-full object-cover" alt="Guide step" />
                           <div className="absolute inset-0 bg-black/10 flex items-center justify-center group cursor-pointer">
                              <div className="h-20 w-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-110 transition-transform">
                                 <PlayCircle className="h-10 w-10 text-red-600" />
                              </div>
                           </div>
                           <div className="absolute bottom-6 left-6 right-6">
                              <div className="flex gap-1">
                                 {activeGuide.map((_, i) => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i === stepIndex ? 'bg-red-500' : 'bg-white/40'}`} />
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
            
            <Card className="rounded-3xl border-2 border-dashed border-red-200 bg-red-50 overflow-hidden relative">
               <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="h-16 w-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                        <PhoneCall className="h-8 w-8 text-white" />
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-red-900">Emergency Hotlines</h4>
                        <p className="text-sm font-bold text-red-700 opacity-80 uppercase tracking-tighter">Direct contact to Ugandan First Responders</p>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                     <Button className="h-12 px-6 bg-red-600 hover:bg-red-700 rounded-xl font-black shadow-lg">
                        Call 999 (Police)
                     </Button>
                     <Button variant="outline" className="h-12 px-6 border-red-200 text-red-600 hover:bg-red-100 rounded-xl font-black">
                        Call 112 (Ambulance)
                     </Button>
                  </div>
               </CardContent>
               <div className="absolute top-0 right-0 p-2 opacity-5">
                  <ShieldAlert className="h-24 w-24" />
               </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="rounded-3xl border-zinc-100 shadow-sm bg-gradient-to-br from-white to-zinc-50 overflow-hidden">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-400">Survival Knowledge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-zinc-50 group hover:border-red-100 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-red-50">
                     <BookOpen className="h-5 w-5 text-zinc-400 group-hover:text-red-500" />
                  </div>
                  <p className="text-sm font-bold text-zinc-700">What to include in a home first-aid kit?</p>
               </div>
               <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-zinc-50 group hover:border-red-100 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-red-50">
                     <BookOpen className="h-5 w-5 text-zinc-400 group-hover:text-red-500" />
                  </div>
                  <p className="text-sm font-bold text-zinc-700">How to perform CPR on an infant?</p>
               </div>
            </CardContent>
         </Card>
         
         <Card className="rounded-3xl border-none shadow-xl bg-zinc-900 text-white flex flex-col justify-center p-8 text-center space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter">Become a Certified Hero</h3>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">
               Take our free 30-minute training module and get certified as a community first responder.
            </p>
            <Button className="w-full h-12 rounded-2xl bg-white text-zinc-900 hover:bg-zinc-200 font-black text-lg">
               Start Training
            </Button>
         </Card>
      </div>
    </div>
  );
}
