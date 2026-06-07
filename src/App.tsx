import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Toaster } from './components/ui/sonner';

// Lazy load feature components
const FarmersMarket = lazy(() => import('./components/features/FarmersMarket'));
const YouthSkillsHub = lazy(() => import('./components/features/YouthSkillsHub'));
const AgroScan = lazy(() => import('./components/features/AgroScan'));
const Trash2Cash = lazy(() => import('./components/features/Trash2Cash'));
const SignConnect = lazy(() => import('./components/features/SignConnect'));
const GreenLens = lazy(() => import('./components/features/GreenLens'));
const FirstAidHero = lazy(() => import('./components/features/FirstAidHero'));
const ProjectVerse = lazy(() => import('./components/features/ProjectVerse'));
const Settings = lazy(() => import('./components/features/Settings'));
const Premium = lazy(() => import('./components/features/Premium'));
const About = lazy(() => import('./components/features/About'));
const Contact = lazy(() => import('./components/features/Contact'));

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Navigate to="/farmers-market" replace />} />
            <Route path="/farmers-market" element={<FarmersMarket />} />
            <Route path="/youth-skills" element={<YouthSkillsHub />} />
            <Route path="/agroscan" element={<AgroScan />} />
            <Route path="/trash2cash" element={<Trash2Cash />} />
            <Route path="/sign-connect" element={<SignConnect />} />
            <Route path="/greenlens" element={<GreenLens />} />
            <Route path="/first-aid" element={<FirstAidHero />} />
            <Route path="/project-verse" element={<ProjectVerse />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/farmers-market" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
