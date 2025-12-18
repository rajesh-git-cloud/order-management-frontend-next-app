"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createOrder, getNextOrderNo } from "../api";
import { orderSchema, OrderFormData } from "./validation";
import { AddOrderDialogProps } from "../types";
import { OrderStatus } from "../types";

const STATUS_OPTIONS: OrderStatus[] = ["OPEN","PENDING","INPROGRESS","COMPLETED","CANCELLED"];

export function AddOrderDialog({ open, onClose, refreshData }: AddOrderDialogProps) {
  const [orderNo, setOrderNo] = useState("");
  const [form, setForm] = useState<OrderFormData>({
    customerName: "",
    amount: 0,
    status: "OPEN",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    setForm({ customerName: "", amount: 0, status: "OPEN" });
    setErrors({});

    getNextOrderNo()
      .then(setOrderNo)
      .catch(() => {
        toast.error("Failed to get order number");
        setOrderNo("");
      });
  }, [open]);

  const handleSave = async () => {
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
      await createOrder({ orderNo, ...form });
      toast.success(`Order ${orderNo} created successfully`);
      onClose();
      refreshData();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Order</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          <Input value={orderNo} readOnly placeholder="Order No" disabled={loading} />
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

        <Button className="w-full mt-4" onClick={handleSave} disabled={loading || !orderNo}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
