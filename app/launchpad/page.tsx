import { Suspense } from "react";
import { LaunchpadsPage } from "@/features/launchpad/components/LaunchpadsPage";

export default function LaunchpadRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LaunchpadsPage />
    </Suspense>
  );
}
