import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { UserDataTypes } from "../../types";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const DashboardWrapper: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState<UserDataTypes>({});
  const userInfo: string | null = localStorage.getItem("user_info");
  useEffect(() => {
    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    }
  }, [userInfo]);

  const navigate = useNavigate();
  const navbarlist = [
    {
      key: "1",
      icon: <BarChartOutlined />,
      label: "Dashboard",
      path: "/",
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Products",
      path: "/products",
    },
    {
      key: "3",
      icon: <TagsOutlined />,
      label: "Categories",
      path: "/categories",
    },
    {
      key: "4",
      icon: <ShopOutlined />,
      label: "Brands",
      path: "/brands",
    },
  ];

  const [currentPath, setCurrentPath] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlePath = (id: string) => {
    const path = navbarlist.find((item) => item.key === id);
    if (path) {
      setCurrentPath(path.key);
      navigate(path.path);
    }
  };

  useEffect(() => {
    if (location.pathname === "/profile") {
      setCurrentPath("0");
    }
    const activeNavItem = navbarlist.find(
      (item) => location.pathname == item.path
    );
    if (activeNavItem) setCurrentPath(activeNavItem.key);
  }, [location.pathname]);

  return (
    <Layout className="w-full min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="w-full py-[20px] flex items-center justify-center">
          {!collapsed ? (
            <span
              className="text-[40px] text-center text-white duration-200 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Texnoark
            </span>
          ) : (
            <span
              className="text-[40px] text-center text-white duration-200 cursor-pointer"
              onClick={() => navigate("/")}
            >
              T
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[currentPath]}
          onClick={(e) => {
            handlePath(e.key);
          }}
          items={navbarlist}
        />
      </Sider>
      <Layout>
        <div
          style={{
            padding: 20,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              padding: "20px",
            }}
          />
          <button
            className="bg-gray-200 py-2 px-6 rounded capitalize hover:bg-gray-300"
            onClick={() => navigate("/profile")}
          >
            {userData.first_name}
          </button>
        </div>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardWrapper;
