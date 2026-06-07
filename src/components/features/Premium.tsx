import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Crown, Zap, Download, Lock, Smartphone, RefreshCw, CheckCircle2, ShieldCheck, CreditCard, Info as InfoIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  { 
    id: 'day',
    name: 'Day Pass', 
    price: 'UGX 1,000', 
    period: '/day',
    features: ['Download photos', 'Download videos', 'Access all projects', 'Premium support'],
    recommended: false,
    color: 'bg-zinc-100'
  },
  { 
    id: 'month',
    name: 'Monthly', 
    price: 'UGX 2,000', 
    period: '/month',
    features: ['Everything in Day Pass', 'No advertisements', 'Priority market access', 'Early competition entries'],
    recommended: true,
    color: 'bg-primary/5 border-primary'
  },
  { 
    id: 'year',
    name: 'Yearly', 
    price: 'UGX 35,000', 
    period: '/year',
    features: ['Everything in Monthly', 'Certificate of Impact', 'Direct Mentor DM', 'Exclusive webinars'],
    recommended: false,
    color: 'bg-zinc-100'
  },
];

export default function Premium() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'none' | 'pending' | 'cleared'>('none');
  const [clearingProgress, setClearingProgress] = useState(0);

  useEffect(() => {
    // Check local storage for status
    const saved = localStorage.getItem('afrinova_premium_status');
    if (saved) setPaymentStatus(saved as any);
  }, []);

  const startVerification = () => {
    setIsVerifying(true);
    setClearingProgress(0);
    
    const interval = setInterval(() => {
      setClearingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          setPaymentStatus('cleared');
          localStorage.setItem('afrinova_premium_status', 'cleared');
          toast.success("Payment verified! All features are now unlocked.");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const resetStatus = () => {
    setPaymentStatus('none');
    localStorage.removeItem('afrinova_premium_status');
    toast.info("Status reset for demo purposes.");
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
           <Crown className="h-4 w-4 fill-yellow-500" />
           Elite Access
        </div>
        <h1 className="text-4xl font-black md:text-6xl tracking-tight text-zinc-900">Go Premium</h1>
        <p className="text-zinc-500 text-lg font-medium leading-relaxed">
          Unlock high-definition media downloads, unrestricted project access, and priority support while funding Ugandan sustainability initiatives.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`${plan.color} border-2 rounded-3xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl relative flex flex-col`}>
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-lg">
                Recommended
              </div>
            )}
            <CardHeader className="text-center pt-10">
              <CardTitle className="text-2xl font-black text-zinc-800">{plan.name}</CardTitle>
              <div className="mt-4 flex flex-col">
                <span className="text-4xl font-black text-primary tracking-tighter">{plan.price}</span>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 pt-6">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm font-medium text-zinc-600">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={4} />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pb-8 px-8">
              <Button className={`w-full h-12 rounded-2xl font-black text-lg shadow-lg ${
                 plan.recommended ? 'bg-primary hover:bg-primary/90' : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50'
              }`} variant={plan.recommended ? 'default' : 'outline'}>
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="rounded-[40px] border-none shadow-2xl bg-zinc-900 text-white overflow-hidden">
          <CardHeader className="p-10 pb-0">
             <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                   <Smartphone className="h-8 w-8 text-yellow-400" />
                </div>
                <div>
                   <CardTitle className="text-2xl font-black">Mobile Money Payment</CardTitle>
                   <CardDescription className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.2em]">MTN Network Only</CardDescription>
                </div>
             </div>
          </CardHeader>
          <CardContent className="p-10 pt-6 space-y-8">
             <div className="space-y-6">
                {[
                  { step: "1", title: "Dial Code", desc: "Dial *185*3# on your MTN phone.", icon: <Smartphone className="h-5 w-5" /> },
                  { step: "2", title: "Merchant Code", desc: "Enter code: 02957661", icon: <CreditCard className="h-5 w-5" />, highlight: "02957661" },
                  { step: "3", title: "Amount", desc: "Enter UGX based on your plan.", icon: <Zap className="h-5 w-5" /> },
                  { step: "4", title: "Confirm", desc: "Enter your PIN to complete.", icon: <ShieldCheck className="h-5 w-5" /> },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-6 group">
                     <div className="h-10 w-10 shrink-0 bg-white/5 rounded-full flex items-center justify-center text-lg font-black border border-white/10 group-hover:bg-primary group-hover:border-none transition-colors">
                        {s.step}
                     </div>
                     <div className="flex-1 pb-4 border-b border-white/5">
                        <p className="font-black text-lg mb-1">{s.title}</p>
                        <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                           {s.desc}
                        </p>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="pt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => <div key={i} className="h-10 w-10 rounded-full border-2 border-zinc-900 bg-zinc-800" />)}
                </div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">450+ Active Premium Users</p>
             </div>
          </CardContent>
        </Card>

        <Card className="rounded-[40px] border-zinc-100 shadow-xl overflow-hidden flex flex-col h-full bg-gradient-to-b from-white to-zinc-50/50">
          <CardHeader className="p-10 pb-0">
             <div className="flex items-center justify-between">
                <div>
                   <CardTitle className="text-2xl font-black">Verification Center</CardTitle>
                   <CardDescription className="font-bold text-zinc-400">Validate your transaction status</CardDescription>
                </div>
                <Badge variant={paymentStatus === 'cleared' ? 'success' : 'outline'} className="h-8 px-4 rounded-full font-black uppercase text-[10px] tracking-widest shadow-sm">
                   {paymentStatus === 'cleared' ? 'Cleared' : 'Awaiting Payment'}
                </Badge>
             </div>
          </CardHeader>
          <CardContent className="p-10 flex-1 flex flex-col justify-center items-center text-center space-y-8">
             <AnimatePresence mode="wait">
                {paymentStatus === 'cleared' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                     <div className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/40">
                        <CheckCircle2 className="h-14 w-14 text-white" strokeWidth={3} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-2xl font-black text-zinc-900 uppercase">Premium Unlocked</h3>
                        <p className="text-sm font-medium text-zinc-500 max-w-xs leading-relaxed">
                           Welcome to AFRINOVA Elite. Your subscription is active until {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}.
                        </p>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="rounded-2xl border-zinc-200 font-bold h-12">My Benefits</Button>
                        <Button variant="ghost" onClick={resetStatus} className="text-zinc-400 hover:text-red-500 font-bold text-xs uppercase tracking-widest">Reset Demo</Button>
                     </div>
                  </motion.div>
                ) : isVerifying ? (
                  <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-8">
                     <div className="relative h-40 w-40 mx-auto">
                        <div className="absolute inset-0 rounded-full border-8 border-zinc-100" />
                        <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <RefreshCw className="h-12 w-12 text-primary animate-pulse" />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-end mb-2">
                           <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Verifying...</p>
                           <p className="text-2xl font-black text-zinc-800">{clearingProgress}%</p>
                        </div>
                        <Progress value={clearingProgress} className="h-4 bg-zinc-100" />
                        <p className="text-xs font-medium text-zinc-400 italic">Connecting to MTN Merchant Gateway...</p>
                     </div>
                  </motion.div>
                ) : (
                  <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                     <div className="h-24 w-24 bg-zinc-100 rounded-[30px] flex items-center justify-center mx-auto text-zinc-300">
                        <CreditCard className="h-12 w-12" />
                     </div>
                     <div className="space-y-3">
                        <h3 className="text-xl font-black text-zinc-800 uppercase tracking-tight">Verify Your Transaction</h3>
                        <p className="text-sm font-medium text-zinc-400 max-w-xs leading-relaxed">
                           Once you've completed the mobile money steps, click below to link your transaction to your account.
                        </p>
                     </div>
                     <Button 
                        onClick={startVerification} 
                        className="w-full h-14 bg-zinc-900 hover:bg-black rounded-2xl text-lg font-black shadow-xl shadow-zinc-900/20"
                     >
                        Check Payment Status
                     </Button>
                  </motion.div>
                )}
             </AnimatePresence>
          </CardContent>
          <CardFooter className="p-10 pt-0">
             <div className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                <InfoIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-blue-700 leading-normal uppercase">
                   Your payment contributes directly to Uganda's re-greening project and supports over 2,000 local youth mentors.
                </p>
             </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
