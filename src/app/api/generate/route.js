import { NextResponse } from 'next/server';
import { fetchGitHubData } from '@/lib/github';
import { generatePortfolioContent } from '@/lib/groq';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().replace(/^@/, '');

    // 1. Fetch GitHub data
    let githubData;
    try {
      githubData = await fetchGitHubData(cleanUsername);
    } catch (err) {
      return NextResponse.json(
        { error: err.message || 'Failed to fetch GitHub data' },
        { status: 404 }
      );
    }

    // 2. Generate AI content
    let aiContent;
    try {
      aiContent = await generatePortfolioContent(githubData);
    } catch (err) {
      console.error('AI generation error:', err);
      // Fallback if AI fails
      aiContent = {
        headline: `${githubData.profile.name || cleanUsername} — Software Developer`,
        bio: githubData.profile.bio || 'A passionate software developer.',
        skills: githubData.languages.map(l => l.language),
        projectDescriptions: {},
      };
    }

    // 3. Merge AI content with GitHub data to build portfolio
    const projects = githubData.repos.map((repo, idx) => ({
      name: repo.name,
      description: aiContent.projectDescriptions?.[repo.name] || repo.description || '',
      url: repo.url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stars,
      forks: repo.forks,
      topics: repo.topics,
      featured: idx < 6, // default to top 6 projects
    }));

    // 4. Build the slug
    const slug = cleanUsername.toLowerCase();

    // 5. Identify missing fields
    const missingFields = [];
    if (!githubData.profile.name) missingFields.push('name');
    if (!githubData.profile.email) missingFields.push('email');
    if (!githubData.profile.location) missingFields.push('location');
    if (!githubData.profile.blog) missingFields.push('website');
    if (!githubData.profile.twitter) missingFields.push('twitter');

    // 6. Create or update portfolio in DB
    const portfolioData = {
      slug,
      githubUsername: cleanUsername,
      name: githubData.profile.name || cleanUsername,
      avatarUrl: githubData.profile.avatarUrl,
      headline: aiContent.headline,
      bio: aiContent.bio,
      location: githubData.profile.location || '',
      email: githubData.profile.email || '',
      website: githubData.profile.blog || '',
      twitter: githubData.profile.twitter || '',
      linkedin: '',
      githubUrl: githubData.profile.htmlUrl,
      skills: JSON.stringify(aiContent.skills || []),
      projects: JSON.stringify(projects),
      stats: JSON.stringify(githubData.stats),
      experience: JSON.stringify({
        orgs: githubData.orgs,
        recentActivity: githubData.recentActivity,
        accountAge: githubData.stats.accountAge,
        topics: githubData.topics,
      }),
    };

    const portfolio = await prisma.portfolio.upsert({
      where: { slug },
      update: portfolioData,
      create: portfolioData,
    });

    return NextResponse.json({
      portfolio,
      missingFields,
      slug,
    });
  } catch (err) {
    console.error('Generate API error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
