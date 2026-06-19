import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Use Groq AI to generate polished portfolio content from GitHub data.
 */
export async function generatePortfolioContent(githubData) {
  const { profile, repos, languages, topics, orgs, stats } = githubData;

  const prompt = `You are a professional portfolio writer for software developers. Based on the following GitHub data, generate polished portfolio content.

## GitHub Profile Data:
- Username: ${profile.login}
- Name: ${profile.name || 'Not provided'}
- Bio: ${profile.bio || 'Not provided'}
- Location: ${profile.location || 'Not provided'}
- Company: ${profile.company || 'Not provided'}
- Blog/Website: ${profile.blog || 'Not provided'}
- Twitter: ${profile.twitter || 'Not provided'}
- Account Age: ${stats.accountAge} years
- Public Repos: ${stats.totalRepos}
- Total Stars: ${stats.totalStars}
- Total Forks: ${stats.totalForks}
- Followers: ${stats.followers}

## Top Languages:
${languages.slice(0, 10).map(l => `- ${l.language} (${l.count} repos)`).join('\n')}

## Top Topics/Tags:
${topics.slice(0, 15).join(', ') || 'None'}

## Organizations:
${orgs.map(o => o.login).join(', ') || 'None'}

## Top Repositories:
${repos.slice(0, 8).map(r => `- ${r.name}: ${r.description || 'No description'} (⭐${r.stars}, ${r.language || 'Various'})`).join('\n')}

Generate a JSON response with EXACTLY this structure (no markdown, no code fences, just pure JSON):
{
  "headline": "A compelling one-line headline/tagline for this developer (max 80 chars, no quotes around it)",
  "bio": "A professional 2-3 paragraph bio written in first person. Make it engaging, highlight their strengths based on the data. If they have a bio, expand on it. If not, craft one from their repos and activity. Include what technologies they work with and what kind of developer they are.",
  "skills": ["skill1", "skill2", "..."],
  "projectDescriptions": {
    "repo_name": "A polished 1-2 sentence description for this project. If the repo already has a description, enhance it. If not, infer from the name and language."
  }
}

For skills: Extract from languages, topics, and repo names/descriptions. Include frameworks, tools, and technologies. Aim for 10-20 skills, ordered by relevance.

For projectDescriptions: Provide enhanced descriptions for each of these repos: ${repos.slice(0, 8).map(r => r.name).join(', ')}

Make the content sound professional but approachable. Avoid generic filler text.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('Failed to generate content from Groq AI');
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error('Failed to parse AI response as JSON');
  }
}
