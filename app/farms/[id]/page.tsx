import Link from "next/link";
import ItemsSection from "@/components/ItemsSection";
import FarmDetailCard from "@/components/FarmDetailCard";
import CropsTable from "@/components/CropsTable";
import RefreshButton from "@/components/RefreshButton";
import { notFound } from "next/navigation";
import { formatDate, formatAcreage, formatYield } from "@/lib/formatting";

interface FarmDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FarmDetailPage({ params }: FarmDetailPageProps) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/farms/${id}`, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch farm data");
  }

  const farm = await response.json();

  const farmDetails = [
    {
      title: "Owner",
      value: farm.owner,
      iconColor: "blue" as const,
      iconPath:
        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Total Acreage",
      value: formatAcreage(farm.total_acreage),
      iconColor: "green" as const,
      iconPath:
        "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Annual Yield",
      value: formatYield(farm.annual_yield),
      iconColor: "yellow" as const,
      iconPath:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Farms Dashboard
        </Link>
        <RefreshButton farmId={id} />
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {farm.farm_name}
        </h1>
        <p className="text-xl text-gray-600">{farm.location}</p>
        <p className="text-sm text-gray-500 mt-1">
          Established: {formatDate(farm.established_date)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {farmDetails.map((detail, index) => (
          <FarmDetailCard
            key={index}
            title={detail.title}
            value={detail.value}
            iconColor={detail.iconColor}
            iconPath={detail.iconPath}
          />
        ))}
      </div>
      <ItemsSection items={farm.active_crops} title="Active Crops" />
      <ItemsSection
        items={farm.certifications}
        title="Certifications"
        variant="certifications"
      />

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Crop Details
        </h3>
        <CropsTable crops={farm.crops} />
      </div>
    </div>
  );
}
