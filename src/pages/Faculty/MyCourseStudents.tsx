import {Table, Alert, Space} from "antd";
import type {TableColumnsType} from "antd";
import {useGetFacultyCoursesQuery} from "../../redux/features/faculty/facultyCourseManagement.api.ts";
import {useParams} from "react-router";
import type {TFacultyCourse} from "../../types/facultyCourse.types";
import type {TError} from "../../types/global.types";
import AddMarksModal from "./AddMarksModal.tsx";

const MyCourseStudents = () => {
    const {semesterRegistrationId, courseId} = useParams();
    const {data: facultyCoursesData, isLoading, error} = useGetFacultyCoursesQuery([{
        name: "semesterRegistrationId",
        value: semesterRegistrationId || ""
    }, {name: "courseId", value: courseId || ""}]);

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

    const tableData = facultyCoursesData?.data || [];

    const columns: TableColumnsType<TFacultyCourse> = [
        {
            title: "Student Name",
            dataIndex: ["student", "fullName"],
            key: "studentName",
            render: (_text: string, record: TFacultyCourse) =>
                record.student.fullName || `${record.student.name.firstName} ${record.student.name.lastName}`,
        },
        {
            title: "Roll",
            dataIndex: ["student", "id"],
            key: "studentRoll",
        },
        {
            title: "Action",
            key: "action",
            render: (record: TFacultyCourse) => (
                <AddMarksModal
                    studentData={record.student}
                    semesterRegistration={record.semesterRegistration._id}
                    offeredCourse={record.offeredCourse._id}
                />
            ),
        },
    ];

    return (
        <Space orientation="vertical" style={{width: "100%"}} size="large">
            <h2>My Course Students</h2>
            <Table<TFacultyCourse>
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
                loading={isLoading}
            />
        </Space>
    );
};

export default MyCourseStudents;