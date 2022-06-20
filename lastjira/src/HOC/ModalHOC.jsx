import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useSelector } from "react-redux";
export default function ModalHOC(props) {
  const { visible } = useSelector((state) => state.ModalHOCReducer);
  console.log("visible", visible);
  const showDrawer = () => {
    visible(true);
  };

  const onClose = () => {
    visible(false);
  };

  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        // onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      ></Drawer>
    </>
  );
}
