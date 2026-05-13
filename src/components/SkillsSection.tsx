'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Server, Smartphone, Cpu, Shield, Braces 
} from 'lucide-react';

const skillGroups = [
  {
    title: 'Frontend',
    icon: <Globe className="text-blue-400" />,
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    icon: <Server className="text-green-400" />,
    skills: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'Prisma', 'REST APIs']
  },
  {
    title: 'Mobile',
    icon: <Smartphone className="text-purple-400" />,
    skills: ['React Native', 'Flutter', 'Dart']
  },
  {
    title: 'AI Tools',
    icon: <Cpu className="text-yellow-400" />,
    skills: ['Prompt Engineering', 'AI Workflows', 'LLM Integration', 'Automation']
  },
  {
    title: 'Cybersecurity',
    icon: <Shield className="text-red-400" />,
    skills: ['Web Security', 'Encryption Basics', 'Secure Coding']
  },
  {
    title: 'Languages',
    icon: <Braces className="text-cyan-400" />,
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Dart']
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Mastered <span className="text-gradient">Tech Stack</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic">
            Continuous learning is the key. Here&apos;s what I&apos;ve mastered so far.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">
                  {group.icon}
                </div>
                <h3 className="text-xl font-bold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-4 py-1.5 rounded-full bg-white/5 text-gray-300 text-sm font-medium border border-white/5 hover:border-white/20 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
