import { ColumnDef } from "@tanstack/react-table";

export type OrderStatus =
  | "OPEN"
  | "PENDING"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Order {
  id: number;
  orderNo: string;
  customerName: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  items: Order[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AddOrderDialogProps {
  open: boolean;
  onClose: () => void;
  refreshData: () => void;
}

export interface OrdersTableProps {
  data: Order[];
  columns: ColumnDef<Order>[];
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  refreshData: (page?: number, pageSize?: number) => void;
  sortField: string;
  sortDir: "asc" | "desc";
  setSortField: (field: string) => void;
  setSortDir: (dir: "asc" | "desc") => void;
}

export interface EditOrderDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  refreshData: () => void;
}

export interface StatusDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}


