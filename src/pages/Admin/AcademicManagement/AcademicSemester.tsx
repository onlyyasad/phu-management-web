import { Table, Alert, Space, Button } from "antd";
import type { TableProps, TableColumnsType } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TAcademicSemester } from "../../../types/academicSemester.types";
import type { TError } from "../../../types/global.types";
import { useState } from "react";

const AcademicSemester = () => {
  const [params, setParams] = useState<Record<string, unknown>[]>([]);
  const { data, isLoading, error, isFetching } =
    useGetAllSemestersQuery(params);

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

  const columns: TableColumnsType<TAcademicSemester> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Autumn", value: "Autumn" },
        { text: "Summer", value: "Summer" },
        { text: "Fall", value: "Fall" },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      filters: [
        { text: "2026", value: "2026" },
        { text: "2027", value: "2027" },
        { text: "2028", value: "2028" },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      key: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      key: "endMonth",
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

  const onChange: TableProps<TAcademicSemester>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log({ filters }, extra);
    if (extra.action === "filter") {
      const queryParams: Record<string, unknown>[] = [];
      filters?.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      setParams(queryParams);
    }
  };

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <h2>Academic Semesters</h2>
      <Table<TAcademicSemester>
        columns={columns}
        dataSource={tableData}
        rowKey="_id"
        onChange={onChange}
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

export default AcademicSemester;
