import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe, 
  Shield, 
  TrendingUp,
  Award,
  Zap,
  Target,
  Leaf,
  Briefcase,
  History
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [stats, setStats] = useState({
    projects: 0,
    recycling: 0,
    scans: 0,
    impact: 0
  });

  useEffect(() => {
    // Load data from various modules
    const projects = JSON.parse(localStorage.getItem('afrinova_projects') || '[]');
    const trash = JSON.parse(localStorage.getItem('afrinova_trash2cash') || '[]');
    const agroscan = JSON.parse(localStorage.getItem('afrinova_agroscan_history') || '[]');
    const greenlens = JSON.parse(localStorage.getItem('afrinova_greenlens_history') || '[]');

    const totalScans = agroscan.length + greenlens.length;
    const totalRecycled = trash.reduce((acc: number, item: any) => acc + (item.status === 'Collected' ? item.quantity : 0), 0);
    
    setStats({
      projects: projects.filter((p: any) => p.isCustom).length,
      recycling: totalRecycled,
      scans: totalScans,
      impact: Math.min(100, (totalScans * 5) + (totalRecycled * 2) + (projects.length * 10))
    });
  }, []);

  const handleSave = () => {
    toast.success("Preferences updated successfully!");
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Account & Progress</h1>
          <p className="text-zinc-500 font-medium">Monitor your environmental impact and manage preferences.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold">Export Data</Button>
          <Button onClick={handleSave} className="rounded-xl font-black px-8 bg-zinc-900 shadow-lg">Save All</Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-zinc-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 border-b p-8">
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-zinc-800">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <User className="h-6 w-6 text-zinc-400" />
                </div>
                Profile Identity
              </CardTitle>
              <CardDescription className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Your public information on AFRINOVA</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-black uppercase text-zinc-400">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" className="h-12 rounded-xl border-zinc-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-black uppercase text-zinc-400">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="h-12 rounded-xl border-zinc-100" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-black uppercase text-zinc-400">Bio / Professional Role</Label>
                <Input id="bio" defaultValue="Coffee Farmer & Eco-Enthusiast" className="h-12 rounded-xl border-zinc-100" />
              </div>
              <div className="pt-4">
                 <Label className="text-xs font-black uppercase text-zinc-400 block mb-3">Primary Language for Translation</Label>
                 <div className="flex flex-wrap gap-3">
                    {["English", "Luganda", "Swahili", "Runyakitara"].map(lang => (
                      <Button key={lang} variant={lang === "English" ? "secondary" : "outline"} size="sm" className="rounded-full font-bold px-6">
                        {lang}
                      </Button>
                    ))}
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-zinc-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-zinc-50 border-b p-8">
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-zinc-800">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Bell className="h-6 w-6 text-zinc-400" />
                </div>
                Smart Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-50 hover:bg-zinc-50 transition-colors">
                <div className="space-y-0.5">
                  <Label className="text-lg font-black text-zinc-800">Market Price Alerts</Label>
                  <p className="text-sm text-zinc-500 font-medium">Get notified when coffee or maize prices change by {'>'}5%</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-50 hover:bg-zinc-50 transition-colors">
                <div className="space-y-0.5">
                  <Label className="text-lg font-black text-zinc-800">Recycling Pick-ups</Label>
                  <p className="text-sm text-zinc-500 font-medium">Alert me when a verified collector is within 5km</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-50 hover:bg-zinc-50 transition-colors">
                <div className="space-y-0.5">
                  <Label className="text-lg font-black text-zinc-800">Mentor Feedback</Label>
                  <p className="text-sm text-zinc-500 font-medium">Real-time alerts when a mentor comments on your project</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] bg-zinc-900 text-white shadow-2xl overflow-hidden relative border-none">
             <CardHeader className="p-8 pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-black text-emerald-400">
                   <TrendingUp className="h-5 w-5" />
                   Ecosystem Impact
                </CardTitle>
             </CardHeader>
             <CardContent className="p-8 pt-0 space-y-8">
                <div className="space-y-3">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Overall Contribution</span>
                      <span className="text-3xl font-black">{stats.impact}%</span>
                   </div>
                   <Progress value={stats.impact} className="bg-white/10 h-3" indicatorClassName="bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="rounded-3xl bg-white/5 p-5 border border-white/5 hover:bg-white/10 transition-colors">
                      <Leaf className="h-5 w-5 mb-2 text-emerald-400" />
                      <p className="text-2xl font-black">{stats.recycling}kg</p>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">Waste Diverted</p>
                   </div>
                   <div className="rounded-3xl bg-white/5 p-5 border border-white/5 hover:bg-white/10 transition-colors">
                      <Briefcase className="h-5 w-5 mb-2 text-blue-400" />
                      <p className="text-2xl font-black">{stats.projects}</p>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">Ideas Shared</p>
                   </div>
                   <div className="rounded-3xl bg-white/5 p-5 border border-white/5 hover:bg-white/10 transition-colors">
                      <Zap className="h-5 w-5 mb-2 text-yellow-400" />
                      <p className="text-2xl font-black">{stats.scans}</p>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">AI Diagnoses</p>
                   </div>
                   <div className="rounded-3xl bg-white/5 p-5 border border-white/5 hover:bg-white/10 transition-colors">
                      <History className="h-5 w-5 mb-2 text-purple-400" />
                      <p className="text-2xl font-black">12</p>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">Day Streak</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500">
                   <Award className="h-8 w-8 text-yellow-400 shrink-0" />
                   <div>
                      <p className="text-sm font-black text-white">Eco-Pioneer Badge</p>
                      <p className="text-[10px] font-bold text-zinc-500">Earned for completing 5 diagnostic scans.</p>
                   </div>
                </div>
             </CardContent>
             <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-emerald-500/10 rounded-full blur-3xl" />
          </Card>

          <Card className="rounded-[2rem] shadow-sm border-zinc-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-black text-zinc-800">Security & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <Button variant="outline" className="w-full justify-start h-11 rounded-xl font-bold border-zinc-100 text-zinc-600">
                  <Shield className="mr-3 h-4 w-4" />
                  Update Password
               </Button>
               <Button variant="outline" className="w-full justify-start h-11 rounded-xl font-bold border-zinc-100 text-zinc-600">
                  <Globe className="mr-3 h-4 w-4" />
                  Two-Factor Auth
               </Button>
               <Button variant="ghost" className="w-full h-11 rounded-xl font-black text-red-500 hover:bg-red-50 hover:text-red-600">
                  Delete Account Data
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
