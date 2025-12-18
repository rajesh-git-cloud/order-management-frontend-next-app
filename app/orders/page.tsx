"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OrdersTable } from "./components/orders-table";
import { getColumns } from "./columns";
import { AddOrderDialog } from "./components/add-order-dialog";
import { Button } from "@/components/ui/button";
import { StatusDropdown } from "./components/StatusDropdown";
import { useOrders } from "./hooks/useOrders";
import { logout } from "../login/auth.service";
import { OrderStatus } from "./types";

const STATUS_OPTIONS: OrderStatus[] = [
  "OPEN",
  "PENDING",
  "INPROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export default function OrdersPage() {
  const router = useRouter();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const {
    orders,
    loading,
    page,
    pageSize,
    total,
    setPage,
    fetchOrders,
    searchTerm,
    setSearchTerm,
    customerFilter,
    setCustomerFilter,
    statusFilter,
    setStatusFilter,
    sortField,
    setSortField,
    sortDir,
    setSortDir,
    clearFilters,
  } = useOrders();

  const columns = useMemo(
    () => getColumns(fetchOrders),
    [fetchOrders]
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => logout(router)}>
            Logout
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            Add Order
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Global search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Customer filter..."
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
        />
        <StatusDropdown
          options={STATUS_OPTIONS}
          selected={statusFilter}
          onChange={setStatusFilter}
        />
        <Button size="sm" variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      <AddOrderDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        refreshData={() => fetchOrders(1, pageSize)}
      />

      <OrdersTable
        data={orders}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        refreshData={fetchOrders}
        columns={columns}
        sortField={sortField}
        sortDir={sortDir}
        setSortField={setSortField}
        setSortDir={setSortDir}
      />
    </div>
  );
}
