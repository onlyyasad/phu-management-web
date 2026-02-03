import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { Button } from "antd";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import type { TError, TResponse } from "../../../types/global.types";
import type { TCourse } from "../../../types/courses.types";

const CreateCourse = () => {
  const { data, isLoading: isCourseLoading } = useGetAllCoursesQuery(undefined);

  const [addCourse, { isLoading: isAdding }] = useAddCourseMutation();
  const preRequisiteOptions =
    data?.data.map((course) => ({
      label: course.title,
      value: course._id,
    })) || [];

  const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    const payload = {
      title: data.title,
      code: Number(data.code),
      prefix: data.prefix.toUpperCase(),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses.map((courseId: string) => ({
        course: courseId,
      })),
    };

    try {
      const res = (await addCourse(payload).unwrap()) as TResponse<TCourse>;

      if (res.success) {
        toast.success("Course created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err.message || "Error creating course:", {
        id: toastId,
      });
    }
  };

  return (
    <PHForm onSubmit={onsSubmit}>
      <PHInput name="title" label="Title" type="text" />
      <PHInput name="code" label="Code" type="text" />
      <PHInput name="prefix" label="Prefix" type="text" />
      <PHInput name="credits" label="Credits" type="text" />
      <PHSelect
        name="preRequisiteCourses"
        label="Pre-requisite Courses"
        mode="multiple"
        options={preRequisiteOptions}
        disabled={isCourseLoading}
      />
      <Button type="primary" htmlType="submit" size="large" disabled={isAdding}>
        Create
      </Button>
    </PHForm>
  );
};

export default CreateCourse;
