import { Table, Alert, Space, Button, Avatar, Pagination } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllStudentsQuery } from "../../../../redux/features/admin/userManagement.api";
import type { TStudent } from "../../../../types/student.types";
import type { TError, TQueryParam } from "../../../../types/global.types";
import { useState } from "react";
import { NavLink } from "react-router";

const Students = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...params,
  ]);

  if (error) {
    const errorData = error as TError;
    return (
      <Alert
        title="Error"
        description={errorData.message || "Something went wrong"}
        type="error"
        showIcon
      />
    );
  }

  const tableData = data?.data || [];
  const metaData = data?.meta;

  const columns: TableColumnsType<TStudent> = [
    {
      title: "Student ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Student Data",
      key: "studentData",
      render: (record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar src={record.profileImg} size={45} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: "600" }}>{record.fullName}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.email}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              Gender: {record.gender}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              Phone: {record.contactNo}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Academic Department",
      key: "department",
      render: (record) => <span>{record.academicDepartment.name}</span>,
    },
    {
      title: "Academic Faculty",
      key: "faculty",
      render: (record) => <span>{record.academicFaculty.name}</span>,
    },
    {
      title: "Semester",
      key: "semester",
      render: (record) => <span>{record.admissionSemester.name}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (item) => {
        return (
          <Space size="small">
            <NavLink to={`/admin/students/${item._id}`}>
              <Button type="primary" size="small">
                Details
              </Button>
            </NavLink>
            <NavLink to={`/admin/students/${item._id}/edit`}>
              <Button size="small">Update</Button>
            </NavLink>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TStudent>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    const queryParams: TQueryParam[] = [];
    if (extra.action === "sort" && sorter) {
      const sortedField = Array.isArray(sorter)
        ? sorter[0]?.field
        : sorter?.field;
      const sortedOrder = Array.isArray(sorter)
        ? sorter[0]?.order
        : sorter?.order;

      if (sortedField === "id" && sortedOrder) {
        queryParams.push({
          name: "sort",
          value: sortedOrder === "ascend" ? "id" : "-id",
        });
      }
    }
    setParams(queryParams);
  };

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <h2>Students</h2>
      <Table<TStudent>
        columns={columns}
        dataSource={tableData}
        rowKey="_id"
        pagination={false}
        loading={isLoading || isFetching}
        onChange={onChange}
      />
      <Pagination
        total={metaData?.total || 0}
        current={page || 1}
        pageSize={metaData?.limit || 10}
        onChange={(page) => setPage(page)}
      />
    </Space>
  );
};

export default Students;
