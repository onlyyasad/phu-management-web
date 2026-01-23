import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { nameOptions } from "../../../constants/semester";
import { monthOptions, yearOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import type { TError, TResponse } from "../../../types/global.types";
import type { TAcademicSemester } from "../../../types/academicSemester.types";

const CreateAcademicSemester = () => {
  const [addAcademicSemester, { isLoading }] = useAddAcademicSemesterMutation();
  const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");
    const semesterData = {
      name: nameOptions[parseInt(data.name) - 1].label,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(
        semesterData,
      ).unwrap()) as TResponse<TAcademicSemester>;

      if (res.success) {
        toast.success("Academic semester created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err.message || "Error creating semester:", {
        id: toastId,
      });
    }
  };

  return (
    <PHForm onSubmit={onsSubmit} resolver={zodResolver(academicSemesterSchema)}>
      <PHSelect name="name" label="Name" options={nameOptions} />
      <PHSelect name="year" label="Year" options={yearOptions} />
      <PHSelect name="startMonth" label="Start Month" options={monthOptions} />
      <PHSelect name="endMonth" label="End Month" options={monthOptions} />
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

export default CreateAcademicSemester;
