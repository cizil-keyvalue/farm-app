import React from "react";

import Table, { TableColumn } from "./Table";
import { Farm } from "../lib/farms";

interface FarmsTableProps {
  farms: Farm[];
}

export default function FarmsTable({ farms }: FarmsTableProps) {
  const columns: TableColumn<Farm>[] = [
    {
      key: "farm_name",
      label: "Farm Name",
      type: "link",
      linkHref: (item) => `/farms/${item.id}`,
    },
    {
      key: "location",
      label: "Location",
      type: "text",
    },
    {
      key: "owner",
      label: "Owner",
      type: "text",
    },
    {
      key: "total_acreage",
      label: "Total Acreage",
      type: "acreage",
    },
    {
      key: "active_crops",
      label: "Active Crops",
      type: "array",
    },
    {
      key: "annual_yield",
      label: "Annual Yield",
      type: "yield",
    },
    {
      key: "established_date",
      label: "Established",
      type: "date",
    },
  ];

  return (
    <Table
      data={farms}
      columns={columns}
      keyField="id"
      emptyMessage="No farms available"
    />
  );
}
