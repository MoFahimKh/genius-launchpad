import { Container } from "@/components/layout/Container";
import { SwapPanel } from "@/features/swap/components/SwapPanel";
import { TrendingTokensStrip } from "@/features/tokens/components/TrendingTokensStrip";
import { TokenTable } from "@/features/tokens/components/TokenTable";

export default function HomePage() {
  return (
    <Container>
      <div className="grid gap-6 py-8">
        <SwapPanel />
        <TrendingTokensStrip />
        <TokenTable />
      </div>
    </Container>
  );
}
