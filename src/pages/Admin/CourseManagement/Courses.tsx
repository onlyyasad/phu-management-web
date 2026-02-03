import { Table, Alert, Space, Button, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import type { TCourse } from "../../../types/courses.types";
import type { TError } from "../../../types/global.types";
import { useNavigate } from "react-router";

const Courses = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isCourseLoading,
    error,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  if (error) {
    const err = error as TError;
    return (
      <Alert
        title="Error"
        description={err.message || "Something went wrong"}
        type="error"
        showIcon
      />
    );
  }

  const tableData: TCourse[] = data?.data || [];

  const columns: TableColumnsType<TCourse> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Pre Requisite Courses",
      dataIndex: "preRequisiteCourses",
      key: "preRequisiteCourses",
      render: (preReqs: any[]) => {
        if (!preReqs || preReqs.length === 0) return "-";
        return (
          <Space>
            {preReqs.map((pr) => {
              const course = pr?.course;
              const name =
                typeof course === "string" ? course : course?.title || "-";
              return (
                <Tag key={name} color="default">
                  {name}
                </Tag>
              );
            })}
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: TCourse) => (
        <Button onClick={() => navigate(`/admin/courses/${record._id}`)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <h2>Courses</h2>
      <Table<TCourse>
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
        loading={isCourseLoading || isFetching}
      />
    </Space>
  );
};

export default Courses;
