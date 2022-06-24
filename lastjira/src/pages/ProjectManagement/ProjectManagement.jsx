import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Avatar } from "antd";
import HtmlParser from "react-html-parser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_PROJECT,
  EDIT_PROJECT_FORM,
  GET_ALL_LIST,
  OPEN_EDIT_FORM,
  OPEN_MODAL,
} from "../../redux/contants/JiraConstants";
import FormEditProject from "../../Component/Forms/FormEditProject/FormEditProject";
import { message, Popconfirm } from "antd";

const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const data = [
  {
    id: 5299,
    projectName: "Xoa hoai",
    description: "<p>fsfklsfskf</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "xoa-hoai",
    deleted: false,
  },
  {
    id: 5305,
    projectName: "Hello",
    description: "<p>123</p>",
    categoryId: 3,
    categoryName: "Dự án di động",
    alias: "hello",
    deleted: false,
  },
  {
    id: 5309,
    projectName: "messi",
    description: "<p>goal</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "messi",
    deleted: false,
  },
  {
    id: 5310,
    projectName: "vietstock",
    description: "<p>axczxc</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "vietstock",
    deleted: false,
  },
  {
    id: 5312,
    projectName: "Project Test",
    description: "<p>Hello 123</p>",
    categoryId: 2,
    categoryName: "Dự án phần mềm",
    alias: "project-test",
    deleted: false,
  },
];

export default function ProjectManagement(props) {
  // Lay du lieu tu reducer ve Component

  const projectList = useSelector(
    (state) => state.ProjectManagementReducer.projectList
  );
  //  Use dispatch to call action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_LIST });
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => item2.id - item1.id,
      sortDirections: ["descend"],
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let name1 = item1.creator.name?.trim().toLowerCase();
        let name2 = item2.creator.name?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.map((item, index) => {
              return <Avatar key={index} src={item.avatar} />;
            })}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space>
          <button
            className="btn btn-primary "
            onClick={() => {
              const action = {
                type: OPEN_EDIT_FORM,
                Component: <FormEditProject />,
              };
              // Dispatch len reducer noi dung
              dispatch(action);
              // dispatch present data to reducer
              const actionEditProject = {
                type: EDIT_PROJECT_FORM,
                projectEditModel: record,
              };
              dispatch(actionEditProject);
            }}
          >
            <EditOutlined style={{ fontSize: 18 }} />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              const actionDeleteProject = {
                type: DELETE_PROJECT,
                idProject: record.id,
              };
              dispatch(actionDeleteProject);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-outline-danger ">
              <DeleteOutlined style={{ fontSize: 18 }} />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="container mt-5">
      <h3 className="text-4xl">Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
        rowKey={"id"}
      />
    </div>
  );
}
