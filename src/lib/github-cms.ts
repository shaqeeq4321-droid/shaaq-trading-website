/**
 * Minimal GitHub-backed CMS. Reads and writes files straight to this repo via
 * the GitHub REST API, using a personal access token the admin pastes in once
 * (kept only in this browser's localStorage, never committed to the repo).
 *
 * This is how the car gallery is edited: the admin page reads
 * src/data/cars.json from the repo, lets you add/edit/delete listings and
 * toggle In Stock / Sold, then "Publish" commits the updated file (and any
 * new photos) straight to the main branch.
 */

const OWNER = import.meta.env.VITE_GITHUB_OWNER as string | undefined;
const REPO = import.meta.env.VITE_GITHUB_REPO as string | undefined;
const BRANCH = (import.meta.env.VITE_GITHUB_BRANCH as string | undefined) || "main";

const TOKEN_KEY = "shaaq_admin_github_token";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setStoredToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isConfigured() {
  return Boolean(OWNER && REPO);
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  };
}

async function api(path: string, token: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    ...init,
    headers: { ...authHeaders(token), ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status}: ${body || res.statusText}`);
  }
  return res;
}

/** Verifies the token can read this specific repo. */
export async function verifyToken(token: string) {
  await api("", token);
}

/** Reads a text file's content + sha (sha is required to update it). */
export async function getFile(filePath: string, token: string): Promise<{ content: string; sha: string } | null> {
  try {
    const res = await api(`/contents/${filePath}?ref=${BRANCH}`, token);
    const json = await res.json();
    const content = atob((json.content as string).replace(/\n/g, ""));
    return { content, sha: json.sha as string };
  } catch {
    return null;
  }
}

/** Creates or updates a text file. */
export async function putTextFile(filePath: string, content: string, message: string, token: string, sha?: string) {
  await api(`/contents/${filePath}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
}

/** Creates (or overwrites) a binary file from a base64 string (no sha needed for a new path). */
export async function putBinaryFile(filePath: string, base64: string, message: string, token: string) {
  await api(`/contents/${filePath}`, token, {
    method: "PUT",
    body: JSON.stringify({ message, content: base64, branch: BRANCH }),
  });
}

export const CARS_JSON_PATH = "src/data/cars.json";
export const CARS_IMAGE_DIR = "public/cars";
export const repoConfigured = { owner: OWNER, repo: REPO, branch: BRANCH };
