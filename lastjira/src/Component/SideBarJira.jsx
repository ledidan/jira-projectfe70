import React, { useState } from "react";
import "../../src/index.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import { FORM_CREATE_TASK } from "../redux/contants/JiraConstants";
import FormCreateTask from "./Forms/FormCreateTask/FormCreateTask";

const { Header, Sider } = Layout;

export default function SideBarJira() {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  return (
    <Layout style={{ flex: "none" }}>
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
              icon: (
                <PlusCircleOutlined
                  style={{ fontSize: "20px" }}
                  onClick={() => {
                    dispatch({
                      type: FORM_CREATE_TASK,
                      Component: <FormCreateTask />,
                      title: "CREATE TASK",
                    });
                  }}
                />
              ),
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
