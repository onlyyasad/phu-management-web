import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import type { TError, TResponse } from "../../../types/global.types";
import type { TAcademicDepartment } from "../../../types/academicDepartment.types";

const CreateAcademicDepartment = () => {
  const { data: facultyData } = useGetAllAcademicFacultyQuery(undefined);
  const [addAcademicDepartment, { isLoading }] =
    useAddAcademicDepartmentMutation();

  const facultyOptions = facultyData?.data?.map((faculty) => ({
    value: faculty._id,
    label: faculty.name,
  })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic department...");
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    try {
      const res = (await addAcademicDepartment(
        departmentData,
      ).unwrap()) as TResponse<TAcademicDepartment>;

      if (res.success) {
        toast.success("Academic department created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err.message || "Error creating department", {
        id: toastId,
      });
    }
  };

  return (
    <PHForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)}>
      <PHInput type="text" name="name" label="Name" />
      <PHSelect
        name="academicFaculty"
        label="Academic Faculty"
        options={facultyOptions}
      />
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        disabled={isLoading}
      >
        Create
      </Button>
    </PHForm>
  );
};

export default CreateAcademicDepartment;
