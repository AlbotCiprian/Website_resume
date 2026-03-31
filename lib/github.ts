export type GithubEventType =
  | "push"
  | "pull_request"
  | "issue"
  | "fork"
  | "star"
  | "create"
  | "release"
  | "other";

export type GithubEventItem = {
  id: string;
  type: GithubEventType;
  title: string;
  repo: string;
  url: string;
  createdAt: string;
};

type GithubEventResponse = {
  id: string;
  type: string;
  repo?: {
    name?: string;
  };
  created_at: string;
  payload?: {
    ref_type?: string;
    action?: string;
    commits?: Array<{ message?: string }>;
    pull_request?: { html_url?: string; title?: string };
    issue?: { html_url?: string; title?: string };
    release?: { html_url?: string; name?: string };
  };
};

const githubUser = "AlbotCiprian";
const githubUnavailableMessage = "GitHub activity is temporarily unavailable.";

function eventUrl(event: GithubEventResponse): string {
  const repoName = event.repo?.name;

  if (event.type === "PullRequestEvent") {
    return event.payload?.pull_request?.html_url ?? `https://github.com/${repoName}`;
  }

  if (event.type === "IssuesEvent") {
    return event.payload?.issue?.html_url ?? `https://github.com/${repoName}`;
  }

  if (event.type === "ReleaseEvent") {
    return event.payload?.release?.html_url ?? `https://github.com/${repoName}`;
  }

  if (!repoName) {
    return `https://github.com/${githubUser}`;
  }

  return `https://github.com/${repoName}`;
}

function normalizeType(type: string): GithubEventType {
  switch (type) {
    case "PushEvent":
      return "push";
    case "PullRequestEvent":
      return "pull_request";
    case "IssuesEvent":
      return "issue";
    case "ForkEvent":
      return "fork";
    case "WatchEvent":
      return "star";
    case "CreateEvent":
      return "create";
    case "ReleaseEvent":
      return "release";
    default:
      return "other";
  }
}

function normalizeTitle(event: GithubEventResponse): string {
  const repo = event.repo?.name ?? "repository";

  switch (event.type) {
    case "PushEvent": {
      const count = event.payload?.commits?.length ?? 0;
      if (count > 0) {
        return `Pushed ${count} commit${count > 1 ? "s" : ""} to ${repo}`;
      }
      return `Pushed code updates to ${repo}`;
    }
    case "PullRequestEvent": {
      const action = event.payload?.action ?? "updated";
      return `${action[0]?.toUpperCase() ?? "U"}${action.slice(1)} pull request in ${repo}`;
    }
    case "IssuesEvent": {
      const action = event.payload?.action ?? "updated";
      return `${action[0]?.toUpperCase() ?? "U"}${action.slice(1)} issue in ${repo}`;
    }
    case "ForkEvent":
      return `Forked ${repo}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    case "CreateEvent":
      return `Created ${event.payload?.ref_type ?? "resource"} in ${repo}`;
    case "ReleaseEvent":
      return `Published a release in ${repo}`;
    default:
      return `Activity in ${repo}`;
  }
}

export function normalizeGithubEvents(events: GithubEventResponse[]): GithubEventItem[] {
  return events.map((event) => ({
    id: event.id,
    type: normalizeType(event.type),
    title: normalizeTitle(event),
    repo: event.repo?.name ?? "unknown-repository",
    url: eventUrl(event),
    createdAt: event.created_at,
  }));
}

export async function fetchGithubEvents(limit = 10): Promise<GithubEventItem[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "albot-portfolio",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${githubUser}/events/public?per_page=20`,
    {
      headers,
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    let upstreamMessage: string | undefined;
    let documentationUrl: string | undefined;

    try {
      const errorPayload = (await response.json()) as {
        message?: string;
        documentation_url?: string;
      };
      upstreamMessage = errorPayload.message;
      documentationUrl = errorPayload.documentation_url;
    } catch {
      upstreamMessage = undefined;
      documentationUrl = undefined;
    }

    console.error("[github] upstream request failed", {
      status: response.status,
      user: githubUser,
      tokenConfigured: Boolean(token),
      rateLimitLimit: response.headers.get("x-ratelimit-limit"),
      rateLimitRemaining: response.headers.get("x-ratelimit-remaining"),
      rateLimitReset: response.headers.get("x-ratelimit-reset"),
      rateLimitResource: response.headers.get("x-ratelimit-resource"),
      upstreamMessage,
      documentationUrl,
    });

    throw new Error(githubUnavailableMessage);
  }

  const rawEvents = (await response.json()) as GithubEventResponse[];
  return normalizeGithubEvents(rawEvents).slice(0, limit);
}
