import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function HomePage() {
  return (
    <Container>
      <div className="flex min-h-[60vh] items-center justify-center">
        <Link
          href="/launchpad"
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-sm font-semibold text-[var(--text)]"
        >
          Open Launchpads
        </Link>
      </div>
    </Container>
  );
}
