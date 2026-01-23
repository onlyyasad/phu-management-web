import { Table, Spin, Alert, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TAcademicSemester } from "../../../types/academicSemester.types";
import type { TError } from "../../../types/global.types";

const AcademicSemester = () => {
  const { data, isLoading, error } = useGetAllSemestersQuery(undefined);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    const errorData = error as TError;
    return (
      <Alert
        title="Error"
        description={errorData?.data?.message || "Something went wrong"}
        type="error"
        showIcon
      />
    );
  }

  const tableData = data?.data || [];

  const columns: ColumnsType<TAcademicSemester> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [
        { text: "Autumn", value: "Autumn" },
        { text: "Summer", value: "Summer" },
        { text: "Fall", value: "Fall" },
      ],
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => parseInt(a.year) - parseInt(b.year),
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      key: "startMonth",
      sorter: (a, b) => a.startMonth.localeCompare(b.startMonth),
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      key: "endMonth",
      sorter: (a, b) => a.endMonth.localeCompare(b.endMonth),
    },
  ];

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <h2>Academic Semesters</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Space>
  );
};

export default AcademicSemester;
