import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { TAcademicSemester } from "../../../types/academicSemester.types";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { semesterRegistrationStatusOptions } from "../../../constants/semesterRegistration";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { semesterRegistrationSchema } from "../../../schemas/courseManagementSchema";

const SemesterRegistration = () => {
  const { data, isLoading, error } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);
  const academicSemesterOptions =
    data?.data.map((semester: TAcademicSemester) => ({
      label: `${semester.name} ${semester.year}`,
      value: semester._id,
    })) || [];
  const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");
    // const semesterData = {
    //   academicSemester: academicSemesterOptions[parseInt(data.academicSemester) - 1].label,
    //   code: data.name,
    //   year: data.year,
    //   startMonth: data.startMonth,
    //   endMonth: data.endMonth,
    // };
    console.log(data);
    // try {
    //   const res = (await addAcademicSemester(
    //     semesterData,
    //   ).unwrap()) as TResponse<TAcademicSemester>;

    //   if (res.success) {
    //     toast.success("Academic semester created successfully", {
    //       id: toastId,
    //     });
    //   }
    // } catch (error) {
    //   const err = error as TError;
    //   toast.error(err.message || "Error creating semester:", {
    //     id: toastId,
    //   });
    // }
  };

  return (
    <PHForm
      onSubmit={onsSubmit}
    //   resolver={zodResolver(semesterRegistrationSchema)}
    >
      <PHSelect
        name="academicSemester"
        label="Academic Semester"
        options={academicSemesterOptions}
      />
      <PHSelect
        name="status"
        label="Status"
        options={semesterRegistrationStatusOptions}
      />
      <PHDatePicker name="startDate" label="Start Date" />
      <PHDatePicker name="endDate" label="End Date" />
      <PHInput name="minCredit" label="Min Credit" type="number" />
      <PHInput name="maxCredit" label="Max Credit" type="number" />
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        // disabled={isLoading}
      >
        Create
      </Button>
    </PHForm>
  );
};

export default SemesterRegistration;
