import React from 'react';
import clsx from 'clsx';
export function DataTable({ columns, data, keyField = 'id', onRowClick }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ minWidth: col.minWidth || 80 }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-white/40 text-sm">
                No records found
              </td>
            </tr>
          ) : data.map((row, rowIdx) => (
            <tr 
              key={row[keyField] ?? rowIdx} 
              onClick={() => onRowClick && onRowClick(row)}
              className={clsx(onRowClick && "cursor-pointer")}
            >
              {columns.map((col, colIdx) => (
                <td 
                  key={colIdx} 
                  className={clsx("max-w-[200px]", col.className)}
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
