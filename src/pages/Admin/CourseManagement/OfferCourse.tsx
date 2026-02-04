import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationsQuery,
  useGetFacultiesWithCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { Button, Space } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import type { TError, TResponse } from "../../../types/global.types";
import { toast } from "sonner";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { dayOptions } from "../../../constants/global";
import PHTimePicker from "../../../components/form/PHTimePicker";

const OfferCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const { data, isLoading: isCourseLoading } = useGetAllCoursesQuery(undefined);

  const {
    data: semesterRegistrationData,
    isLoading: isSemesterRegistrationLoading,
    isError: isSemesterRegistrationError,
  } = useGetAllSemesterRegistrationsQuery(undefined);

  const { data: facultiesData, isLoading: isFacultiesLoading } =
    useGetFacultiesWithCourseQuery(
      { courseId: selectedCourse },
      { skip: !selectedCourse },
    );

  const [addCourse, { isLoading: isAdding }] = useAddOfferedCourseMutation();

  const courseOptions =
    data?.data.map((course) => ({
      label: course.title,
      value: course._id,
    })) || [];

  const facultiesOptions =
    facultiesData?.data?.faculties?.map((faculty) => ({
      label: faculty.fullName,
      value: faculty._id,
    })) || [];

  const semesterRegistrationOptions =
    semesterRegistrationData?.data.map((sr) => ({
      label: `${sr.academicSemester.name} - ${sr.academicSemester.year}`,
      value: sr._id,
    })) || [];

  const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");
    const timeRange = data.timeRange;
    const startTime = timeRange[0].format("HH:mm");
    const endTime = timeRange[1].format("HH:mm");
    const selectedFaculty = facultiesData?.data?.faculties.find(
      (faculty) => faculty._id === data.faculty,
    );

    const academicFaculty = selectedFaculty?.academicFaculty;
    const academicDepartment = selectedFaculty?.academicDepartment;

    const payload = {
      semesterRegistration: data.semesterRegistration,
      academicFaculty,
      academicDepartment,
      course: data.course,
      faculty: data.faculty,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      days: data.days,
      startTime,
      endTime,
    };

    try {
      const res = (await addCourse(payload).unwrap()) as TResponse<any>;

      if (res.success) {
        toast.success("OfferedCourse created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err.message || "Error creating offered course:", {
        id: toastId,
      });
    }
  };

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <h2>Offer Course</h2>
      <PHForm onSubmit={onsSubmit}>
        <PHSelect
          name="semesterRegistration"
          label="Semester Registration"
          options={semesterRegistrationOptions}
          disabled={
            isSemesterRegistrationLoading || isSemesterRegistrationError
          }
        />
        <PHSelectWithWatch
          name="course"
          label="Course"
          options={courseOptions}
          disabled={isCourseLoading}
          handleChange={(value) => {
            setSelectedCourse(value);
          }}
        />
        <PHSelect
          name="faculty"
          label="Faculty"
          options={facultiesOptions}
          disabled={isFacultiesLoading}
        />
        <PHInput name="maxCapacity" label="Max Capacity" type="number" />
        <PHInput name="section" label="Section" type="number" />
        <PHSelect
          name="days"
          label="Days"
          mode="multiple"
          options={dayOptions}
        />
        <PHTimePicker name="timeRange" label="Time Range" />
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          disabled={isAdding}
        >
          Create
        </Button>
      </PHForm>
    </Space>
  );
};

export default OfferCourse;
