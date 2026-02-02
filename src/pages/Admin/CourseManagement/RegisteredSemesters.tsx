import { Table, Alert, Space, Button } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllSemesterRegistrationsQuery } from "../../../redux/features/admin/courseManagement.api";
import type { TSemesterRegistration } from "../../../types/semesterRegistration.types";
import type { TError } from "../../../types/global.types";

const RegisteredSemesters = () => {
  const { data, isLoading, error, isFetching } =
    useGetAllSemesterRegistrationsQuery(undefined);

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

  const columns: TableColumnsType<TSemesterRegistration> = [
    {
      title: "Semester",
      dataIndex: ["academicSemester", "name"],
      key: "semester",
      render: (text: string, record: TSemesterRegistration) =>
        `${record.academicSemester.name} ${record.academicSemester.year}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Min Credit",
      dataIndex: "minCredit",
      key: "minCredit",
    },
    {
      title: "Max Credit",
      dataIndex: "maxCredit",
      key: "maxCredit",
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
      <h2>Registered Semesters</h2>
      <Table<TSemesterRegistration>
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

export default RegisteredSemesters;
