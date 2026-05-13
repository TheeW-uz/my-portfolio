'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Heart, Send as Telegram } from 'lucide-react';

export default function ContactSection() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8">Let&apos;s Build Something <br /> <span className="text-gradient">Legendary</span></h2>
            <p className="text-gray-400 text-lg mb-12">
              Have a project in mind or just want to say hi? My inbox is always open. 
              I&apos;m currently looking for new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Email Me</h4>
                  <p className="text-xl font-bold">abubakr@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Location</h4>
                  <p className="text-xl font-bold">Namangan, Uzbekistan</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {[
                { icon: <CodewarsIcon size={20} />, href: '#' },
                { icon: <Heart size={20} />, href: '#' },
                { icon: <Telegram size={20} />, href: '#' },
                { icon: <CodewarsIcon size={20} />, href: '#' }, // Codewars placeholder
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-primary transition-all hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem] border border-white/10"
          >
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-primary font-bold hover:underline pt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="Your Name"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">Email</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="your@email.com"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Subject</label>
                  <input 
                    name="subject"
                    type="text" 
                    required
                    placeholder="Project Inquiry"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary transition-all outline-none resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={pending}
                  className="w-full py-5 bg-gradient rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {pending ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Add Codewars icon component since it's not in Lucide
function CodewarsIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}
