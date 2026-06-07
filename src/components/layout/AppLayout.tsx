import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBasket, 
  GraduationCap, 
  ScanLine, 
  Recycle, 
  MessageSquareText, 
  Eye, 
  Ambulance, 
  Lightbulb, 
  Settings as SettingsIcon, 
  Crown, 
  Info, 
  Phone,
  Menu,
  X,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'Farmers Market', href: '/farmers-market', icon: ShoppingBasket },
  { name: 'Youth Skills Hub', href: '/youth-skills', icon: GraduationCap },
  { name: 'AgroScan AI', href: '/agroscan', icon: ScanLine },
  { name: 'Trash2Cash', href: '/trash2cash', icon: Recycle },
  { name: 'Sign Connect', href: '/sign-connect', icon: MessageSquareText },
  { name: 'GreenLens AI', href: '/greenlens', icon: Eye },
  { name: 'First Aid Hero', href: '/first-aid', icon: Ambulance },
  { name: 'Project Verse', href: '/project-verse', icon: Lightbulb },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
  { name: 'Premium', href: '/premium', icon: Crown },
  { name: 'About AFRINOVA', href: '/about', icon: Info },
  { name: 'Contact Us', href: '/contact', icon: Phone },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-card/50 backdrop-blur-sm lg:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl tracking-tight">AFRINOVA</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md lg:hidden">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>AFRINOVA</span>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center border-b px-6">
                <span className="text-xl font-bold text-primary">AFRINOVA</span>
              </div>
              <nav className="space-y-1 p-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
