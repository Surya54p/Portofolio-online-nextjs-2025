import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com/graphql";
const USERNAME = "surya54p";

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER) {
        nodes {
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
    cache: "no-store",
  });

  const json = await res.json();
  // debug
  // console.log(JSON.stringify(json, null, 2));

  const repos = json.data?.user?.repositories?.nodes ?? [];

  const langStats: Record<string, { size: number; color: string | null }> = {};

  repos.forEach((repo: any) => {
    repo.languages.edges.forEach((lang: any) => {
      const { name, color } = lang.node;
      if (!langStats[name]) {
        langStats[name] = { size: 0, color };
      }
      langStats[name].size += lang.size;
    });
  });

  const languages = Object.entries(langStats)
    .map(([name, { size, color }]) => ({ name, value: size, color }))
    .sort((a, b) => b.value - a.value);

  return NextResponse.json(languages);
}
