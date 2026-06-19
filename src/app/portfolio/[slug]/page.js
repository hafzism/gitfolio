import PortfolioView from './PortfolioView';

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/portfolio/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      return { title: 'Portfolio Not Found — Gitfolio' };
    }
    const data = await res.json();
    return {
      title: `${data.name} — Developer Portfolio | Gitfolio`,
      description: data.headline || `${data.name}'s developer portfolio generated from GitHub`,
      openGraph: {
        title: `${data.name} — Developer Portfolio`,
        description: data.headline || `Check out ${data.name}'s developer portfolio`,
        images: data.avatarUrl ? [{ url: data.avatarUrl }] : [],
      },
    };
  } catch {
    return { title: 'Portfolio — Gitfolio' };
  }
}

export default async function PortfolioPage({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  let portfolio = null;
  try {
    const res = await fetch(`${baseUrl}/api/portfolio/${slug}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      portfolio = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch portfolio:', err);
  }

  return <PortfolioView portfolio={portfolio} langColors={LANG_COLORS} />;
}
