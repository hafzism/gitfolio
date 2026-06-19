'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const LOADING_STEPS = [
  'Fetching GitHub profile...',
  'Analyzing repositories...',
  'Extracting skills & languages...',
  'Crafting your headline & bio...',
  'Saving your portfolio...',
];

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleGenerate(e) {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setLoadingStep(0);

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2500);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate portfolio');
      }

      clearInterval(stepInterval);
      // Always go directly to the portfolio view
      router.push(`/portfolio/${data.slug}`);
    } catch (err) {
      clearInterval(stepInterval);
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className={styles.landing}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingOrb} />
            <h2>Building your portfolio</h2>
            <div className={styles.loadingStep}>
              <div className="spinner" />
              {LOADING_STEPS[loadingStep]}
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* Navbar */}
        <nav className={styles.navbar}>
          <div className={styles.navbarBrand}>
            <div className={styles.navbarBrandIcon}>⚡</div>
            <span>Gitfolio</span>
          </div>
          <div className={styles.navbarLinks}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
            >
              GitHub ↗
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={`${styles.heroBadge} fade-in-up`}>
              <span className={styles.heroBadgeDot} />
              AI-Powered Portfolio Generator
            </div>

            <h1 className="fade-in-up fade-in-up-delay-1">
              GitHub to <span className="gradient-text">Portfolio</span> in Seconds
            </h1>

            <p className={`${styles.heroSubtitle} fade-in-up fade-in-up-delay-2`}>
              Enter your GitHub username and let AI craft a stunning developer 
              portfolio. Get a shareable link you can send to recruiters — 
              no coding required.
            </p>

            <form
              onSubmit={handleGenerate}
              className={`${styles.searchForm} fade-in-up fade-in-up-delay-3`}
            >
              <div className={styles.searchInputWrapper}>
                <span className={styles.searchIcon}>@</span>
                <input
                  id="github-username-input"
                  type="text"
                  className="input input-lg"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  disabled={loading}
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <button
                id="generate-btn"
                type="submit"
                className="btn btn-primary"
                disabled={loading || !username.trim()}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Generating
                  </>
                ) : (
                  'Generate →'
                )}
              </button>
            </form>

            {error && (
              <div className={styles.errorMessage}>
                <span>⚠</span> {error}
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        <section className={`${styles.features} fade-in-up fade-in-up-delay-4`}>
          <div className={styles.featuresGrid}>
            <div className={`card ${styles.featureCard}`}>
              <div className={`${styles.featureIcon} ${styles.featureIconPurple}`}>
                🔍
              </div>
              <h3>Deep GitHub Analysis</h3>
              <p>
                Pulls your profile, repos, languages, contributions, orgs, 
                and stats — everything public is captured.
              </p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={`${styles.featureIcon} ${styles.featureIconGreen}`}>
                🤖
              </div>
              <h3>AI-Written Bio & Skills</h3>
              <p>
                Groq AI crafts your headline, bio, and skills list.
                You can enhance project descriptions anytime with one click.
              </p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={`${styles.featureIcon} ${styles.featureIconPink}`}>
                🔗
              </div>
              <h3>Shareable Link</h3>
              <p>
                Get a unique portfolio URL instantly. Share it on your 
                resume, LinkedIn, or send directly to recruiters.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          Built with ⚡ by Gitfolio — Open Source Portfolio Generator
        </footer>
      </div>
    </div>
  );
}
