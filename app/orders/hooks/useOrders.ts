"use client";
import { useState, useEffect } from "react";
import { getOrders } from "../api";
import { Order } from "../types";
import { toast } from "sonner";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const fetchOrders = async (
    pageNumber = page,
    size = pageSize,
    search = searchTerm,
    customer = customerFilter,
    statuses = statusFilter,
    sortBy = sortField,
    sortDirection = sortDir
  ) => {
    setLoading(true);
    try {
      const res = await getOrders(
        pageNumber,
        size,
        search,
        customer,
        statuses,
        sortBy,
        sortDirection
      );
      setOrders(res.data.items);
      setTotal(res.data.total);
      setPage(res.data.page);
      setPageSize(size);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, pageSize, searchTerm, customerFilter, statusFilter, sortField, sortDir]);

  const clearFilters = () => {
    setSearchTerm("");
    setCustomerFilter("");
    setStatusFilter([]);
  };

  return {
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
  };
};
