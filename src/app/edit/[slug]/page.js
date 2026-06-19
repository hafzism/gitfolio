import EditPortfolio from './EditPortfolio';

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

  return <EditPortfolio portfolio={portfolio} slug={slug} showMissing={showMissing} />;
}
