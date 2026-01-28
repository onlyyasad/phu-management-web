import {
  Table,
  Alert,
  Space,
  Button,
  Typography,
  Avatar,
  Pagination,
} from "antd";
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
      sorter: true, // Enable sorting
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Student Data",
      key: "studentData",
      render: (record) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <Avatar src={record.profileImg} size={50} style={{ flexShrink: 0 }} />
          <div>
            {/* <strong>ID:</strong> {record.id} */}
            <br />
            <strong>Name:</strong> {record.fullName}
            <br />
            <strong>Email:</strong>{" "}
            <Typography.Text copyable>{record.email}</Typography.Text>
            <br />
            <strong>Gender:</strong> {record.gender}
            <br />
            <strong>Contact:</strong>{" "}
            <Typography.Text copyable>{record.contactNo}</Typography.Text>
            <br />
            <strong>Emergency Contact:</strong>{" "}
            <Typography.Text copyable>
              {record.emergencyContactNo}
            </Typography.Text>
            <br />
            <strong>Blood Group:</strong> {record.bloodGroup}
            <br />
            <strong>Date of Birth:</strong>{" "}
            {new Date(record.dateOfBirth).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      title: "Academic",
      key: "academic",
      render: (record) => (
        <div>
          <strong>Department:</strong> {record.academicDepartment.name}
          <br />
          <strong>Faculty:</strong> {record.academicFaculty.name}
          <br />
          <strong>Semester:</strong> {record.admissionSemester.name}
        </div>
      ),
    },
    {
      title: "Address",
      key: "address",
      render: (record) => (
        <div>
          <strong>Present:</strong> {record.presentAddress}
          <br />
          <strong>Permanent:</strong> {record.permanentAddress}
        </div>
      ),
    },
    {
      title: "Guardian",
      key: "guardian",
      render: (record) => (
        <Space orientation="vertical">
          <div>
            <h4>Father</h4>
            <strong>Name:</strong> {record.guardian.fatherName}
            <br />
            <strong>Occupation:</strong> {record.guardian.fatherOccupation}
            <br />
            <strong>Contact:</strong>{" "}
            <Typography.Text copyable>
              {record.guardian.fatherContactNo}
            </Typography.Text>
          </div>
          <div>
            <h4>Mother</h4>
            <strong>Name:</strong> {record.guardian.motherName}
            <br />
            <strong>Occupation:</strong> {record.guardian.motherOccupation}
            <br />
            <strong>Contact:</strong>{" "}
            <Typography.Text copyable>
              {record.guardian.motherContactNo}
            </Typography.Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Local Guardian",
      key: "localGuardian",
      render: (record) => (
        <div>
          <strong>Name:</strong> {record.localGuardian.name}
          <br />
          <strong>Occupation:</strong> {record.localGuardian.occupation}
          <br />
          <strong>Contact:</strong>{" "}
          <Typography.Text copyable>
            {record.localGuardian.contactNo}
          </Typography.Text>
          <br />
          <strong>Address:</strong> {record.localGuardian.address}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <div>
            <NavLink to={`/admin/students/${item._id}`}>
              <Button style={{ marginBottom: "8px", display: "block" }}>
                Details
              </Button>
            </NavLink>
            <NavLink to={`/admin/students/${item._id}/edit`}>
              <Button>Update</Button>
            </NavLink>
          </div>
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
