import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>404 &mdash; Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div
        style={{
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem var(--page-gutter)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--accent-primary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          404 Error
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          The page or documented specification you requested does not exist or has been relocated.
        </p>

        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '0.86rem',
            borderRadius: '2px',
            textDecoration: 'none',
          }}
        >
          <span>Return to Homepage</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </PageTransition>
  );
}
