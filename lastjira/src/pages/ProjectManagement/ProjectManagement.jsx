import React, { useState } from "react";
import { Button, Space, Table } from "antd";

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
      filteredValue: filteredInfo.name || null,
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
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
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </div>
  );
}
