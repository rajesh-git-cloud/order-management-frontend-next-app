"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteOrderDialogProps {
  onDelete: () => Promise<void> | void;
}

export function DeleteOrderDialog({ onDelete }: DeleteOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">Delete</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this order? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
