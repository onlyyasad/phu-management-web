import { Layout, Button, Dropdown } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { ItemType } from "antd/es/menu/interface";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout, selectCurrentToken } from "../../../redux/features/auth/authSlice";
const { Header } = Layout;

type TProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar: React.FC<TProps> = ({ collapsed, setCollapsed }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);

  const userMenuItems: ItemType[] = [
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
      label: <Button type="text" onClick={() => dispatch(logout())}>Logout</Button>,
      danger: true,
    },
  ];

  return (
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

      {token && (
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Button type="text">User</Button>
        </Dropdown>
      )}
    </Header>
  );
};

export default Navbar;
