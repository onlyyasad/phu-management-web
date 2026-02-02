import { Table, Alert, Space, Button, Tag, Dropdown } from "antd";
import type { TableColumnsType, MenuProps } from "antd";
import moment from "moment";
import {
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationStatusMutation,
} from "../../../redux/features/admin/courseManagement.api";
import type { TSemesterRegistration } from "../../../types/semesterRegistration.types";
import type { TError } from "../../../types/global.types";
import { semesterRegistrationStatusOptions } from "../../../constants/semesterRegistration";
import { toast } from "sonner";

const RegisteredSemesters = () => {
  const [updateSemesterRegistrationStatus, { isLoading: isUpdating }] =
    useUpdateSemesterRegistrationStatusMutation();
  const { data, isLoading, error, isFetching } =
    useGetAllSemesterRegistrationsQuery(undefined);

  const handleStatusUpdate = async (
    semesterRegistrationId: string,
    newStatus: string,
  ) => {
    const toastId = toast.loading("Updating semester registration status...");
    const payload = {
      id: semesterRegistrationId,
      data: { status: newStatus },
    };
    try {
      await updateSemesterRegistrationStatus(payload).unwrap();
      toast.success("Semester registration status updated successfully", {
        id: toastId,
      });
    } catch (err) {
      console.log(err, "error status update");
      const errData = err as TError;
      toast.error(
        errData.message || "Failed to update semester registration status",
        {
          id: toastId,
        },
      );
    }
  };

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
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          UPCOMING: "blue",
          ONGOING: "green",
          ENDED: "red",
        };
        return <Tag color={colorMap[status] || "default"}>{status}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => moment(date).format("DD-MM-YYYY"),
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
      render: (record: TSemesterRegistration) => {
        const menuItems: MenuProps["items"] =
          semesterRegistrationStatusOptions.map((option) => ({
            key: option.value,
            label: option.label,
            disabled: option.value === record.status,
            onClick: () => {
              handleStatusUpdate(record._id, option.value);
            },
          }));

        return (
          <Dropdown menu={{ items: menuItems }}>
            <Button disabled={isUpdating}>Update</Button>
          </Dropdown>
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
