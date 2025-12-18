"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteOrderDialog } from "./components/delete-order-dialog";
import { EditOrderDialog } from "./components/edit-order-dialog";
import { toast } from "sonner";
import { deleteOrder } from "./api";
import { useState } from "react";

export const getColumns = (
  refreshData: () => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "orderNo",
    header: "Order No",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Badge variant="outline">{getValue<string>()}</Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => `₹ ${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleDateString(),
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   cell: ({ getValue }) =>
  //     new Date(getValue<string>()).toLocaleDateString(),
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [openEdit, setOpenEdit] = useState(false);

      return (
        <>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setOpenEdit(true)}>
              Edit
            </Button>

            <DeleteOrderDialog
              onDelete={async () => {
                try {
                  await deleteOrder(row.original.id);
                  toast.success("Order deleted successfully");
                  refreshData();
                } catch {
                  toast.error("Failed to delete order");
                }
              }}
            />
          </div>

          <EditOrderDialog
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            order={row.original}
            refreshData={refreshData}
          />
        </>
      );
    },
  },
];
