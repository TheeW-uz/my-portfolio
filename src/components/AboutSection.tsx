'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Trophy, Music, Ghost } from 'lucide-react';

const interests = [
  { icon: <Code className="text-primary" />, label: 'Coding' },
  { icon: <Trophy className="text-yellow-500" />, label: 'Football' },
  { icon: <Ghost className="text-secondary" />, label: 'Chess' },
  { icon: <Palette className="text-pink-500" />, label: 'Drawing' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              A 16-Year-Old on a <br />
              <span className="text-gradient">Digital Mission</span>
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Based in <span className="text-white font-medium">Namangan, Uzbekistan</span>, 
                I started my journey into tech with a simple curiosity: &quot;How does it work?&quot;. 
                Today, I build complex full-stack applications and delve into the world of AI 
                and Cybersecurity.
              </p>
              <p>
                I don&apos;t just write code; I craft digital experiences. Whether it&apos;s a mobile app 
                using Flutter or a robust backend with PostgreSQL, I prioritize speed, 
                scalability, and &quot;wow&quot; factor.
              </p>
              <p>
                My philosophy is simple: <span className="text-white italic">&quot;Nah I&apos;d win&quot;</span>. 
                I take on challenges that others find daunting and turn them into 
                polished products.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                When I&apos;m not coding...
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {interests.map((interest, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all flex flex-col items-center text-center gap-3"
                  >
                    <div className="p-4 rounded-xl bg-white/5">{interest.icon}</div>
                    <span className="font-semibold text-sm tracking-wide">{interest.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
