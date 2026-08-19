import {
  Home,
  Users,
  ClipboardList,
  Box,
  BarChart2,
  FileText,
} from "lucide-react";

export const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/users", label: "Users", icon: Users },
  { path: "/orders", label: "Orders", icon: ClipboardList },
  { path: "/products", label: "Products", icon: Box },
  { path: "/analysis", label: "Analysis", icon: BarChart2 },
  { path: "/blogs", label: "Blogs", icon: FileText },
];