import { Table, Alert, Space, Button } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TAcademicDepartment } from "../../../types/academicDepartment.types";
import type { TError } from "../../../types/global.types";

const AcademicDepartment = () => {
  const { data, isLoading, error, isFetching } =
    useGetAllAcademicDepartmentQuery(undefined);

  if (error) {
    console.log(error, "from page");
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

  const columns: TableColumnsType<TAcademicDepartment> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Faculty Name",
      dataIndex: ["academicFaculty", "name"],
      key: "facultyName",
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
      <h2>Academic Departments</h2>
      <Table<TAcademicDepartment>
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

export default AcademicDepartment;