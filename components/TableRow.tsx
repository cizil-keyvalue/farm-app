import Link from "next/link";
import React from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  type?: "text" | "link" | "number" | "array" | "currency" | "date" | "percentage" | "yield" | "acreage" | "pricePerKg" | "yieldVariance" | "status";
  linkHref?: (item: T) => string;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
  value?: (item: T) => string;
  actualKey?: keyof T | string;
  expectedKey?: keyof T | string;
}

export interface TableRowProps<T> {
  item: T;
  columns: TableColumn<T>[];
  keyField: keyof T;
  index: number;
  rowClassName?: string;
  hoverable?: boolean;
  striped?: boolean;
  onRowClick?: (item: T) => void;
  renderCell: (
    column: TableColumn<T>,
    value: unknown,
    item: T
  ) => React.ReactNode;
  linkHref?: string;
}

export default function TableRow<T>({
  item,
  columns,
  keyField,
  index,
  rowClassName = "",
  hoverable = true,
  striped = false,
  onRowClick,
  linkHref,
  renderCell,
}: TableRowProps<T>) {

  const getValue = (item: T, key: keyof T | string) => {
    if (typeof key === "string" && key.includes(".")) {
      return key
        .split(".")
        .reduce(
          (obj: unknown, k) => (obj as Record<string, unknown>)?.[k],
          item
        );
    }
    return item[key as keyof T];
  };

  const rowClasses = `
    ${striped && index % 2 === 1 ? "bg-gray-50" : "bg-white"}
    ${hoverable ? "hover:bg-gray-50 transition-colors duration-150" : ""}
    ${onRowClick || linkHref ? "cursor-pointer" : ""}
    ${rowClassName}
  `.trim();

  const renderCellContent = (column: TableColumn<T>) => {
    const cellContent = renderCell(column, getValue(item, column.key), item);
    
    if (linkHref && column.type !== 'link') {
      return (
        <Link href={linkHref} className="contents">
          {cellContent}
        </Link>
      );
    }
    
    return cellContent;
  };

  return (
    <tr key={String(getValue(item, keyField))} className={rowClasses}>
      {columns.map((column) => (
        <td
          key={String(column.key)}
          className={`
            px-8 py-4 whitespace-nowrap
            ${column.className || ""}
          `.trim()}
        >
          {renderCellContent(column)}
        </td>
      ))}
    </tr>
  );
}
