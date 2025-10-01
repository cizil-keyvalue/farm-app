import React from "react";

import { formatNumber, formatYield, formatAcreage } from "@/lib/formatting";
import { Farm } from "../lib/farms";

interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
}

interface MetricsOverviewProps {
  farms: Farm[];
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

export default function MetricsOverview({ farms }: MetricsOverviewProps) {
  // Calculate metrics
  const totalFarms = farms.length;

  const totalAcreage = farms.reduce((sum, farm) => sum + farm.total_acreage, 0);

  const totalAnnualYield = farms.reduce(
    (sum, farm) => sum + farm.annual_yield,
    0
  );

  const averageYieldPerAcre =
    totalAcreage > 0 ? (totalAnnualYield / totalAcreage).toFixed(0) : 0;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Farms"
          value={formatNumber(totalFarms)}
          icon="🌾"
        />
        <MetricCard
          title="Total Acreage"
          value={formatAcreage(totalAcreage)}
          icon="🗺️"
        />
        <MetricCard
          title="Total Annual Yield"
          value={formatYield(totalAnnualYield)}
          icon="📦"
        />
        <MetricCard
          title="Avg Yield per Acre"
          value={`${formatNumber(Number(averageYieldPerAcre))} kg`}
          icon="📊"
        />
      </div>
    </div>
  );
}
