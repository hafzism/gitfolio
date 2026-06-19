import EditPortfolio from './EditPortfolio';
import prisma from '@/lib/prisma';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Edit Portfolio — ${slug} | Gitfolio`,
    description: `Edit your developer portfolio for ${slug}`,
  };
}

export default async function EditPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const showMissing = resolvedSearchParams?.complete === 'true';

  let portfolio = null;
  try {
    // Direct DB query — avoids localhost fetch that fails on Vercel
    const raw = await prisma.portfolio.findUnique({ where: { slug } });
    if (raw) {
      portfolio = {
        ...raw,
        skills: JSON.parse(raw.skills || '[]'),
        projects: JSON.parse(raw.projects || '[]'),
        stats: JSON.parse(raw.stats || '{}'),
        experience: JSON.parse(raw.experience || '{}'),
      };
    }
  } catch (err) {
    console.error('Failed to fetch portfolio from DB:', err);
  }

  return <EditPortfolio portfolio={portfolio} slug={slug} showMissing={showMissing} />;
}
