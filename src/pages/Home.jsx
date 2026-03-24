import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import AboutSnapshot from '../components/sections/AboutSnapshot';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import Skills from '../components/sections/Skills';
import ContactCTA from '../components/sections/ContactCTA';
import SectionDivider from '../components/SectionDivider';
import PageTransition from '../components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>ABINAV.SYS — Developer & ML Engineer</title>
        <meta name="description" content="Portfolio of Abinav — Full Stack Developer, ML Engineer, and Cybersecurity Researcher based in Chennai, India." />
        <meta property="og:title" content="ABINAV.SYS — Developer & ML Engineer" />
        <meta property="og:description" content="Portfolio of Abinav — Full Stack Developer, ML Engineer, and Cybersecurity Researcher." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero />
      <SectionDivider label="PROFILE_LOADED" />
      <AboutSnapshot />
      <SectionDivider label="MODULES_READY" />
      <FeaturedProjects />
      <SectionDivider label="CAPABILITY_SCAN_COMPLETE" />
      <Skills />
      <SectionDivider label="END_OF_SEGMENT" />
      <ContactCTA />
    </PageTransition>
  );
}
