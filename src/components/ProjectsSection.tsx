'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FolderOpen } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string | null;
  githubLink?: string | null;
  imageUrl?: string | null;
  results?: string | null;
}

export default function ProjectsSection({ projects = [] }: { projects?: Project[] }) {
  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-gray-400">
              A showcase of my real-world applications and technical experiments.
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="glass p-20 rounded-[3rem] border border-white/5 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
              <FolderOpen size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">No projects added yet</h3>
              <p className="text-gray-500">My future engineering breakthroughs will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all flex flex-col h-full group"
              >
                <div className="aspect-video bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                     <span className="text-2xl font-bold tracking-tighter uppercase">{project.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary text-white hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 text-white backdrop-blur-md hover:scale-110 transition-transform">
                        <GithubIcon size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.techStack.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-primary/80 px-2 py-0.5 rounded bg-primary/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  {project.results && (
                    <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                       <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Results & Impact</p>
                       <p className="text-gray-300 text-sm italic">{project.results}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                     {project.liveLink && (
                       <a href={project.liveLink} className="text-sm font-bold flex items-center gap-2 text-white hover:text-primary transition-colors">
                         Live Demo <ExternalLink size={14} />
                       </a>
                     )}
                     {project.githubLink && (
                       <a href={project.githubLink} className="text-sm font-bold flex items-center gap-2 text-gray-400 hover:text-white transition-colors ml-auto">
                         Source <GithubIcon size={14} />
                       </a>
                     )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GithubIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}
