import { Layout } from "antd";
import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

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
