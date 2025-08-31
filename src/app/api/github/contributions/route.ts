import { NextResponse } from "next/server";

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
function startOfMonthIso(year: number, month: number) {
  return new Date(Date.UTC(year, month, 1)).toISOString();
}
function nowIso() {
  return new Date().toISOString();
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

export async function GET() {
  const year = new Date().getFullYear();
  const from = startOfYearIso(year);
  const to = nowIso();
  const now = new Date();

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

  const total = days.reduce((sum, d) => sum + d.contributionCount, 0);
  const monthStart = startOfMonthIso(year, now.getMonth());
  const yearStart = startOfYearIso(year);

  const thisYear = days
    .filter((d) => d.date >= yearStart && d.date <= nowIso())
    .reduce((sum, d) => sum + d.contributionCount, 0);

  const thisMonth = days
    .filter((d) => d.date >= monthStart && d.date <= nowIso())
    .reduce((sum, d) => sum + d.contributionCount, 0);

  return NextResponse.json({
    days,
    thisMonth,
    thisYear,
    total,
  });
}
