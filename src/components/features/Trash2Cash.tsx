import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Recycle, Package, MapPin, DollarSign, UploadCloud, History, Trash2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface Listing {
  id: number;
  type: string;
  quantity: number;
  location: string;
  status: 'Pending' | 'Collected' | 'Rejected';
  date: string;
}

export default function Trash2Cash() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('afrinova_trash2cash');
    if (saved) {
      setListings(JSON.parse(saved));
    }
  }, []);

  const saveListings = (newListings: Listing[]) => {
    setListings(newListings);
    localStorage.setItem('afrinova_trash2cash', JSON.stringify(newListings));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    setTimeout(() => {
      const newListing: Listing = {
        id: Date.now(),
        type: formData.get('material') as string,
        quantity: Number(formData.get('quantity')),
        location: formData.get('location') as string,
        status: 'Pending',
        date: new Date().toLocaleDateString()
      };

      saveListings([newListing, ...listings]);
      setLoading(false);
      toast.success("Materials listed successfully! Collectors in your area have been notified.");
      e.currentTarget.reset();
    }, 1500);
  };

  const removeListing = (id: number) => {
    saveListings(listings.filter(l => l.id !== id));
    toast.info("Listing removed");
  };

  return (
    <div className="space-y-6">
      <div className="relative h-48 overflow-hidden rounded-xl bg-gradient-to-r from-orange-600 to-amber-400 shadow-lg">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/76a6bdae-1da0-4724-aeaf-6420c665459b/trash2cash-hero-04e959a8-1780856736898.webp" 
          alt="Trash2Cash" 
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <h1 className="text-3xl font-extrabold md:text-5xl tracking-tight">Trash2Cash</h1>
          <p className="mt-2 max-w-md text-orange-50 font-medium">Turn your recyclables into profit. Connect with local collectors today.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-orange-100 shadow-md">
            <CardHeader className="border-b bg-orange-50/30">
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Recycle className="h-5 w-5" />
                List Your Materials
              </CardTitle>
              <CardDescription>Specify the type and amount of waste you have for collection</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="material" className="text-sm font-bold text-zinc-700">Material Type</Label>
                    <Select name="material" required>
                      <SelectTrigger className="h-11 border-orange-100">
                        <SelectValue placeholder="What are you recycling?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plastic Bottles (PET)">Plastic Bottles (PET)</SelectItem>
                        <SelectItem value="Paper & Cardboard">Paper & Cardboard</SelectItem>
                        <SelectItem value="Scrap Metal">Scrap Metal</SelectItem>
                        <SelectItem value="Glass Containers">Glass Containers</SelectItem>
                        <SelectItem value="Electronic Waste">E-Waste</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-sm font-bold text-zinc-700">Quantity (Estimated kg)</Label>
                    <div className="relative">
                      <Input id="quantity" name="quantity" type="number" placeholder="e.g. 50" className="h-11 border-orange-100 pl-10" required />
                      <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-bold text-zinc-700">Pick-up Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="location" name="location" className="h-11 border-orange-100 pl-10" placeholder="Enter neighborhood or specific street" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-zinc-700">Photos of Material</Label>
                  <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/20 hover:bg-orange-50 hover:border-orange-300 transition-all">
                    <UploadCloud className="mb-2 h-8 w-8 text-orange-500" />
                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wider">Drag or click to upload</p>
                    <p className="text-[10px] text-zinc-400 mt-1">Supports PNG, JPG (Max 5MB)</p>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-lg font-bold shadow-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Publishing Listing...
                    </>
                  ) : (
                    "List for Collection"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-orange-100 shadow-sm overflow-hidden">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                   <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <History className="h-5 w-5 text-orange-600" />
                      My Listings
                   </CardTitle>
                   <CardDescription>Track the status of your recyclables</CardDescription>
                </div>
                <Badge variant="outline" className="border-orange-200 text-orange-700">{listings.length} total</Badge>
             </CardHeader>
             <CardContent className="px-0">
                <div className="divide-y border-t overflow-x-auto">
                   {listings.length > 0 ? listings.map((item) => (
                     <div key={item.id} className="flex items-center justify-between p-4 hover:bg-orange-50/30 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              item.status === 'Collected' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                           }`}>
                              <Recycle className="h-6 w-6" />
                           </div>
                           <div>
                              <p className="font-bold text-zinc-800">{item.type}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                 <MapPin className="h-3 w-3" /> {item.location} • {item.quantity}kg
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right hidden sm:block">
                              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Status</p>
                              <Badge 
                                variant={item.status === 'Collected' ? 'success' : 'outline'} 
                                className={item.status === 'Pending' ? 'text-amber-600 border-amber-200' : ''}
                              >
                                 {item.status}
                              </Badge>
                           </div>
                           <Button variant="ghost" size="icon" onClick={() => removeListing(item.id)} className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                   )) : (
                     <div className="p-12 text-center">
                        <Package className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                        <p className="text-sm font-medium text-zinc-500 italic">No listings yet. Start recycling today!</p>
                     </div>
                   )}
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-orange-50/50 border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                <DollarSign className="h-5 w-5" />
                Live Market Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { material: "Plastic (PET)", price: "UGX 500/kg", trend: "up" },
                  { material: "Cardboard", price: "UGX 350/kg", trend: "stable" },
                  { material: "Mixed Metal", price: "UGX 1,500/kg", trend: "down" },
                  { material: "E-Waste", price: "UGX 3,000/kg", trend: "up" },
                ].map((row) => (
                  <div key={row.material} className="flex justify-between items-center p-2 bg-white rounded-lg border border-orange-50">
                    <div>
                       <p className="text-sm font-bold text-zinc-700">{row.material}</p>
                       <p className={`text-[10px] font-bold uppercase ${
                          row.trend === 'up' ? 'text-green-600' : row.trend === 'down' ? 'text-red-500' : 'text-zinc-400'
                       }`}>
                          {row.trend === 'up' ? '▲ Trending Up' : row.trend === 'down' ? '▼ Trending Down' : '• Stable'}
                       </p>
                    </div>
                    <span className="font-extrabold text-orange-600">{row.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-zinc-500 italic leading-tight">
                * Prices are estimates based on Kampala region. Final value determined by the collector based on quality.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 text-white overflow-hidden relative">
             <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                   <CheckCircle2 className="h-5 w-5 text-green-500" />
                   Verified Collectors
                </CardTitle>
             </CardHeader>
             <CardContent className="pt-4 space-y-4">
                <div className="flex gap-3">
                   <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold">RE</div>
                   <div className="flex-1">
                      <p className="text-sm font-bold">RecycleEast Ltd</p>
                      <div className="flex items-center gap-1">
                         {[1,2,3,4,5].map(i => <Star key={i} className="h-2 w-2 text-yellow-500 fill-yellow-500" />)}
                         <span className="text-[10px] text-zinc-500">(124)</span>
                      </div>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold">KG</div>
                   <div className="flex-1">
                      <p className="text-sm font-bold">Kampala Green Hub</p>
                      <div className="flex items-center gap-1">
                         {[1,2,3,4].map(i => <Star key={i} className="h-2 w-2 text-yellow-500 fill-yellow-500" />)}
                         <span className="text-[10px] text-zinc-500">(89)</span>
                      </div>
                   </div>
                </div>
                <Button variant="link" className="w-full text-orange-400 font-bold p-0">Become a Collector</Button>
             </CardContent>
             
             <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-orange-600/10 rounded-full blur-xl" />
          </Card>

          <Card className="bg-amber-50 border-amber-200">
             <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                   <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-amber-900">Safety Tip</p>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        Ensure materials are cleaned and sorted before collection to maximize your earnings and speed up the process.
                      </p>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
