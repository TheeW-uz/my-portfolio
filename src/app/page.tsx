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

// Featured projects with fallback data
const FEATURED_PROJECTS = [
  {
    id: 'imp0ve',
    title: 'Impr0ve',
    description: 'A powerful platform designed to help developers/people to find their ways and improve their productivity.',
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveLink: 'https://impr0ve.vercel.app',
    results: 'Streamlined workflow automation for 100+ active users with 40% performance improvement'
  }
];

export default async function Home() {
  // Fetch authentic data from database
  let projects = [];
  let achievements = [];
  let experiences = [];
  let stats = [];

  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    achievements = await prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } });
    experiences = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
    stats = await prisma.stat.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    console.error('Failed to fetch data from database:', error);
    // Use featured projects as fallback
    projects = FEATURED_PROJECTS;
  }

  // Merge featured projects with database projects, avoiding duplicates
  if (projects.length === 0) {
    projects = FEATURED_PROJECTS;
  } else {
    const featuredIds = FEATURED_PROJECTS.map(p => p.id);
    const dbProjectIds = projects.map(p => p.id);
    const missingFeatured = FEATURED_PROJECTS.filter(p => !dbProjectIds.includes(p.id));
    projects = [...projects, ...missingFeatured];
  }

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
          <span className="italic mt-2 inline-block">&quot;Obsession over Discipline&quot;</span>
        </p>
      </footer>
    </main>
  );
}
