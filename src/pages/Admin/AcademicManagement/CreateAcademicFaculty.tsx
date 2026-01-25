import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button } from "antd";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import type { TError, TResponse } from "../../../types/global.types";
import type { TAcademicFaculty } from "../../../types/academicFaculty.types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty, { isLoading }] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic faculty...");
    const facultyData = {
      name: data.name,
    };
    try {
      const res = (await addAcademicFaculty(
        facultyData,
      ).unwrap()) as TResponse<TAcademicFaculty>;

      if (res.success) {
        toast.success("Academic faculty created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err.message || "Error creating faculty", {
        id: toastId,
      });
    }
  };

  return (
    <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
      <PHInput type="text" name="name" label="Name" />
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

export default CreateAcademicFaculty;