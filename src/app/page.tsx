import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificatesSection from '@/components/CertificatesSection';
import ExperienceSection from '@/components/ExperienceSection';
import StatsSection from '@/components/StatsSection';
import ReflexGame from '@/components/ReflexGame';
import ContactSection from '@/components/ContactSection';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch authentic data from database
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  const achievements = await prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } });
  const experiences = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
  const stats = await prisma.stat.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      <StatsSection stats={stats} />
      
      <ProjectsSection projects={projects} />
      
      <ExperienceSection experiences={experiences} />
      
      <AboutSection />
      
      <SkillsSection />
      
      <CertificatesSection achievements={achievements} />
      
      <ReflexGame />
      
      <ContactSection />
      
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Abubakr. Built with Next.js & Framer Motion. 
          <br />
          <span className="italic mt-2 inline-block">&quot;Nah I&apos;d win&quot;</span>
        </p>
      </footer>
    </main>
  );
}
