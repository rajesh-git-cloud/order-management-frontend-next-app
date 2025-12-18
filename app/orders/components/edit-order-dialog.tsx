"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateOrder } from "../api";
import { orderSchema, OrderFormData } from "./validation";
import { EditOrderDialogProps } from "../types";
import { OrderStatus } from "../types";

const STATUS_OPTIONS: OrderStatus[] = ["OPEN","PENDING","INPROGRESS","COMPLETED","CANCELLED"];

export function EditOrderDialog({ open, onClose, order, refreshData }: EditOrderDialogProps) {
  const [form, setForm] = useState<OrderFormData>({ customerName: "", amount: 0, status: "OPEN" });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setForm({
        customerName: order.customerName,
        amount: order.amount,
        status: order.status,
      });
      setErrors({});
    }
  }, [order]);

  if (!order) return null;

  const handleUpdate = async () => {
    setErrors({});
    const result = orderSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof OrderFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof OrderFormData] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      await updateOrder(order.id, result.data);
      toast.success(`Order ${order.orderNo} updated`);
      onClose();
      refreshData();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          <Input value={order.orderNo} readOnly disabled={loading} />
          <Input
            placeholder="Customer Name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            disabled={loading}
          />
          {errors.customerName && <p className="text-sm text-red-500">{errors.customerName}</p>}

          <Input
            type="number"
            placeholder="Amount"
            value={form.amount || ""}
            onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
            disabled={loading}
          />
          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}

          <select
            className="border rounded-md p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as OrderStatus })}
            disabled={loading}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <Button className="w-full mt-4" onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
