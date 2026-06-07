import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Leaf, Heart, Globe, MessageSquare, Send, Award, Users, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function About() {
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) return;
    toast.success("Your feedback has been sent to the AFRINOVA team! Thank you for helping us grow.");
    setFeedback("");
  };

  return (
    <div className="space-y-12 pb-10">
      <div className="text-center space-y-6 pt-10">
        <div className="inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/30 rotate-3">
          <Leaf className="h-12 w-12" />
        </div>
        <h1 className="text-5xl font-black tracking-tight text-zinc-900 md:text-7xl">AFRINOVA</h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
          "Empowering Ugandan communities through technology, sustainability, and collaborative innovation."
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 shadow-sm space-y-4">
           <Heart className="h-10 w-10 text-red-500 fill-red-100" />
           <h3 className="text-2xl font-black text-emerald-900">Our Mission</h3>
           <p className="text-sm text-emerald-800 font-medium leading-relaxed opacity-80">
             To provide a centralized platform where agriculture, education, and environmental responsibility converge to create sustainable wealth for every Ugandan.
           </p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 shadow-sm space-y-4">
           <Globe className="h-10 w-10 text-blue-500 fill-blue-100" />
           <h3 className="text-2xl font-black text-blue-900">Sustainability</h3>
           <p className="text-sm text-blue-800 font-medium leading-relaxed opacity-80">
             We believe environmental protection is the backbone of economic survival. From childhood to elderhood, AFRINOVA makes green living accessible to all.
           </p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 shadow-sm space-y-4">
           <Users className="h-10 w-10 text-indigo-500 fill-indigo-100" />
           <h3 className="text-2xl font-black text-indigo-900">Community</h3>
           <p className="text-sm text-indigo-800 font-medium leading-relaxed opacity-80">
             Innovation shouldn't happen in a silo. By connecting mentors, students, and farmers, we're building an ecosystem of mutual growth and support.
           </p>
        </div>
      </div>

      <div className="bg-zinc-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
         <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white font-black px-4 py-1 uppercase tracking-widest text-[10px]">The Afrinova Story</Badge>
               <h2 className="text-4xl md:text-5xl font-black leading-tight">Rooted in Uganda, <br /><span className="text-zinc-500">Growing for Africa.</span></h2>
               <p className="text-zinc-400 text-lg leading-relaxed">
                  AFRINOVA was born from a simple observation: the tools needed to thrive are often scattered. We decided to combine 12 essential services into a single, high-performance platform.
               </p>
               <div className="flex flex-wrap gap-8">
                  <div>
                     <p className="text-4xl font-black text-white">12+</p>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Unified Apps</p>
                  </div>
                  <div>
                     <p className="text-4xl font-black text-white">50K</p>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Monthly Users</p>
                  </div>
                  <div>
                     <p className="text-4xl font-black text-white">100%</p>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Eco-Focused</p>
                  </div>
               </div>
            </div>
            
            <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] p-8 space-y-6">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                     <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Feedback Loop</h3>
               </div>
               <form onSubmit={handleSendFeedback} className="space-y-4">
                  <div className="space-y-2">
                     <Label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Your Experience</Label>
                     <Textarea 
                       placeholder="Tell us how we can make AFRINOVA better for you..." 
                       value={feedback}
                       onChange={(e) => setFeedback(e.target.value)}
                       className="bg-white/5 border-white/10 text-white min-h-[120px] rounded-2xl focus-visible:ring-emerald-500"
                       required
                     />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 font-black rounded-2xl shadow-xl shadow-emerald-900/40">
                     <Send className="mr-2 h-4 w-4" />
                     Send Direct Message
                  </Button>
               </form>
            </Card>
         </div>
         
         {/* Background pattern */}
         <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Leaf className="h-96 w-96 rotate-45" />
         </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-center md:text-left pt-6">
         <div className="flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-emerald-600" />
            <div>
               <p className="font-black text-zinc-800">Secure Payments</p>
               <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">MTN Verified Gateway</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <Award className="h-10 w-10 text-blue-600" />
            <div>
               <p className="font-black text-zinc-800">National Impact</p>
               <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Government Recognized</p>
            </div>
         </div>
      </div>
    </div>
  );
}
