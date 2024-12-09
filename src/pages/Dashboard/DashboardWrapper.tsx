import React, { useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TagsOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DashboardWrapper: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlePath = (id: number) => {
    const path = navbarlist.find((item) => Number(item.key) === id);
    if (path) {
      navigate(path.path);
    }
  };

  return (
    <Layout className="w-full min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="w-full py-[20px] flex items-center justify-center">
          {!collapsed ? (
            <span className="text-[40px] text-center text-white">Texnoark</span>
          ) : (
            <span className="text-[40px] text-center text-white">T</span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => {
            handlePath(Number(e.key));
          }}
          items={navbarlist}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
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
