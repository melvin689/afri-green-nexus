import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Upload, 
  Users, 
  MessageSquare, 
  Star, 
  Share2,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: number;
  title: string;
  author: string;
  description: string;
  tags: string[];
  feedback: number;
  stars: number;
  isCustom?: boolean;
}

const INITIAL_PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'Solar Water Purifier', 
    author: 'Ivan L.', 
    description: 'A low-cost device that uses solar energy to purify contaminated water for rural communities.',
    tags: ['Sustainability', 'Hardware'],
    feedback: 12,
    stars: 45
  },
  { 
    id: 2, 
    title: 'EduQuest App', 
    author: 'Maria N.', 
    description: 'Gamified learning platform for primary students to learn local history and culture.',
    tags: ['Education', 'Software'],
    feedback: 8,
    stars: 32
  },
];

export default function ProjectVerse() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('afrinova_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(INITIAL_PROJECTS);
    }
  }, []);

  // Save to LocalStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('afrinova_projects', JSON.stringify(newProjects));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProject: Project = {
      id: Date.now(),
      title: formData.get('title') as string,
      author: "Guest User",
      description: formData.get('desc') as string,
      tags: [(formData.get('category') as string) || "General"],
      feedback: 0,
      stars: 0,
      isCustom: true
    };

    saveProjects([newProject, ...projects]);
    toast.success("Innovation shared with the community!");
    setShowForm(false);
  };

  const handleStar = (id: number) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, stars: p.stars + 1 } : p
    );
    saveProjects(updated);
    toast.success("Project starred!");
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.tags.includes(category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold md:text-5xl tracking-tight">Project Verse</h1>
            <p className="mt-4 text-cyan-50 text-lg opacity-90">
              The heartbeat of innovation. Share your inventions, find your dream team, and scale your impact.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
               <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  Monthly Winner: Ivan L.
               </div>
               <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                  <Users className="h-4 w-4 text-blue-300" />
                  45 New Mentors Joined
               </div>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-white text-indigo-700 hover:bg-cyan-50 font-bold shadow-lg h-14 px-8 rounded-xl" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <Filter className="mr-2 h-5 w-5" />
            ) : (
              <PlusCircle className="mr-2 h-5 w-5" />
            )}
            {showForm ? "Browse Inventions" : "Submit Your Idea"}
          </Button>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-20" />
      </div>

      {showForm ? (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-indigo-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-900">Publish to Project Verse</CardTitle>
            <CardDescription>We'll help you find teammates and mentors once your project is live.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Title</Label>
                <Input id="title" name="title" placeholder="e.g. Smart Irrigation System" className="h-12 border-indigo-100 focus-visible:ring-indigo-500" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pitch Your Invention</Label>
                <Textarea id="desc" name="desc" placeholder="What problem does it solve and how? Who is it for?" className="min-h-[120px] border-indigo-100 focus-visible:ring-indigo-500" required />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Primary Category</Label>
                    <Input id="category" name="category" placeholder="e.g. Health, Agriculture" className="border-indigo-100 focus-visible:ring-indigo-500" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Upload Visuals (Image/Video)</Label>
                    <div className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-indigo-200 bg-indigo-50/30 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors">
                       <Upload className="mr-2 h-4 w-4" />
                       Click to upload prototype
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                 <input type="checkbox" id="teammates" className="h-5 w-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500" />
                 <Label htmlFor="teammates" className="font-medium text-indigo-900 cursor-pointer">I am looking for teammates/collaborators</Label>
              </div>
              <div className="flex gap-4">
                 <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="flex-1 h-12">Cancel</Button>
                 <Button type="submit" className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 shadow-md">Share My Invention</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-2 rounded-xl border shadow-sm">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search innovations..." 
                  className="pl-10 h-11 border-none focus-visible:ring-0" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="h-6 w-[1px] bg-zinc-200 hidden sm:block" />
             <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 px-2">
                {["All", "Sustainability", "Education", "Agriculture", "Software"].map(cat => (
                  <Button 
                    key={cat}
                    variant={category === cat ? "secondary" : "ghost"}
                    size="sm"
                    className="rounded-full text-xs font-bold"
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
             </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredProjects.length > 0 ? filteredProjects.map((p) => (
              <Card key={p.id} className="group overflow-hidden transition-all hover:shadow-xl border-indigo-50 flex flex-col">
                <div className="aspect-video bg-indigo-50/50 flex items-center justify-center relative overflow-hidden">
                   <Lightbulb className="h-20 w-20 text-indigo-200 group-hover:scale-110 group-hover:text-indigo-300 transition-all duration-500" />
                   <div className="absolute top-4 right-4 flex flex-wrap justify-end gap-2">
                      {p.tags.map(t => <Badge key={t} variant="secondary" className="bg-white/90 backdrop-blur shadow-sm border-indigo-100 text-indigo-700">{t}</Badge>)}
                      {p.isCustom && <Badge className="bg-indigo-600">New</Badge>}
                   </div>
                   {p.isCustom && (
                     <div className="absolute inset-0 bg-indigo-600/5 backdrop-blur-[1px]" />
                   )}
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                           <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                             {p.author[0]}
                           </div>
                           <p className="text-xs text-muted-foreground font-medium">by {p.author}</p>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-10 w-10 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                         <Share2 className="h-5 w-5" />
                      </Button>
                   </div>
                   <p className="text-sm text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                     {p.description}
                   </p>
                   
                   <div className="mt-auto flex items-center justify-between pt-6 border-t border-indigo-50">
                      <div className="flex gap-6">
                         <button 
                           onClick={() => handleStar(p.id)}
                           className="flex items-center text-xs font-bold text-muted-foreground hover:text-yellow-600 transition-colors group/star"
                         >
                            <Star className={`mr-1.5 h-4 w-4 ${p.stars > 0 ? 'text-yellow-500 fill-yellow-500' : 'group-hover/star:text-yellow-500'}`} />
                            {p.stars}
                         </button>
                         <button className="flex items-center text-xs font-bold text-muted-foreground hover:text-indigo-600 transition-colors">
                            <MessageSquare className="mr-1.5 h-4 w-4" />
                            {p.feedback}
                         </button>
                      </div>
                      <div className="flex gap-2">
                         <Button size="sm" variant="ghost" className="text-indigo-600 hover:bg-indigo-50 font-bold px-4">
                            Details
                         </Button>
                         <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-sm font-bold px-4">
                            Join
                         </Button>
                      </div>
                   </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full py-20 text-center space-y-4">
                 <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Search className="h-10 w-10 text-muted-foreground/30" />
                 </div>
                 <h3 className="text-lg font-bold text-muted-foreground">No innovations found</h3>
                 <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                   Try adjusting your filters or be the first to share an idea in this category!
                 </p>
                 <Button variant="outline" onClick={() => { setSearchTerm(""); setCategory("All"); }}>
                    Clear Filters
                 </Button>
              </div>
            )}
          </div>
          
          <div className="rounded-2xl border-2 border-dashed border-indigo-200 p-8 flex flex-col items-center text-center gap-4 bg-indigo-50/20">
             <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-indigo-600" />
             </div>
             <div>
                <h4 className="font-bold text-indigo-900">Are you a Mentor?</h4>
                <p className="text-sm text-indigo-600 max-w-sm">
                   Join our network of industry experts to provide feedback and guide these amazing inventors.
                </p>
             </div>
             <Button className="bg-indigo-600">Register as Mentor</Button>
          </div>
        </>
      )}
    </div>
  );
}
