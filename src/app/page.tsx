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

const PROJECTS = [
  {
    id: 'imp0ve',
    title: 'Impr0ve',
    description: 'A powerful platform designed to help developers/people to find their ways and improve their productivity.',
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveLink: 'https://impr0ve.vercel.app',
    githubLink: null,
    imageUrl: null,
    results: 'Streamlined workflow automation for 100+ active users with 40% performance improvement',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection stats={[]} />
      <ProjectsSection projects={PROJECTS} />
      <ExperienceSection experiences={[]} />
      <AboutSection />
      <SkillsSection />
      <CertificatesSection achievements={[]} />
      <ReflexGame />
      <ContactSection />
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Abubakr. Built with Next.js &amp; Framer Motion.{' '}
          <br />
          <span className="italic mt-2 inline-block">&quot;Obsession over Discipline&quot;</span>
        </p>
      </footer>
    </main>
  );
}
