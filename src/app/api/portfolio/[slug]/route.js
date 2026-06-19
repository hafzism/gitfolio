import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET portfolio by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { slug },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const parsed = {
      ...portfolio,
      skills: JSON.parse(portfolio.skills || '[]'),
      projects: JSON.parse(portfolio.projects || '[]'),
      stats: JSON.parse(portfolio.stats || '{}'),
      experience: JSON.parse(portfolio.experience || '{}'),
    };

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('Get portfolio error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update portfolio
export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const updates = await request.json();

    // Find existing
    const existing = await prisma.portfolio.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Prepare update data - stringify JSON fields if provided as objects
    const updateData = {};
    const stringFields = ['name', 'headline', 'bio', 'location', 'email', 'website', 'twitter', 'linkedin', 'githubUrl', 'avatarUrl'];
    const jsonFields = ['skills', 'projects', 'stats', 'experience'];

    stringFields.forEach(field => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    });

    jsonFields.forEach(field => {
      if (updates[field] !== undefined) {
        updateData[field] = typeof updates[field] === 'string'
          ? updates[field]
          : JSON.stringify(updates[field]);
      }
    });

    const portfolio = await prisma.portfolio.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({
      ...portfolio,
      skills: JSON.parse(portfolio.skills || '[]'),
      projects: JSON.parse(portfolio.projects || '[]'),
      stats: JSON.parse(portfolio.stats || '{}'),
      experience: JSON.parse(portfolio.experience || '{}'),
    });
  } catch (err) {
    console.error('Update portfolio error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
