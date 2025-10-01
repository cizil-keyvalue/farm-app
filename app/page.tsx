import FarmsTable from "@/components/FarmsTable";
import MetricsOverview from "@/components/MetricsOverview";
import Link from "next/link";
import RefreshButton from "@/components/RefreshButton";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/farms`, {
    next: { revalidate: 30, tags: ["farms"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch farms data");
  }

  const farms = await response.json();

  return (
    <div>
      <div className="mb-10 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Farms Dashboard
          </h2>
          <p className="text-gray-600">Manage and view all farm information</p>
        </div>
        <div className="flex gap-3">
          <RefreshButton farmId={""} />
          <Link
            href="/farms/add"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center gap-2"
          >
            Add Farm
          </Link>
        </div>
      </div>
      <MetricsOverview farms={farms} />
      <FarmsTable farms={farms} />
    </div>
  );
}
