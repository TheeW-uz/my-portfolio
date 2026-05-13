'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-height-[100vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            Full-stack Developer & AI Enthusiast
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            Creating the <span className="text-gradient">Future</span> <br /> 
            Bit by Bit
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            I&apos;m <span className="text-white font-semibold">Abubakr</span>, a 16-year-old developer from Uzbekistan 
            building premium digital experiences with a focus on speed, performance, and cutting-edge tech.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg shadow-xl hover:shadow-white/20 transition-all"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl glass font-bold text-lg hover:bg-white/5 transition-all"
            >
              Let&apos;s Talk
            </motion.a>
          </div>
        </motion.div>

        {/* Floating Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 text-8xl md:text-[12rem] font-black text-white/5 select-none pointer-events-none uppercase tracking-tighter">
            Nah I&apos;d win
          </div>
          <div className="relative z-10 glass inline-block px-8 py-4 rounded-2xl border border-white/20 italic text-xl md:text-2xl font-medium">
            “Nah I&apos;d win”
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
