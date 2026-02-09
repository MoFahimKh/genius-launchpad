import { Container } from "@/components/layout/Container";
import { mockLaunchpadColumns } from "@/features/launchpad/data/mockLaunchpadColumns";
import { LaunchpadColumn } from "@/features/launchpad/components/LaunchpadColumn";
import { LaunchpadsHeader } from "@/features/launchpad/components/LaunchpadsHeader";

export function LaunchpadsPage() {
  return (
    <Container>
      <div className="relative py-6">
        <LaunchpadsHeader />
        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-0">
          {mockLaunchpadColumns.map((column, index) => (
            <LaunchpadColumn key={column.id} column={column} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </Container>
  );
}
