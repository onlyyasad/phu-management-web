import { Table, Alert, Space, Button, Typography, Avatar } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import type { TStudent } from "../../../types/student.types";
import type { TError } from "../../../types/global.types";

const Students = () => {
  const { data, isLoading, error, isFetching } =
    useGetAllStudentsQuery(undefined);

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

  const columns: TableColumnsType<TStudent> = [
    {
      title: "Student Data",
      key: "studentData",
      render: (record) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <Avatar src={record.profileImg} size={50} />
          <div>
            <strong>ID:</strong> {record.id}
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
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <h2>Students</h2>
      <Table<TStudent>
        columns={columns}
        dataSource={tableData}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        loading={isLoading || isFetching}
      />
    </Space>
  );
};

export default Students;
