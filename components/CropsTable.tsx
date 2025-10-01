import React from "react";
import { Crop } from "@/lib/farms";
import Table, { TableColumn } from "./Table";

interface CropsTableProps {
  crops: Crop[];
}

export default function CropsTable({ crops }: CropsTableProps) {
  const columns: TableColumn<Crop>[] = [
    {
      key: "crop_name",
      label: "Crop Name",
      type: "text",
    },
    {
      key: "season",
      label: "Season",
      type: "text",
    },
    {
      key: "area_planted",
      label: "Area Planted",
      type: "acreage",
    },
    {
      key: "expected_yield",
      label: "Expected Yield",
      type: "yield",
    },
    {
      key: "actual_yield",
      label: "Actual Yield",
      type: "yield",
    },
    {
      key: "yieldVariance",
      label: "Yield Variance",
      type: "yieldVariance",
      actualKey: "actual_yield",
      expectedKey: "expected_yield",
    },
    {
      key: "price_per_kg",
      label: "Price per kg",
      type: "pricePerKg",
    },
    {
      key: "status",
      label: "Status",
      type: "status",
    },
  ];

  return (
    <Table
      data={crops}
      columns={columns}
      keyField="crop_name"
      emptyMessage="No crops available"
      hoverable={false}
    />
  );
}
