import PortfolioView from './PortfolioView';
import prisma from '@/lib/prisma';

// Language colors map for dots
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Lua: '#000080',
  R: '#198CE7',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Jupyter: '#DA5B0B',
};

async function getPortfolio(slug) {
  try {
    const raw = await prisma.portfolio.findUnique({ where: { slug } });
    if (!raw) return null;
    return {
      ...raw,
      skills: JSON.parse(raw.skills || '[]'),
      projects: JSON.parse(raw.projects || '[]'),
      stats: JSON.parse(raw.stats || '{}'),
      experience: JSON.parse(raw.experience || '{}'),
    };
  } catch (err) {
    console.error('Failed to fetch portfolio from DB:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPortfolio(slug);

  if (!data) return { title: 'Portfolio Not Found — Gitfolio' };

  return {
    title: `${data.name} — Developer Portfolio | Gitfolio`,
    description: data.headline || `${data.name}'s developer portfolio generated from GitHub`,
    openGraph: {
      title: `${data.name} — Developer Portfolio`,
      description: data.headline || `Check out ${data.name}'s developer portfolio`,
      images: data.avatarUrl ? [{ url: data.avatarUrl }] : [],
    },
  };
}

export default async function PortfolioPage({ params }) {
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);

  return <PortfolioView portfolio={portfolio} langColors={LANG_COLORS} />;
}
