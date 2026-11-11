import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import PageTransition from '../components/PageTransition';
import BackButton from '../components/BackButton';
import SectionHeading from '../components/SectionHeading';
import JourneyTabs from '../components/experience/JourneyTabs';
import EducationTimeline from '../components/experience/EducationTimeline';
import InternshipTimeline from '../components/experience/InternshipTimeline';
import EventsSection from '../components/experience/EventsSection';

import { usePortfolioData } from '../context/PortfolioDataContext';
import { eventsData as fallbackEvents } from '../data/events';

const VALID_TABS = ['internships', 'events', 'education'];

export default function Experience() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : 'internships';

  const { data } = usePortfolioData();
  const education = data.education || [];
  const eduCerts = data.eduCerts || [];
  const experience = data.experience || [];
  const certificates = data.certificates || [];
  const events = data.events || fallbackEvents;

  // Sync tab changes with URL search params for bookmarkability without reload
  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab }, { replace: true });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Experience &amp; Journey &mdash; Abinav Aaditya</title>
        <meta
          name="description"
          content="Academic foundation, professional internships, and technical cybersecurity events hosted by Abinav Aaditya."
        />
        <meta property="og:title" content="Experience & Journey — Abinav Aaditya" />
        <meta
          property="og:description"
          content="Academic foundation, professional internships, and technical cybersecurity events hosted by Abinav Aaditya."
        />
      </Helmet>

      <div
        className="page-container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '2.5rem var(--page-gutter) 6rem',
        }}
      >
        <BackButton />

        {/* Page Heading */}
        <SectionHeading
          pageLabel="Journey // Chronology"
          title="Internships, technical events, and academic foundation."
          subtitle="A structured chronicle of my practical cybersecurity internships, Capture The Flag events hosted for the community, and studies in computer science."
          metaLines={[
            { label: 'Chapters', value: '03 Sections' },
            { label: 'Specialization', value: 'Cybersecurity & Systems' },
            { label: 'Timeline', value: '2022 — Present' },
          ]}
        />

        {/* Modern Segmented Navigation Bar */}
        <JourneyTabs activeTab={activeTab} onChange={handleTabChange} />

        {/* Tab Content Panes */}
        <div style={{ position: 'relative', minHeight: '480px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'internships' && (
              <motion.div
                key="internships"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <InternshipTimeline experience={experience} certificates={certificates} />
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <EventsSection events={events} />
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <EducationTimeline education={education} eduCerts={eduCerts} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
