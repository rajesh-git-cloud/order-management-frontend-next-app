"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Order } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { OrdersTableProps } from "../types";

export const OrdersTable: React.FC<OrdersTableProps> = ({
  data,
  page,
  pageSize,
  total,
  loading,
  onPageChange,
  refreshData,
  columns,
  sortField,
  sortDir,
  setSortField,
  setSortDir,
}) => {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: { pagination: { pageIndex: page - 1, pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="cursor-pointer select-none"
                  onClick={() => handleSort(header.column.id)}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {sortField === header.column.id && (sortDir === "asc" ? "⬆" : "⬇")}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              onPageChange(1);
              refreshData(1, newSize);
            }}
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {Math.ceil(total / pageSize)}
          </span>
          <Button
            size="sm"
            disabled={page >= Math.ceil(total / pageSize)}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>

        <span className="text-sm text-gray-600 ml-auto">Total: {total}</span>
      </div>
    </div>
  );
};

