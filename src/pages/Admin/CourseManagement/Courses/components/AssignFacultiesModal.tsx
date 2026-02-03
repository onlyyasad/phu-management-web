import { Button, Modal } from "antd";
import { useState } from "react";
import PHForm from "../../../../../components/form/PHForm";
import PHSelect from "../../../../../components/form/PHSelect";
import { toast } from "sonner";
import type { TError, TResponse } from "../../../../../types/global.types";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultiesQuery } from "../../../../../redux/features/admin/userManagement.api";
import { useAssignFacultiesMutation } from "../../../../../redux/features/admin/courseManagement.api";

const AssignFacultiesModal = ({ courseId }: { courseId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading: isFacultiesLoading } =
    useGetAllFacultiesQuery(undefined);
  const [assignFaculties, { isLoading: isAssigning }] =
    useAssignFacultiesMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const facultiesOptions =
    data?.data.map((faculty) => ({
      label: faculty.fullName,
      value: faculty._id,
    })) || [];

  const onsSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Assigning faculties...");

    const payload = {
      courseId,
      data,
    };

    try {
      const res = (await assignFaculties(payload).unwrap()) as TResponse<any>;

      if (res.success) {
        toast.success("Faculties assigned successfully", {
          id: toastId,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      const err = error as TError;
      toast.error(err.message || "Error assigning faculties:", {
        id: toastId,
      });
    }
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Assign Faculties
      </Button>
      <Modal
        title="Assign Faculties"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <PHForm onSubmit={onsSubmit}>
          <PHSelect
            name="faculties"
            label="Faculties"
            mode="multiple"
            placeholder="Select Faculties"
            options={facultiesOptions}
            disabled={isFacultiesLoading}
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isAssigning}
          >
            Assign
          </Button>
        </PHForm>
      </Modal>
    </div>
  );
};

export default AssignFacultiesModal;
