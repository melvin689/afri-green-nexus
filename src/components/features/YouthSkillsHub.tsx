import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Trophy, Lightbulb, ArrowRight, PlayCircle, Star, Briefcase, GraduationCap, Target } from 'lucide-react';
import { toast } from 'sonner';

const courses = [
  { id: 1, title: 'Digital Marketing for Startups', duration: '4 weeks', level: 'Beginner', students: 1240, rating: 4.8, progress: 65 },
  { id: 2, title: 'Financial Literacy & Bookkeeping', duration: '6 weeks', level: 'Intermediate', students: 850, rating: 4.9, progress: 0 },
  { id: 3, title: 'Sustainable Agriculture Business', duration: '8 weeks', level: 'Advanced', students: 2100, rating: 4.7, progress: 10 },
];

const mentors = [
  { name: 'Sarah Kintu', role: 'Export Expert', bio: 'Helping farmers reach international markets for 15 years.', image: 'SK' },
  { name: 'David Okello', role: 'Tech Founder', bio: 'Pioneer in Ugandan agritech solutions and mobile platforms.', image: 'DO' },
  { name: 'Anita Namubiru', role: 'Business Strategist', bio: 'Specializing in scaling rural micro-businesses to regional hubs.', image: 'AN' },
];

export default function YouthSkillsHub() {
  const [activeCourse, setActiveCourse] = useState<any>(null);

  const startCourse = (course: any) => {
    toast.success(`Started "${course.title}"! Dive into Lesson 1: Fundamentals.`);
    setActiveCourse(course);
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="h-32 w-32 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-xl border border-white/20 rotate-6 shadow-inner">
             <GraduationCap className="h-16 w-16 text-white" />
          </div>
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl font-black md:text-6xl tracking-tight">Youth Skills Hub</h1>
            <p className="mt-4 text-indigo-50 text-xl font-medium opacity-90 leading-relaxed">
              Equipping the next generation of Ugandan leaders with business, tech, and agricultural mastery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
               <div className="flex items-center gap-2 bg-indigo-900/40 px-4 py-2 rounded-2xl border border-indigo-400/20 backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-bold tracking-wide">450 People Learning Now</span>
               </div>
               <div className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-2xl font-black text-sm shadow-xl">
                  <Trophy className="h-4 w-4" />
                  Global Grant Opportunity Open
               </div>
            </div>
          </div>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[30rem] h-[30rem] bg-indigo-400 rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[20rem] h-[20rem] bg-cyan-300 rounded-full blur-[80px] opacity-30" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Learners', icon: Users, count: '12,450', color: 'bg-blue-50 text-blue-600', sub: '+12% this month' },
          { label: 'Course Library', icon: BookOpen, count: '48+', color: 'bg-indigo-50 text-indigo-600', sub: 'New: E-Commerce 101' },
          { label: 'Startup Grants', icon: Trophy, count: 'UGX 85M', color: 'bg-orange-50 text-orange-600', sub: 'Awarded this year' },
          { label: 'Success Stories', icon: Target, count: '320+', color: 'bg-emerald-50 text-emerald-600', sub: 'Business launches' },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden">
            <CardContent className="flex flex-col p-6">
              <div className={`h-12 w-12 rounded-2xl ${stat.color} flex items-center justify-center mb-4`}>
                 <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl font-black text-zinc-800">{stat.count}</p>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-[10px] font-bold text-zinc-500 bg-zinc-100 w-fit px-2 py-0.5 rounded-full">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-zinc-800 flex items-center gap-2">
                 <Briefcase className="h-6 w-6 text-indigo-600" />
                 Skill-Building Tracks
              </h2>
              <Button variant="ghost" className="font-bold text-indigo-600 hover:bg-indigo-50">View Curriculum</Button>
           </div>

           <div className="grid gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-zinc-100 shadow-sm rounded-3xl overflow-hidden hover:border-indigo-200 transition-colors group">
                  <div className="grid md:grid-cols-4">
                     <div className="md:col-span-1 bg-zinc-50 flex items-center justify-center p-6 border-r border-zinc-100 group-hover:bg-indigo-50/50 transition-colors">
                        <PlayCircle className="h-16 w-16 text-zinc-200 group-hover:text-indigo-400 transition-all duration-500" strokeWidth={1} />
                     </div>
                     <div className="md:col-span-3 p-6 flex flex-col justify-between">
                        <div>
                           <div className="flex items-center justify-between mb-2">
                              <div className="flex gap-2">
                                 <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 font-bold border-none">{course.level}</Badge>
                                 <Badge variant="outline" className="text-[10px] font-bold uppercase border-zinc-200">{course.duration}</Badge>
                              </div>
                              <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                                 <Star className="h-3 w-3 fill-yellow-500" />
                                 {course.rating}
                              </div>
                           </div>
                           <h3 className="text-xl font-black text-zinc-800 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                           <p className="text-sm text-zinc-500 font-medium">Joined by {course.students.toLocaleString()} students across East Africa.</p>
                        </div>
                        
                        <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
                           <div className="flex-1 w-full space-y-2">
                              <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400 tracking-tighter">
                                 <span>Course Progress</span>
                                 <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2 bg-zinc-100" />
                           </div>
                           <Button 
                             onClick={() => startCourse(course)}
                             className="w-full sm:w-auto px-8 h-11 bg-zinc-900 hover:bg-black rounded-2xl font-black shadow-lg"
                           >
                              {course.progress > 0 ? 'Continue' : 'Start Learning'}
                           </Button>
                        </div>
                     </div>
                  </div>
                </Card>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-800 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              Direct Mentors
           </h2>

           <div className="space-y-4">
              {mentors.map((mentor) => (
                <Card key={mentor.name} className="border-none shadow-sm rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform">
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                       <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center font-black text-indigo-700 text-lg border border-indigo-200">
                          {mentor.image}
                       </div>
                       <div className="flex-1">
                          <h4 className="font-black text-zinc-800">{mentor.name}</h4>
                          <p className="text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wide">{mentor.role}</p>
                          <p className="text-xs text-zinc-500 leading-relaxed italic">"{mentor.bio}"</p>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 rounded-2xl border-indigo-100 text-indigo-700 font-black h-10 hover:bg-indigo-50">
                       Request Mentorship
                    </Button>
                  </CardContent>
                </Card>
              ))}
           </div>

           <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <CardContent className="p-8 space-y-6">
                 <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black mb-2 leading-tight">National Pitch Challenge 2024</h3>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                       Submit your business model by October 30th. Top 5 inventions will receive seed funding and 6 months of incubation.
                    </p>
                 </div>
                 <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                       <p className="text-2xl font-black text-white">UGX 5M</p>
                       <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Grand Prize</p>
                    </div>
                    <Button className="bg-white text-zinc-900 hover:bg-zinc-200 font-black rounded-xl">Apply Now</Button>
                 </div>
              </CardContent>
              <div className="absolute top-0 right-0 p-4">
                 <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
