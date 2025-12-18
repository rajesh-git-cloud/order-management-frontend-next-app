import api from "@/lib/interceptors-api";
import { OrdersResponse } from "./types";

export const getOrders = async (
  page = 1,
  pageSize = 10,
  search?: string,
  customer?: string,
  statuses?: string[],
  sortBy?: string,
  sortDirection?: "asc" | "desc"
): Promise<{ data: OrdersResponse }> => {
  const params: Record<string, unknown> = { page, pageSize };
  if (search) params.search = search;
  if (customer) params.customerName = customer;
  if (statuses && statuses.length > 0) params["status[]"] = statuses;
  if (sortBy) params.sortBy = sortBy;
  if (sortDirection) params.sortDirection = sortDirection;

  return api.get("/orders", { params });
};

export const getNextOrderNo = async (): Promise<string> => {
  const res = await api.get<{ orderNo: string }>("/orders/next-order-no");
  return res.data.orderNo;
};

export const createOrder = (data: {
  orderNo: string;
  customerName: string;
  amount: number;
  status: string;
}) => api.post("/orders", data);

export const updateOrder = (
  id: number,
  data: { customerName: string; amount: number; status: string }
) => api.put(`/orders/${id}`, data);

export const deleteOrder = (id: number) => api.delete(`/orders/${id}`);
