'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './portfolio.module.css';

// SVG Icons from Lucide set for professional looks
const GithubIcon = () => (
  <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
);

const WebsiteIcon = () => (
  <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);

const TwitterIcon = () => (
  <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const LinkedinIcon = () => (
  <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const EmailIcon = () => (
  <svg className={styles.socialIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);

const OrgsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><path d="M7 21v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path><path d="M9 7h1"></path><path d="M9 11h1"></path><path d="M14 7h1"></path><path d="M14 11h1"></path></svg>
);

const TopicsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

const ForkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 15V9a4 4 0 0 0-4-4H9"></path><line x1="6" y1="9" x2="6" y2="15"></line></svg>
);

export default function PortfolioView({ portfolio, langColors }) {
  const [copied, setCopied] = useState(false);

  if (!portfolio) {
    return (
      <div className={styles.portfolioPage}>
        <div className="container">
          <div className={styles.notFound}>
            <div>
              <h1>Portfolio Not Found</h1>
              <p>This portfolio doesn't exist or hasn't been generated yet.</p>
              <Link href="/" className="btn btn-primary">
                ← Generate One
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    name, avatarUrl, headline, bio, location,
    email, website, twitter, linkedin, githubUrl,
    skills, projects, stats, experience, slug,
  } = portfolio;

  const orgs = experience?.orgs || [];
  const topics = experience?.topics || [];

  // Filter projects where featured: true (default to all if none are featured)
  const featuredProjects = projects.filter(p => p.featured === true);
  const displayedProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6);

  function copyLink() {
    const url = `${window.location.origin}/portfolio/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.portfolioPage}>
      <div className="container">
        {/* Top bar */}
        <div className={styles.topbar}>
          <Link href="/" className={styles.topbarBrand}>
            <span className={styles.topbarBrandDot}>⚡</span>
            Gitfolio
          </Link>
          <div className={styles.topbarActions}>
            <button
              id="copy-link-btn"
              onClick={copyLink}
              className="btn btn-secondary btn-sm"
            >
              {copied ? '✓ Copied!' : '🔗 Copy Link'}
            </button>
            <Link
              href={`/edit/${slug}`}
              className="btn btn-ghost btn-sm"
              id="edit-portfolio-btn"
            >
              ✏️ Edit
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className={`${styles.heroSection} fade-in-up`}>
          {avatarUrl && (
            <div className={styles.heroAvatar}>
              <img src={avatarUrl} alt={name} />
            </div>
          )}
          <h1 className={styles.heroName}>{name}</h1>
          {headline && <p className={styles.heroHeadline}>{headline}</p>}
          {location && (
            <p className={styles.heroLocation}>
              <LocationIcon /> {location}
            </p>
          )}

          <div className={styles.heroSocials}>
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <GithubIcon /> GitHub
              </a>
            )}
            {website && (
              <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <WebsiteIcon /> Website
              </a>
            )}
            {twitter && (
              <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <TwitterIcon /> @{twitter}
              </a>
            )}
            {linkedin && (
              <a href={linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <LinkedinIcon /> LinkedIn
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className={styles.socialLink}>
                <EmailIcon /> Email
              </a>
            )}
          </div>
        </section>

        {/* Stats */}
        {stats && (
          <div className={`${styles.statsBar} fade-in-up fade-in-up-delay-1`}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.totalRepos || 0}</div>
              <div className={styles.statLabel}>Repos</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.totalStars || 0}</div>
              <div className={styles.statLabel}>Stars</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.totalForks || 0}</div>
              <div className={styles.statLabel}>Forks</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.followers || 0}</div>
              <div className={styles.statLabel}>Followers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.accountAge || 0}y</div>
              <div className={styles.statLabel}>On GitHub</div>
            </div>
          </div>
        )}

        {/* Bio */}
        {bio && (
          <section className={`${styles.section} fade-in-up fade-in-up-delay-2`}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconPurple}`}>
                <AboutIcon />
              </div>
              <h2 className={styles.sectionTitle}>About</h2>
            </div>
            <div className={styles.bioText}>
              {bio.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className={`${styles.section} fade-in-up fade-in-up-delay-3`}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconCyan}`}>
                <SkillsIcon />
              </div>
              <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
            </div>
            <div className={styles.skillsGrid}>
              {skills.map((skill, i) => (
                <span key={i} className={styles.skillTag}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {displayedProjects && displayedProjects.length > 0 && (
          <section className={`${styles.section} fade-in-up fade-in-up-delay-4`}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconGreen}`}>
                <ProjectsIcon />
              </div>
              <h2 className={styles.sectionTitle}>Featured Projects</h2>
            </div>
            <div className={styles.projectsGrid}>
              {displayedProjects.map((project, i) => (
                <div key={i} className={`card card-glow ${styles.projectCard}`}>
                  <div className={styles.projectCardHeader}>
                    <div className={styles.projectName}>
                      <span className={styles.projectNameIcon}>
                        <ProjectsIcon />
                      </span>
                      {project.name}
                    </div>
                    <div className={styles.projectLinks}>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          title="View on GitHub"
                        >
                          ↗
                        </a>
                      )}
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          title="Live Demo"
                        >
                          🌐
                        </a>
                      )}
                    </div>
                  </div>
                  <p className={styles.projectDescription}>
                    {project.description || 'No description available.'}
                  </p>
                  <div className={styles.projectFooter}>
                    {project.language && (
                      <span className={styles.projectLang}>
                        <span
                          className={styles.langDot}
                          style={{ backgroundColor: langColors[project.language] || '#888' }}
                        />
                        {project.language}
                      </span>
                    )}
                    <div className={styles.projectMeta}>
                      <span>
                        <StarIcon /> {project.stars || 0}
                      </span>
                      <span>
                        <ForkIcon /> {project.forks || 0}
                      </span>
                    </div>
                  </div>
                  {project.topics && project.topics.length > 0 && (
                    <div className={styles.projectTopics}>
                      {project.topics.slice(0, 5).map((topic, j) => (
                        <span key={j} className={styles.projectTopic}>{topic}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Organizations */}
        {orgs.length > 0 && (
          <section className={`${styles.section} fade-in-up fade-in-up-delay-5`}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconOrange}`}>
                <OrgsIcon />
              </div>
              <h2 className={styles.sectionTitle}>Organizations</h2>
            </div>
            <div className={styles.orgsGrid}>
              {orgs.map((org, i) => (
                <a
                  key={i}
                  href={`https://github.com/${org.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.orgBadge}
                >
                  {org.avatarUrl && (
                    <img src={org.avatarUrl} alt={org.login} className={styles.orgAvatar} />
                  )}
                  <span className={styles.orgName}>{org.login}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Topics */}
        {topics.length > 0 && (
          <section className={`${styles.section} fade-in-up fade-in-up-delay-5`}>
            <div className={styles.sectionHeader}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconPink}`}>
                <TopicsIcon />
              </div>
              <h2 className={styles.sectionTitle}>Interests & Topics</h2>
            </div>
            <div className={styles.topicsCloud}>
              {topics.map((topic, i) => (
                <span key={i} className="badge">{topic}</span>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className={styles.portfolioFooter}>
          <p>
            Built with <a href="/">Gitfolio</a> — 
            AI-powered portfolio from GitHub
          </p>
        </footer>
      </div>
    </div>
  );
}
