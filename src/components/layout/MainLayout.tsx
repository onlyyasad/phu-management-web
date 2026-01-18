import { Layout, Menu, Button, Dropdown } from "antd";
import { Outlet } from "react-router";
import { adminSidebarItems } from "../../routes/admin.routes";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const userMenuItems = [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          items={adminSidebarItems}
          className="sidebar-menu"
          style={{ background: "#1a2332" }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fafafa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            size="large"
          />

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text">Admin</Button>
          </Dropdown>
        </Header>

        <Content style={{ margin: "24px 16px" }}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 2 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
