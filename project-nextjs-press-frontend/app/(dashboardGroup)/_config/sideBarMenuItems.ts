import { FileText, LayoutDashboard } from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";
import { AUTHOR_SIDEBAR_ITEMS } from "./authorSideBarItems";

const USER_SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/dashboard/my-posts",
    icon: FileText,
  },
];

export const sidebarMenuItems = {
  USER: USER_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
  AUTHOR: AUTHOR_SIDEBAR_ITEMS,
};
