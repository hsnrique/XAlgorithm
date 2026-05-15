import { githubFileUrl } from "../lib/site";

type Props = {
  paths: string;
};

export function FilePaths({ paths }: Props) {
  const parts = paths.split(" · ").map((p) => p.trim()).filter(Boolean);
  return (
    <span className="font-mono text-xs text-zinc-500">
      {parts.map((path, i) => (
        <span key={path}>
          <a
            href={githubFileUrl(path)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-600 dark:decoration-zinc-700 dark:hover:decoration-zinc-400"
          >
            {path}
          </a>
          {i < parts.length - 1 && " · "}
        </span>
      ))}
    </span>
  );
}
