import {useGetFacultyCoursesQuery} from '../../redux/features/faculty/facultyCourseManagement.api';
import PHForm from "../../components/form/PHForm.tsx";
import type {FieldValues, SubmitHandler} from "react-hook-form";
import PHSelect from "../../components/form/PHSelect.tsx";
import {Button, Spin, Alert, Space} from "antd";
import {useNavigate} from "react-router";

const MyCourses = () => {
    const {data: facultyCoursesData, isLoading, error} = useGetFacultyCoursesQuery(undefined);
    const navigate = useNavigate();

    // Handle loading state
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <Alert
                title="Error"
                description="Failed to load faculty courses. Please try again later."
                type="error"
                showIcon
            />
        );
    }

    const semesterOptions = facultyCoursesData?.data?.map((item) => {
        return {
            label: `${item.academicSemester.name} ${item.academicSemester.year}`,
            value: item.semesterRegistration._id
        }
    })
    const courseOptions = facultyCoursesData?.data?.map((item) => {
        return {
            label: item.course.title,
            value: item.course._id
        }
    })

    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        navigate(`/faculty/my-courses/${data.semesterRegistration}/${data.course}`);
    }

    return (
        <Space orientation={"vertical"}>
            <h2>My Courses</h2>
            <PHForm onSubmit={handleSubmit}>
                <PHSelect options={semesterOptions || []} name={"semesterRegistration"} label={"Semester Registration"}/>
                <PHSelect options={courseOptions || []} name={"course"} label={"Course"}/>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </PHForm>
        </Space>
    );
};

export default MyCourses;