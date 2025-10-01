import React from 'react';
import TableRow from './TableRow';
import Link from 'next/link';
import { 
  formatCurrency, 
  formatNumber, 
  formatDate, 
  formatPercentage,
  formatYield,
  formatAcreage,
  formatPricePerKg,
  formatYieldVariance
} from '@/lib/formatting';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  type?: 'text' | 'link' | 'number' | 'array' | 'currency' | 'date' | 'percentage' | 'yield' | 'acreage' | 'pricePerKg' | 'yieldVariance' | 'status';
  linkHref?: (item: T) => string;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
  value?: (item: T) => string;
  // For yield variance calculation
  actualKey?: keyof T | string;
  expectedKey?: keyof T | string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  keyField: keyof T;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  hoverable?: boolean;
  striped?: boolean;
  bordered?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export default function Table<T>({
  data,
  columns,
  keyField,
  className = '',
  headerClassName = 'bg-gray-100',
  rowClassName = '',
  hoverable = true,
  striped = false,
  bordered = true,
  emptyMessage = 'No data available',
  onRowClick
}: TableProps<T>) {

  const getValue = (item: T, key: keyof T | string) => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj: unknown, k) => (obj as Record<string, unknown>)?.[k], item);
    }
    return item[key as keyof T];
  };

  const renderCell = (column: TableColumn<T>, value: unknown, item: T): React.ReactNode => {
    switch (column.type) {
      case 'link':
        const href = column.linkHref ? column.linkHref(item) : '#';
        return (
          <Link 
            href={href}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {String(value)}
          </Link>
        );
      
      case 'number':
        return (
          <div className="text-sm text-gray-900">
            {formatNumber(value as number)}
          </div>
        );
      
      case 'array':
        return (
          <div className="flex flex-wrap gap-1">
            {(value as string[]).map((item: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {item}
              </span>
            ))}
          </div>
        );
      
      case 'currency':
        return (
          <div className="text-sm font-semibold text-gray-900">
            {formatCurrency(value as number)}
          </div>
        );
      
      case 'date':
        return (
          <div className="text-sm text-gray-900">
            {formatDate(value as string)}
          </div>
        );
      
      case 'percentage':
        return (
          <div className="text-sm text-gray-900">
            {formatPercentage(value as number)}
          </div>
        );
      
      case 'yield':
        return (
          <div className="text-sm text-gray-900">
            {formatYield(value as number)}
          </div>
        );
      
      case 'acreage':
        return (
          <div className="text-sm text-gray-900">
            {formatAcreage(value as number)}
          </div>
        );
      
      case 'pricePerKg':
        return (
          <div className="text-sm text-gray-900">
            {formatPricePerKg(value as number)}
          </div>
        );
      
      case 'yieldVariance':
        const actual = getValue(item, column.actualKey || 'actual_yield') as number;
        const expected = getValue(item, column.expectedKey || 'expected_yield') as number;
        const variance = formatYieldVariance(actual, expected);
        const isPositive = actual >= expected;
        return (
          <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{variance}
          </div>
        );
      
      case 'status':
        const statusValue = String(value);
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusValue === 'harvested' 
              ? 'bg-green-100 text-green-800' 
              : statusValue === 'growing'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {statusValue}
          </span>
        );
      
      default:
        return (
          <div className="text-sm text-gray-900">{String(value)}</div>
        );
    }
  };

  const baseTableClasses = `
    w-full divide-y divide-gray-200
    ${bordered ? 'border border-gray-200' : ''}
    ${className}
  `.trim();

  const headerClasses = `
    ${headerClassName}
  `.trim();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Table */}
      {data.length === 0 ? (
        <div className="px-8 py-12 text-center">
          <div className="text-gray-500 text-sm">
            {emptyMessage}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className={baseTableClasses}>
            <thead className={headerClasses}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`
                      px-8 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                      ${column.headerClassName || ''}
                    `.trim()}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <TableRow
                  linkHref={`/farms/${getValue(item, keyField)}`}
                  key={String(getValue(item, keyField))}
                  item={item}
                  columns={columns}
                  keyField={keyField}
                  index={index}
                  rowClassName={rowClassName}
                  hoverable={hoverable}
                  striped={striped}
                  onRowClick={onRowClick}
                  renderCell={renderCell}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
