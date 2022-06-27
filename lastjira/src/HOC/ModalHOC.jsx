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
import { OPEN_MODAL, CLOSE_MODAL } from "../redux/contants/JiraConstants";
import { useSelector, useDispatch } from "react-redux";
export default function ModalHOC(props) {
  const { visible, ComponentContentDrawer, callBackSubmit, title } =
    useSelector((state) => state.ModalHOCReducer);

  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({ type: OPEN_MODAL });
  };

  const onClose = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
