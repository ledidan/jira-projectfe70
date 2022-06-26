import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Avatar, Popover, AutoComplete } from "antd";
import { DeleteOutlined, EditOutlined, RestOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ADD_USER_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT_FORM,
  GET_ALL_LIST,
  GET_USER_API,
  OPEN_EDIT_FORM,
  OPEN_MODAL,
  REMOVE_USER_PROJECT,
} from "../../redux/contants/JiraConstants";
import FormEditProject from "../../Component/Forms/FormEditProject/FormEditProject";
import { message, Popconfirm } from "antd";
import { useRef } from "react";

export default function ProjectManagement(props) {
  // Lay du lieu tu reducer ve Component

  const projectList = useSelector(
    (state) => state.ProjectManagementReducer.projectList
  );
  const { userSearch } = useSelector((state) => state.UserLoginJiraReducer);
  //  Use dispatch to call action
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_LIST });
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [value, setValue] = useState("");

  const searchRef = useRef(null);

  const handleChange = (pagination, filters, sorter) => {
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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
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
        const title = <p>Add member</p>;
        const member = <span className="font-bold text-lg">Member Board</span>;
        return (
          <div>
            {record.members?.slice(0, 3).map((item, index) => {
              return (
                <Popover
                  placement="right"
                  title={member}
                  content={() => {
                    return (
                      <table className="table" key={index}>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width={30}
                                    height={30}
                                    style={{ borderRadius: "15px" }}
                                  ></img>
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    className="btn btn-danger "
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT,
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={item.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? (
              <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                ...
              </Avatar>
            ) : (
              ""
            )}
            <Popover
              placement="rightTop"
              title={title}
              content={() => (
                <AutoComplete
                  options={userSearch?.map((user, index) => {
                    return { label: user.name, value: user.userId.toString() };
                  })}
                  value={value}
                  style={{
                    width: 200,
                  }}
                  onChange={(text) => {
                    setValue(text);
                  }}
                  onSelect={(valueSelect, option) => {
                    // Set gia tri cua hop thoai = option.label
                    setValue(option.label);

                    // Call API ADD USER gui ve backend
                    dispatch({
                      type: ADD_USER_PROJECT,
                      userProject: {
                        projectId: record.id,
                        userId: valueSelect,
                      },
                    });
                  }}
                  onSearch={(value) => {
                    if (searchRef.current) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      dispatch({ type: GET_USER_API, keyWord: value });
                    }, 300);
                  }}
                  placeholder="Enter members'name"
                />
              )}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
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
