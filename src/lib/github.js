/**
 * Fetch maximum public GitHub data for a given username.
 * Uses GitHub REST API v3.
 */

const GITHUB_API = 'https://api.github.com';

function getHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Gitfolio-App',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchGitHubData(username) {
  // Fetch user profile
  const profile = await fetchJSON(`${GITHUB_API}/users/${username}`);
  if (!profile) {
    throw new Error(`GitHub user "${username}" not found`);
  }

  // Fetch repos (up to 100, sorted by stars)
  const repos = await fetchJSON(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=stars&direction=desc&type=owner`
  ) || [];

  // Fetch recent events for contribution activity
  const events = await fetchJSON(
    `${GITHUB_API}/users/${username}/events/public?per_page=100`
  ) || [];

  // Fetch organizations
  const orgs = await fetchJSON(
    `${GITHUB_API}/users/${username}/orgs`
  ) || [];

  // Fetch gists count
  const gists = await fetchJSON(
    `${GITHUB_API}/users/${username}/gists?per_page=1`
  ) || [];

  // Extract languages from repos
  const languageCount = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  // Sort languages by frequency
  const topLanguages = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .map(([lang, count]) => ({ language: lang, count }));

  // Extract topics/tags from repos
  const topicCount = {};
  repos.forEach(repo => {
    if (repo.topics) {
      repo.topics.forEach(topic => {
        topicCount[topic] = (topicCount[topic] || 0) + 1;
      });
    }
  });

  const topTopics = Object.entries(topicCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([topic]) => topic);

  // Calculate stats
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  // Get top repos (by stars, non-forked)
  const topRepos = repos
    .filter(r => !r.fork)
    .slice(0, 30)
    .map(repo => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      isArchived: repo.archived,
    }));

  // Contribution activity summary from events
  const recentActivity = events.slice(0, 20).map(event => ({
    type: event.type,
    repo: event.repo?.name,
    createdAt: event.created_at,
  }));

  return {
    profile: {
      login: profile.login,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      bio: profile.bio,
      location: profile.location,
      email: profile.email,
      blog: profile.blog,
      twitter: profile.twitter_username,
      company: profile.company,
      hireable: profile.hireable,
      publicRepos: profile.public_repos,
      publicGists: profile.public_gists,
      followers: profile.followers,
      following: profile.following,
      createdAt: profile.created_at,
      htmlUrl: profile.html_url,
    },
    repos: topRepos,
    languages: topLanguages,
    topics: topTopics,
    orgs: orgs.map(o => ({ login: o.login, avatarUrl: o.avatar_url, description: o.description })),
    stats: {
      totalRepos: profile.public_repos,
      totalStars,
      totalForks,
      totalGists: profile.public_gists,
      followers: profile.followers,
      following: profile.following,
      accountAge: Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
    },
    recentActivity,
  };
}
