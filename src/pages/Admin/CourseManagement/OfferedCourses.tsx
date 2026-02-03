import { Table, Alert, Space, Button, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useGetOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import type { TOfferedCourse } from "../../../types/offeredCourse.types";
import type { TError } from "../../../types/global.types";
import { useNavigate } from "react-router";
import type { TCourse } from "../../../types/courses.types";
import type { TFaculty } from "../../../types/faculty.types";
import type { TAcademicSemester } from "../../../types/academicSemester.types";
import type { TAcademicFaculty } from "../../../types/academicFaculty.types";
import type { TAcademicDepartment } from "../../../types/academicDepartment.types";

const OfferedCourses = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, isFetching } =
    useGetOfferedCoursesQuery(undefined);

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

  const tableData: TOfferedCourse[] = data?.data || [];

  const columns: TableColumnsType<TOfferedCourse> = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course: TCourse) => {
        const title =
          typeof course === "string" ? course : course?.title || "-";
        return title;
      },
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
      render: (faculty: TFaculty) => {
        const name =
          typeof faculty === "string" ? faculty : faculty?.fullName || "-";
        return name;
      },
    },
    {
      title: "Semester",
      dataIndex: "academicSemester",
      key: "academicSemester",
      render: (semester: TAcademicSemester) => {
        const name =
          typeof semester === "string" ? semester : semester?.name || "-";
        return name;
      },
    },
    {
      title: "Faculty",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
      render: (faculty: TAcademicFaculty) => {
        const name =
          typeof faculty === "string" ? faculty : faculty?.name || "-";
        return name;
      },
    },
    {
      title: "Department",
      dataIndex: "academicDepartment",
      key: "academicDepartment",
      render: (department: TAcademicDepartment) => {
        const name =
          typeof department === "string" ? department : department?.name || "-";
        return name;
      },
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      render: (days: string[]) => {
        if (!days || days.length === 0) return "-";
        return (
          <Space>
            {days.map((day) => (
              <Tag key={day} color="blue">
                {day}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: "Time",
      key: "time",
      render: (_: any, record: TOfferedCourse) =>
        `${record.startTime} - ${record.endTime}`,
    },
    {
      title: "Action",
      key: "action",
      render: (record: TOfferedCourse) => (
        <Button
          onClick={() => navigate(`/admin/offered-courses/${record._id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <h2>Offered Courses</h2>
      <Table<TOfferedCourse>
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

export default OfferedCourses;
