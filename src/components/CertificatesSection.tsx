'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Presentation, Trophy, Star, ShieldCheck } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date?: string | null;
  link?: string | null;
  type: string;
}

const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'award': return <Trophy className="text-red-500" />;
    case 'presentation': return <Presentation className="text-purple-500" />;
    case 'certificate': return <Award className="text-yellow-500" />;
    default: return <Star className="text-blue-500" />;
  }
};

export default function CertificatesSection({ achievements = [] }: { achievements?: Achievement[] }) {
  return (
    <section id="certificates" className="py-32 bg-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Achievements & <span className="text-gradient">Awards</span></h2>
          <p className="text-gray-400">Authentic proof of my dedication and professional growth.</p>
        </div>

        {achievements.length === 0 ? (
          <div className="glass p-16 rounded-[2.5rem] border border-white/5 text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">My future achievements will appear here</h3>
              <p className="text-gray-500 max-w-md mx-auto">This section is currently empty to maintain authenticity. I only display verified milestones.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-6 group hover:border-primary/30 transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  {getIcon(cert.type)}
                </div>
                <div className="flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{cert.type}</span>
                  <h3 className="text-xl font-bold mt-1">{cert.title}</h3>
                  <p className="text-gray-500 text-sm">{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</p>
                </div>
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm font-bold shrink-0"
                  >
                    Verify →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
