import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will get back to you soon.");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Have questions or want to partner with us? Reach out to the AFRINOVA team.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <a href="mailto:chainstoreign@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    chainstoreign@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Call Us</p>
                  <a href="tel:0752893166" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    0752893166
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Visit Our Office</p>
                  <p className="text-sm text-muted-foreground">
                    Kampala, Uganda
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
             <CardHeader>
                <CardTitle>Connect with us</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex gap-4">
                   <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                      <Globe className="h-6 w-6" />
                   </Button>
                   <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                      <Share2 className="h-6 w-6" />
                   </Button>
                   <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                      <MessageCircle className="h-6 w-6" />
                   </Button>
                   <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full">
                      <MessageCircle className="h-6 w-6" />
                   </Button>
                </div>
             </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll respond within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Partnership Inquiry" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." className="min-h-[120px]" required />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
