import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquareText, Mic, Volume2, Hand, RefreshCw, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Sign Library - Mapping common words to visual "states"
const SIGN_LIBRARY: Record<string, string[]> = {
  "hello": ["👋", "✋"],
  "thank you": ["🙏", "🙌"],
  "food": ["🍲", "😋"],
  "help": ["🆘", "🙋"],
  "hospital": ["🏥", "🚑"],
  "water": ["💧", "🥤"],
  "yes": ["👍", "👌"],
  "no": ["👎", "✖️"],
  "please": ["🙏", "✨"],
};

export default function SignConnect() {
  const [speechText, setSpeechText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [currentSigns, setCurrentSigns] = useState<string[]>([]);
  const [signIndex, setSignIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [scanning, setScanning] = useState(false);

  // Handle Speech to Sign
  const handleTranslate = () => {
    if (!speechText) return;
    
    setTranslating(true);
    setIsPlaying(false);
    setSignIndex(0);
    
    // Simulate API delay
    setTimeout(() => {
      const words = speechText.toLowerCase().split(/\s+/);
      const signs: string[] = [];
      
      words.forEach(word => {
        if (SIGN_LIBRARY[word]) {
          signs.push(...SIGN_LIBRARY[word]);
        } else {
          // If word not found, use characters as fallback (simulated finger spelling)
          word.split('').forEach(char => signs.push(char.toUpperCase()));
        }
      });
      
      setCurrentSigns(signs);
      setTranslating(false);
      setIsPlaying(true);
      toast.success("Translation generated!");
    }, 1500);
  };

  // Animation Loop for Signs
  useEffect(() => {
    let interval: any;
    if (isPlaying && currentSigns.length > 0) {
      interval = setInterval(() => {
        setSignIndex((prev) => {
          if (prev >= currentSigns.length - 1) {
            return 0; // Loop back or stop
          }
          return prev + 1;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSigns]);

  // Handle Sign to Speech
  const startScanning = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
      return;
    }
    
    setScanning(true);
    setDetectedText("");
    
    setTimeout(() => {
      setScanning(false);
      const results = [
        "Where is the nearest hospital?",
        "I need water please",
        "Thank you for your help",
        "My name is John"
      ];
      setDetectedText(results[Math.floor(Math.random() * results.length)]);
      toast.success("Sign language detected!");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-400 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold md:text-4xl">Sign Connect</h1>
        <p className="mt-2 max-w-md text-purple-50">Empowering communication through AI-driven sign language translation.</p>
      </div>

      <Tabs defaultValue="speech-to-sign" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted rounded-xl">
          <TabsTrigger value="speech-to-sign" className="rounded-lg">Speech to Sign</TabsTrigger>
          <TabsTrigger value="sign-to-speech" className="rounded-lg">Sign to Speech</TabsTrigger>
        </TabsList>
        
        <TabsContent value="speech-to-sign" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-purple-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Input Message</CardTitle>
                <CardDescription>Type or speak phrases like "Hello", "Thank you", or "Need help".</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input 
                    placeholder="Type message here..." 
                    value={speechText}
                    onChange={(e) => setSpeechText(e.target.value)}
                    className="pr-12 h-12 text-lg border-purple-200 focus-visible:ring-purple-400"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-1 top-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
                
                <Button 
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold" 
                  onClick={handleTranslate} 
                  disabled={translating}
                >
                  {translating ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Hand className="mr-2 h-5 w-5" />
                      Convert to Sign
                    </>
                  )}
                </Button>

                <div className="rounded-xl bg-purple-50/50 p-4 border border-purple-100">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">Try these:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Hello", "Thank you", "Need food", "Where is hospital?"].map(phrase => (
                      <button 
                        key={phrase}
                        onClick={() => setSpeechText(phrase)}
                        className="text-xs px-2 py-1 bg-white border border-purple-200 rounded-full hover:bg-purple-100 transition-colors"
                      >
                        {phrase}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-md bg-gradient-to-b from-white to-purple-50/30 overflow-hidden">
              <div className="relative h-[300px] w-full flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  {translating ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative h-20 w-20">
                         <div className="absolute inset-0 border-4 border-purple-200 rounded-full" />
                         <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                         <Hand className="absolute inset-0 m-auto h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-purple-700">Synthesizing Sign Language...</p>
                    </motion.div>
                  ) : currentSigns.length > 0 ? (
                    <motion.div 
                      key={signIndex}
                      initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                      className="text-9xl flex items-center justify-center"
                    >
                      {currentSigns[signIndex]}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-4"
                    >
                      <div className="h-32 w-32 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                        <Hand className="h-16 w-16 text-purple-300" />
                      </div>
                      <p className="text-muted-foreground max-w-[200px] text-sm">Input text to see the sign language animation.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animation Progress Bar */}
                {currentSigns.length > 0 && !translating && (
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-purple-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-purple-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${((signIndex + 1) / currentSigns.length) * 100}%` }}
                    />
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t bg-white flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={currentSigns.length === 0}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  disabled={currentSigns.length === 0}
                  onClick={() => setSignIndex(0)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <div className="text-xs font-mono bg-purple-50 px-2 py-1 rounded border border-purple-100">
                  {currentSigns.length > 0 ? `${signIndex + 1} / ${currentSigns.length}` : "0 / 0"}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sign-to-speech" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden border-purple-100 shadow-md">
              <div className="relative aspect-video w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                {!isCameraOn ? (
                  <div className="flex flex-col items-center gap-4 text-white">
                    <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                       <Play className="h-8 w-8 text-white/50" />
                    </div>
                    <p className="text-sm opacity-70">Camera is off</p>
                  </div>
                ) : (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=800&auto=format&fit=crop" 
                      className="h-full w-full object-cover opacity-60 grayscale" 
                      alt="Sign detection feed" 
                    />
                    
                    {/* Detection Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative w-64 h-64 border-2 border-dashed border-purple-400 rounded-lg animate-pulse">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-purple-500 rounded-tl" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-purple-500 rounded-tr" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-purple-500 rounded-bl" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-purple-500 rounded-br" />
                        
                        {scanning && (
                          <motion.div 
                            className="absolute left-0 right-0 h-1 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                      <span className="text-[10px] font-bold text-white tracking-widest uppercase">Live Detection Feed</span>
                    </div>
                  </>
                )}
              </div>
              <CardContent className="p-4 bg-white">
                <Button 
                  className={`w-full ${isCameraOn ? 'bg-zinc-800' : 'bg-purple-600'}`} 
                  onClick={startScanning}
                  disabled={scanning}
                >
                  {scanning ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Scanning Hand Gestures...
                    </>
                  ) : isCameraOn ? (
                    "Capture Sign"
                  ) : (
                    "Start Camera"
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Detected Speech</CardTitle>
                <CardDescription>Real-time conversion of signs to text and audio.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                <div className="min-h-[150px] rounded-xl border-2 border-purple-100 bg-purple-50/30 p-6 relative overflow-hidden">
                   {detectedText ? (
                     <motion.p 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="text-2xl font-semibold text-purple-900 italic leading-relaxed"
                     >
                       "{detectedText}"
                     </motion.p>
                   ) : (
                     <p className="text-muted-foreground italic flex items-center justify-center h-full">
                       {scanning ? "Processing..." : "Waiting for sign detection..."}
                     </p>
                   )}
                   
                   {/* Decorative background icon */}
                   <MessageSquareText className="absolute bottom-2 right-2 h-16 w-16 text-purple-200/40 -rotate-12 pointer-events-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    disabled={!detectedText}
                    onClick={() => toast.info("Playing audio translation...")}
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    Play Audio
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    disabled={!detectedText}
                    onClick={() => {
                      navigator.clipboard.writeText(detectedText);
                      toast.success("Text copied to clipboard!");
                    }}
                  >
                    <MessageSquareText className="mr-2 h-4 w-4" />
                    Copy Text
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-zinc-900 text-white border-none shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-6 space-y-4">
             <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <RotateCcw className="h-3 w-3" />
                Latest Update
             </div>
             <h3 className="text-xl font-bold">Dynamic Dictionary v2.1</h3>
             <p className="text-zinc-400 text-sm">
               We've expanded our sign library to include over 500 common phrases in Ugandan Sign Language (USL). 
               Try typing questions about health, farming, or market prices!
             </p>
             <Button variant="link" className="text-purple-400 p-0 h-auto hover:text-purple-300">
               View Full Dictionary
             </Button>
          </div>
          <div className="bg-purple-600/10 flex items-center justify-center p-6 border-l border-white/5">
             <div className="text-center space-y-2">
                <div className="text-3xl font-bold">98.4%</div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Recognition Accuracy</p>
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
