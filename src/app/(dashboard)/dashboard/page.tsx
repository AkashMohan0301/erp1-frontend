// app/(dashboard)/dashboard/page.tsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProvidersClient } from "@/components/providers/providersClient";
import { ProvidersServer } from "@/components/providers/providersServer";
import { apiQueries } from "@/lib/apiQueries";

export default async function DashboardPage() {
  // const dehydratedState = await ProvidersServer(async (qc) => {
  //   await qc.prefetchQuery(apiQueries.dashboardStats().queryKey, apiQueries.dashboardStats().queryFn);
  // });

  return (
    <ProvidersClient dehydratedState={null}>
      <DashboardLayout>
        <div>
          <h1 className="text-xl font-semibold">Dashboard Overview</h1>
          <p>Server-prefetched and hydrated with React Query v5</p>
        </div>
      </DashboardLayout>
    </ProvidersClient>
  );
}
