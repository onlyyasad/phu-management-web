import { Layout, Menu } from "antd";
import React from "react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";

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
  const role = "faculty";
  let sidebaritems;
  switch (role) {
    case userRole.ADMIN:
      sidebaritems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebaritems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebaritems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;
    default:
      sidebaritems = [];
  }
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      theme="dark"
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
        items={sidebaritems}
        className="sidebar-menu"
        style={{ background: "#1a2332" }}
      />
    </Sider>
  );
};

export default Sidebar;
