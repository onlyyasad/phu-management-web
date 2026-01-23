import { Layout, Menu } from "antd";
import React from "react";
import { sidebarItemsGenerator } from "../../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../../routes/admin.routes";
import { facultyPaths } from "../../../routes/faculty.routes";
import { studentPaths } from "../../../routes/student.routes";
import type { TSidebarItem } from "../../../types/sidebar.type";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";

const { Sider } = Layout;

type TProps = {
  collapsed: boolean;
};

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
const Sidebar: React.FC<TProps> = ({ collapsed }) => {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;
  let sidebarItems: TSidebarItem[] = [];
  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;
    default:
      sidebarItems = [];
  }
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      theme="dark"
      width={280}
      style={{ background: "#1a2332" }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
          padding: "16px",
          textAlign: "center",
          color: "white",
          fontWeight: 600,
          overflow: "hidden",
        }}
      >
        <span style={{ fontSize: "20px", marginRight: "8px" }}>📊</span>
        {!collapsed && "PHU Management"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={sidebarItems}
        className="sidebar-menu"
        style={{ background: "#1a2332" }}
      />
    </Sider>
  );
};

export default Sidebar;
