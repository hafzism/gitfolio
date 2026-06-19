import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Use Groq AI to generate polished headline, bio, and skills.
 * Project descriptions are intentionally excluded — users write those themselves
 * and can use the "AI Rewrite" button per-project on the edit page.
 */
export async function generatePortfolioContent(githubData) {
  const { profile, repos, languages, topics, orgs, stats } = githubData;

  const prompt = `You are a professional portfolio writer for software developers.
Based on the GitHub data below, generate portfolio content as valid JSON.

GitHub Data:
- Username: ${profile.login}
- Name: ${profile.name || 'Not provided'}
- Bio: ${profile.bio || 'Not provided'}
- Location: ${profile.location || 'Not provided'}
- Company: ${profile.company || 'Not provided'}
- Account Age: ${stats.accountAge} years
- Public Repos: ${stats.totalRepos}
- Total Stars: ${stats.totalStars}
- Followers: ${stats.followers}

Top Languages: ${languages.slice(0, 8).map(l => `${l.language}`).join(', ')}
Topics: ${topics.slice(0, 10).join(', ') || 'None'}
Organizations: ${orgs.map(o => o.login).join(', ') || 'None'}
Top Repos: ${repos.slice(0, 6).map(r => r.name).join(', ')}

Return ONLY a JSON object with these three fields:
{
  "headline": "one-line tagline under 80 characters",
  "bio": "two-sentence professional bio in third person, no apostrophes",
  "skills": ["skill1", "skill2", "skill3"]
}

Rules:
- headline must be a JSON string (quoted, no special chars)
- bio must be a JSON string with NO apostrophes (use words like "does not" instead of "doesnt")
- skills should have 8 to 15 items
- Output raw JSON only, no markdown, no code fences`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5,
    max_tokens: 800,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content returned from Groq AI');
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error('Failed to parse AI response as JSON');
  }
}
