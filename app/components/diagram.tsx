type Props = {
  title: string;
  nodes: readonly [string, string, string, string, string];
};

export function Diagram({ title, nodes }: Props) {
  return (
    <section
      aria-labelledby="diagram-title"
      className="mb-16 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800 sm:p-8"
    >
      <h2
        id="diagram-title"
        className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500"
      >
        {title}
      </h2>
      <ol className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2">
        {nodes.map((label, i) => (
          <DiagramItem key={label} label={label} index={i} total={nodes.length} />
        ))}
      </ol>
    </section>
  );
}

function DiagramItem({
  label,
  index,
  total,
}: {
  label: string;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;
  return (
    <>
      <li className="flex-1 rounded-md border border-zinc-300 bg-zinc-50 px-3 py-3 text-center text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
        {label}
      </li>
      {!isLast && (
        <span
          aria-hidden="true"
          className="self-center text-zinc-400 sm:text-base"
        >
          <span className="sm:hidden">↓</span>
          <span className="hidden sm:inline">→</span>
        </span>
      )}
    </>
  );
}
