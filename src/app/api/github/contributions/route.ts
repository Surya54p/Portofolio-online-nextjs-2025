import { NextResponse } from "next/server";
interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

const GITHUB_API = "https://api.github.com/graphql";
const USERNAME = "surya54p"; // ganti dengan username GitHub kamu

const QUERY = `
query($from: DateTime!, $to: DateTime!) {
  user(login: "${USERNAME}") {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

function startOfYearIso(year: number) {
  return new Date(Date.UTC(year, 0, 1)).toISOString();
}
function nowIso() {
  return new Date().toISOString();
}

export async function GET() {
  const year = new Date().getFullYear();
  const from = startOfYearIso(year);
  const to = nowIso();

  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { from, to } }),
    cache: "no-store",
  });

  const json = await res.json();

  const weeks: Week[] = json.data.user.contributionsCollection.contributionCalendar.weeks;
  const days: ContributionDay[] = weeks.flatMap((w) => w.contributionDays);

  return NextResponse.json(days);
}
