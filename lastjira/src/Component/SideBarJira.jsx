import React, { useState } from "react";
import "../../src/index.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Header, Sider } = Layout;

export default function SideBarJira() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="text-right text-white text-lg">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger p-3",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PlusCircleOutlined style={{ fontSize: "20px" }} />,
              label: "Create Issue",
            },
            {
              key: "2",
              icon: <SearchOutlined style={{ fontSize: "20px" }} />,
              label: "Search",
            },
          ]}
        />
      </Sider>
    </Layout>
  );
}
