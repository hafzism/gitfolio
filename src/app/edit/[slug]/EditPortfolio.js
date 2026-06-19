'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './edit.module.css';

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
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

const SparklesIcon = () => (
  <svg style={{ marginRight: '6px' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
);

export default function EditPortfolio({ portfolio, slug, showMissing }) {
  const router = useRouter();

  if (!portfolio) {
    return (
      <div className={styles.editPage}>
        <div className="container-sm">
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Portfolio Not Found</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Generate a portfolio first before editing.
            </p>
            <Link href="/" className="btn btn-primary">← Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Form state
  const [form, setForm] = useState({
    name: portfolio.name || '',
    headline: portfolio.headline || '',
    bio: portfolio.bio || '',
    location: portfolio.location || '',
    email: portfolio.email || '',
    website: portfolio.website || '',
    twitter: portfolio.twitter || '',
    linkedin: portfolio.linkedin || '',
  });

  const [skills, setSkills] = useState(portfolio.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [projects, setProjects] = useState(portfolio.projects || []);
  const [saving, setSaving] = useState(false);
  const [generatingDesc, setGeneratingDesc] = useState({}); // projectIndex -> boolean
  const [toast, setToast] = useState('');

  // Missing fields detection
  const missingFields = [];
  if (!form.name) missingFields.push('Name');
  if (!form.email) missingFields.push('Email');
  if (!form.location) missingFields.push('Location');
  if (!form.website) missingFields.push('Website');
  if (!form.twitter) missingFields.push('Twitter');
  if (!form.linkedin) missingFields.push('LinkedIn');

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function addSkill() {
    const skill = newSkill.trim();
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setNewSkill('');
    }
  }

  function removeSkill(index) {
    setSkills(prev => prev.filter((_, i) => i !== index));
  }

  // Toggle project feature selection
  function toggleProjectFeatured(index) {
    setProjects(prev => prev.map((p, i) => i === index ? { ...p, featured: !p.featured } : p));
  }

  function updateProjectDescription(index, description) {
    setProjects(prev => prev.map((p, i) => i === index ? { ...p, description } : p));
  }

  // AI Description Generator Helper
  async function generateAIProjectDesc(index, project) {
    setGeneratingDesc(prev => ({ ...prev, [index]: true }));
    try {
      const res = await fetch('/api/helper/generate-project-desc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: project.name,
          language: project.language,
          originalDescription: project.description,
        }),
      });

      if (!res.ok) {
        throw new Error('AI generation failed');
      }

      const data = await res.json();
      if (data.description) {
        updateProjectDescription(index, data.description);
      }
    } catch (err) {
      console.error('AI Description Generation error:', err);
      alert('Error generating project description. Make sure GROQ_API_KEY is correct.');
    } finally {
      setGeneratingDesc(prev => ({ ...prev, [index]: false }));
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/portfolio/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          skills,
          projects,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save');
      }

      setToast('Portfolio saved successfully!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Error saving portfolio. Please try again.');
      setTimeout(() => setToast(''), 3000);
    } finally {
      setSaving(false);
    }
  }

  function viewPortfolio() {
    router.push(`/portfolio/${slug}`);
  }

  // Filter project lists
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className={styles.editPage}>
      <div className="container-sm">
        {/* Top bar */}
        <div className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <Link href="/" className={styles.topbarBrand}>
              <span className={styles.topbarBrandDot}>⚡</span>
              Gitfolio
            </Link>
            <div className={styles.topbarDivider} />
            <span className={styles.topbarTitle}>Editing: {form.name || slug}</span>
          </div>
          <div className={styles.topbarActions}>
            <button
              id="view-portfolio-btn"
              onClick={viewPortfolio}
              className="btn btn-ghost btn-sm"
            >
              👁 Preview
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className="gradient-text">Edit Your Portfolio</h1>
          <p>Customize every section to make it perfect.</p>
        </div>

        {/* Missing Fields Alert */}
        {showMissing && missingFields.length > 0 && (
          <div className={styles.missingAlert}>
            <span className={styles.missingAlertIcon}>⚠️</span>
            <div>
              <h3>Some info is missing from your GitHub profile</h3>
              <p>
                Fill in the missing fields below to complete your portfolio: {' '}
                <strong>{missingFields.join(', ')}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className={styles.editSection}>
          <div className={styles.editSectionHeader}>
            <div className={styles.editSectionTitle}>
              <div className={styles.editSectionIcon}>
                <AboutIcon />
              </div>
              <h2>Basic Info</h2>
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Full Name <span className={styles.formLabelRequired}>*</span>
              </label>
              <input
                id="edit-name"
                type="text"
                className="input"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <input
                id="edit-location"
                type="text"
                className="input"
                value={form.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className={`${styles.formGroup} ${styles.formGridFull}`}>
              <label className={styles.formLabel}>Headline / Tagline</label>
              <input
                id="edit-headline"
                type="text"
                className="input"
                value={form.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                placeholder="Full-stack developer passionate about open source"
              />
              <span className={styles.formHint}>This appears right below your name</span>
            </div>
            <div className={`${styles.formGroup} ${styles.formGridFull}`}>
              <label className={styles.formLabel}>Bio</label>
              <textarea
                id="edit-bio"
                className="textarea"
                value={form.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                placeholder="Tell your story..."
                rows={6}
              />
              <span className={styles.formHint}>AI-generated bio — feel free to edit</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.editSection}>
          <div className={styles.editSectionHeader}>
            <div className={styles.editSectionTitle}>
              <div className={styles.editSectionIcon}>
                <WebsiteIcon />
              </div>
              <h2>Social & Contact</h2>
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                id="edit-email"
                type="email"
                className="input"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@email.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Website / Blog</label>
              <input
                id="edit-website"
                type="text"
                className="input"
                value={form.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://yoursite.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Twitter / X Username</label>
              <input
                id="edit-twitter"
                type="text"
                className="input"
                value={form.twitter}
                onChange={(e) => updateField('twitter', e.target.value)}
                placeholder="username"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>LinkedIn</label>
              <input
                id="edit-linkedin"
                type="text"
                className="input"
                value={form.linkedin}
                onChange={(e) => updateField('linkedin', e.target.value)}
                placeholder="username or full URL"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className={styles.editSection}>
          <div className={styles.editSectionHeader}>
            <div className={styles.editSectionTitle}>
              <div className={styles.editSectionIcon}>
                <SkillsIcon />
              </div>
              <h2>Skills & Technologies</h2>
            </div>
          </div>
          <div className={styles.skillsEditor}>
            {skills.map((skill, i) => (
              <span key={i} className={styles.skillEditable}>
                {skill}
                <button
                  onClick={() => removeSkill(i)}
                  className={styles.skillRemove}
                  title="Remove skill"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className={styles.skillAddRow}>
            <input
              id="add-skill-input"
              type="text"
              className="input"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill..."
            />
            <button
              id="add-skill-btn"
              onClick={addSkill}
              className="btn btn-secondary btn-sm"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Select Featured Projects */}
        <div className={styles.editSection}>
          <div className={styles.editSectionHeader}>
            <div className={styles.editSectionTitle}>
              <div className={styles.editSectionIcon}>
                <ProjectsIcon />
              </div>
              <h2>Select Featured Projects</h2>
            </div>
          </div>
          <p className={styles.editSectionSubtitle}>
            Select the repositories you want to display on your public portfolio page. We recommend selecting 4 to 8 projects.
          </p>
          <div className={styles.repoSelectionList}>
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={() => toggleProjectFeatured(i)}
                className={`${styles.repoSelectItem} ${project.featured ? styles.repoSelectItemActive : ''}`}
              >
                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    checked={!!project.featured}
                    onChange={() => {}} // Click handled by parent div
                    className={styles.checkboxInput}
                  />
                </div>
                <div className={styles.repoSelectDetails}>
                  <div className={styles.repoSelectName}>{project.name}</div>
                  <div className={styles.repoSelectDesc}>
                    {project.description || 'No description available.'}
                  </div>
                  <div className={styles.repoSelectMeta}>
                    {project.language && <span>{project.language}</span>}
                    <span><StarIcon /> {project.stars || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Project Descriptions & AI helper */}
        <div className={styles.editSection}>
          <div className={styles.editSectionHeader}>
            <div className={styles.editSectionTitle}>
              <div className={styles.editSectionIcon}>
                <ProjectsIcon />
              </div>
              <h2>Edit Project Descriptions ({featuredProjects.length} Selected)</h2>
            </div>
          </div>
          {projects.map((project, i) => {
            if (!project.featured) return null;
            return (
              <div key={i} className={styles.projectEditCard}>
                <div className={styles.projectEditHeader}>
                  <div className={styles.projectEditName}>
                    <span>📁</span> {project.name}
                    {project.language && (
                      <span className="badge badge-accent" style={{ marginLeft: '8px' }}>
                        {project.language}
                      </span>
                    )}
                  </div>
                  <div className={styles.projectEditActions}>
                    <button
                      type="button"
                      onClick={() => generateAIProjectDesc(i, project)}
                      disabled={generatingDesc[i]}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '6px 12px', display: 'flex', alignItems: 'center' }}
                    >
                      {generatingDesc[i] ? (
                        <>
                          <div className="spinner" style={{ width: '12px', height: '12px', marginRight: '6px' }} />
                          Generating...
                        </>
                      ) : (
                        <>
                          <SparklesIcon /> AI Rewrite
                        </>
                      )}
                    </button>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    className="textarea"
                    value={project.description}
                    onChange={(e) => updateProjectDescription(i, e.target.value)}
                    placeholder="Describe this project..."
                    rows={3}
                    style={{ minHeight: '80px' }}
                  />
                </div>
              </div>
            );
          })}
          {featuredProjects.length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
              No projects selected. Check repositories above to showcase them.
            </p>
          )}
        </div>

        {/* Spacer for sticky bar */}
        <div style={{ height: '80px' }} />
      </div>

      {/* Sticky Save Bar */}
      <div className={styles.saveBar}>
        <div className="container-sm" style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            id="save-portfolio-btn"
            onClick={handleSave}
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="spinner" />
                Saving...
              </>
            ) : (
              '💾 Save Changes'
            )}
          </button>
          <button
            id="view-final-btn"
            onClick={viewPortfolio}
            className="btn btn-secondary"
          >
            👁 View Portfolio
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={styles.saveToast}>{toast}</div>
      )}
    </div>
  );
}
