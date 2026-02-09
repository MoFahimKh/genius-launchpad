import { ReactNode } from "react";

export function SectionCard({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
      {children}
    </section>
  );
}
