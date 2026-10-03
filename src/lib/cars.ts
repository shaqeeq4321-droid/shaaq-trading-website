import seedCars from "@/data/cars.json";
import { repoConfigured } from "@/lib/github-cms";

export type CarListing = {
  id: string;
  title: string;
  year: string;
  price: string;
  mileage: string;
  description: string;
  images: string[];
  status: "in-stock" | "sold";
  createdAt: string;
};

/**
 * Loads the car gallery. Tries the live file on GitHub first (so a
 * publish from the admin page shows up immediately, without waiting on a
 * rebuild), and falls back to the copy bundled at build time if that's
 * unreachable (e.g. the repo isn't configured yet, or is private).
 */
export async function loadCars(): Promise<CarListing[]> {
  const { owner, repo, branch } = repoConfigured;
  if (owner && repo) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/src/data/cars.json`,
        { cache: "no-store" },
      );
      if (res.ok) return (await res.json()) as CarListing[];
    } catch {
      // fall through to bundled data
    }
  }
  return seedCars as CarListing[];
}
