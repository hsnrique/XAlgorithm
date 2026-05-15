export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xalgorithm.xyz";

export const SITE_NAME = "X Algorithm";

export const CREATOR_NAME = "Henrique Martins";

export const CREATOR_GITHUB = "https://github.com/hsnrique";

export const X_ALGORITHM_REPO = "https://github.com/xai-org/x-algorithm";

export function githubFileUrl(path: string): string {
  return `${X_ALGORITHM_REPO}/tree/main/${path.replace(/\/$/, "")}`;
}
