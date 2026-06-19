"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Code, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoLink = `mailto:abubakrfazliddinov768@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setSuccess(true);
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
                  <p className="text-xl font-bold">abubakrfazliddinov768@gmail.com</p>
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
                { icon: <Send size={20} />, href: 'https://t.me/Abu_wsg', label: 'Telegram' },
                { icon: <Code size={20} />, href: 'https://www.codewars.com/users/WasF_', label: 'Codewars' },
                { icon: <InstagramIcon size={20} />, href: 'https://instagram.com/abuwasfound', label: 'Instagram' },
                { icon: <Phone size={20} />, href: 'tel:+998913680910', label: 'Phone' },
                { icon: <GithubIcon size={20} />, href: 'https://github.com/TheeW-uz', label: 'GitHub' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
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
            className="glass p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                    className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle size={50} />
                  </motion.div>
                  <h3 className="text-3xl font-bold">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm">Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="mt-8 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 relative" 
                  onSubmit={handleSubmit}
                >


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400">Full Name</label>
                      <input 
                        name="name"
                        type="text" 
                        required
                        disabled={pending}
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
                        disabled={pending}
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
                      disabled={pending}
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
                    className="w-full py-5 bg-gradient rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    SEND MESSAGE <Send size={18} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function GithubIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C6.477 2 2 6.485 2 12.02c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.952 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.273.098-2.653 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.296 2.748-1.026 2.748-1.026.545 1.38.202 2.399.1 2.653.64.7 1.028 1.594 1.028 2.687 0 3.849-2.338 4.697-4.566 4.944.359.31.678.924.678 1.863 0 1.345-.012 2.428-.012 2.758 0 .268.18.58.688.482A10.025 10.025 0 0022 12.02C22 6.485 17.523 2 12 2z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
    </svg>
  );
}

function CodewarsIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}


