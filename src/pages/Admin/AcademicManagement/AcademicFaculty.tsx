import { Table, Alert, Space, Button } from "antd";
import type { TableProps, TableColumnsType } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TError } from "../../../types/global.types";
import { useState } from "react";
import type { TAcademicFaculty } from "../../../types/academicFaculty.types";

const AcademicFaculty = () => {
  const [params, setParams] = useState<Record<string, unknown>[]>([]);
  const { data, isLoading, error, isFetching } =
    useGetAllAcademicFacultyQuery(params);

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

  const columns: TableColumnsType<TAcademicFaculty> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Faculty of Programming", value: "Faculty of Programming" },
        { text: "Faculty of Web Development", value: "Faculty of Web Development" },
      ],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
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

  const onChange: TableProps<TAcademicFaculty>["onChange"] = (
    _pagination,
    filters,
    _sorter,
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
      <h2>Academic Faculties</h2>
      <Table<TAcademicFaculty>
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

export default AcademicFaculty;