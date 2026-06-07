import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingBasket, Search, Tag, MessageCircle, Info as InfoIcon, MapPin, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const listings = [
  { id: 1, name: 'Fresh Tomatoes', price: 'UGX 5,000/kg', farmer: 'John Doe', location: 'Kampala', category: 'Vegetables', rating: 4.8, stock: '120kg' },
  { id: 2, name: 'Sweet Potatoes', price: 'UGX 2,500/kg', farmer: 'Mary Jane', location: 'Wakiso', category: 'Tubers', rating: 4.5, stock: '500kg' },
  { id: 3, name: 'Matooke', price: 'UGX 35,000/bunch', farmer: 'Peter Musoke', location: 'Masaka', category: 'Fruits', rating: 4.9, stock: '45 bunches' },
  { id: 4, name: 'Maize Flour', price: 'UGX 3,000/kg', farmer: 'Grace Nakato', location: 'Mbarara', category: 'Grains', rating: 4.2, stock: '1000kg' },
];

export default function FarmersMarket() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMessaging, setIsMessaging] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);

  const handleMessage = (farmer: any) => {
    setSelectedFarmer(farmer);
    setIsMessaging(true);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Message sent to ${selectedFarmer.farmer}! They usually respond within 30 minutes.`);
    setIsMessaging(false);
  };

  const handleBuy = (item: string) => {
    toast.success(`Order for ${item} placed! Complete payment in the Premium section to finalize.`);
  };

  return (
    <div className="space-y-6">
      <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500 shadow-xl">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/76a6bdae-1da0-4724-aeaf-6420c665459b/farmers-market-hero-00a86acd-1780856735472.webp" 
          alt="Farmers Market" 
          className="h-full w-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-black md:text-6xl tracking-tight">Farmers Market</h1>
            <p className="mt-4 max-w-xl text-green-50 text-lg font-medium opacity-90 leading-relaxed">
              Skip the middleman. Buy fresh produces directly from local Ugandan farmers at fair prices.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-3 rounded-2xl border shadow-sm">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search for tomatoes, maize, matooke..." 
                  className="pl-10 h-11 border-none focus-visible:ring-0 text-lg" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="h-6 w-[1px] bg-zinc-200 hidden sm:block" />
             <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {["All", "Vegetables", "Fruits", "Grains"].map(cat => (
                   <Button key={cat} variant="ghost" size="sm" className="rounded-full font-bold text-xs uppercase tracking-wider">
                      {cat}
                   </Button>
                ))}
             </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {listings.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-zinc-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-44 bg-zinc-100 p-4 flex items-center justify-center overflow-hidden">
                  <ShoppingBasket className="h-20 w-20 text-primary/10 group-hover:scale-125 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                     <Badge className="bg-white/90 text-primary font-bold shadow-sm backdrop-blur-sm border-none">{item.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                     <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full text-[10px] font-bold">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        {item.rating}
                     </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent p-3">
                     <p className="text-white text-xs font-bold flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {item.location}
                     </p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-extrabold text-zinc-800">{item.name}</h3>
                      <p className="text-sm text-zinc-500 font-medium">by {item.farmer}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-black text-primary">{item.price}</p>
                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Stock: {item.stock}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <Button 
                      className="flex-1 h-11 border-primary/20 text-primary hover:bg-primary/5 font-bold" 
                      variant="outline"
                      onClick={() => handleMessage(item)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button 
                      className="flex-1 h-11 bg-primary hover:bg-primary/90 font-extrabold shadow-md shadow-primary/20"
                      onClick={() => handleBuy(item.name)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-zinc-900 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <Tag className="h-5 w-5" />
                Live Market Prices
              </CardTitle>
              <CardDescription className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Daily Updates • Kampala Hub</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Beans (Nambale)", price: "4,200", trend: "stable", color: "text-zinc-300" },
                { name: "Rice (Super)", price: "5,500", trend: "up", color: "text-green-400" },
                { name: "Cassava", price: "1,800", trend: "down", color: "text-red-400" },
                { name: "Onions (Red)", price: "3,500", trend: "up", color: "text-green-400" },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div>
                     <span className="text-sm font-bold block">{row.name}</span>
                     <span className={`text-[10px] font-black uppercase tracking-tighter ${
                        row.trend === 'up' ? 'text-green-500' : row.trend === 'down' ? 'text-red-500' : 'text-zinc-500'
                     }`}>
                        {row.trend === 'up' ? '▲ Trending Up' : row.trend === 'down' ? '▼ Trending Down' : '• Stable'}
                     </span>
                  </div>
                  <div className="text-right">
                     <span className="text-lg font-black block">UGX {row.price}</span>
                     <span className="text-[10px] text-zinc-500">per kg</span>
                  </div>
                </div>
              ))}
              <Button variant="link" className="w-full text-xs text-emerald-400 font-bold uppercase tracking-widest">
                <TrendingUp className="mr-2 h-3 w-3" />
                Analyze Trends
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-100 shadow-sm relative overflow-hidden group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-900">
                <InfoIcon className="h-5 w-5 text-emerald-600" />
                Smart Farming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-emerald-100 hover:scale-105 transition-transform cursor-pointer">
                <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Pest Management</p>
                <p className="text-sm font-bold text-zinc-800 leading-tight">Organic neem oil solutions for tomato blight.</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-emerald-100 hover:scale-105 transition-transform cursor-pointer">
                <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">Soil Health</p>
                <p className="text-sm font-bold text-zinc-800 leading-tight">Crop rotation: 3 simple patterns for better yields.</p>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-10 font-bold">Ask AI Expert</Button>
            </CardContent>
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-emerald-200/40 rounded-full blur-2xl group-hover:bg-emerald-300/40 transition-colors" />
          </Card>
        </div>
      </div>

      {/* Messaging Dialog */}
      <Dialog open={isMessaging} onOpenChange={setIsMessaging}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
               <MessageCircle className="h-6 w-6 text-primary" />
               Chat with {selectedFarmer?.farmer}
            </DialogTitle>
            <DialogDescription>
              Ask about product quality, stock, or arrange a visit to the farm in {selectedFarmer?.location}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
             <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 max-w-[80%]">
                <p className="text-xs text-zinc-400 font-bold mb-1">{selectedFarmer?.farmer} (Farmer)</p>
                <p className="text-sm text-zinc-800">Hello! Thanks for your interest in my {selectedFarmer?.name?.toLowerCase()}. How can I help you today?</p>
             </div>
             <form onSubmit={sendMessage} className="space-y-4">
                <div className="space-y-2">
                   <Label htmlFor="message" className="font-bold text-xs uppercase text-zinc-500">Your Message</Label>
                   <Textarea 
                     id="message" 
                     placeholder="e.g. Is the price negotiable for bulk orders?" 
                     className="rounded-2xl border-zinc-200 min-h-[100px]"
                     required
                   />
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-50 p-2 rounded-lg">
                   <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                   Your phone number will be shared with the farmer for direct contact.
                </div>
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 rounded-2xl font-bold text-lg">
                   Send Message
                </Button>
             </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
