'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export default function ExperienceSection({ experiences = [] }: { experiences?: Experience[] }) {
  return (
    <section id="experience" className="py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Professional <span className="text-gradient">Journey</span></h2>
          <p className="text-gray-400">Verifiable work history and career milestones.</p>
        </div>

        {experiences.length === 0 ? (
          <div className="glass p-16 rounded-[2.5rem] border border-white/5 text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
              <Briefcase size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">My professional experience will appear here</h3>
              <p className="text-gray-500 max-w-md mx-auto">Currently building my track record through dedicated projects and continuous learning.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-10 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 text-gray-400 text-sm font-medium border border-white/5">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-4xl">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
