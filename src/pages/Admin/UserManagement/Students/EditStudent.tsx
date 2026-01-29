import { useParams, useNavigate } from "react-router";
import { Button, Col, Divider, Form, Input, Row, Spin, Alert } from "antd";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import {
  useEditStudentMutation,
  useGetStudentByIdQuery,
} from "../../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import type { TError } from "../../../../types/global.types";
import dayjs from "dayjs";

const EditStudent = () => {
  const router = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useGetStudentByIdQuery({ studentId: router.id! }, { skip: !router.id });

  const { data: semesterData, isLoading: isSemesterLoading } =
    useGetAllSemestersQuery(undefined);
  const { data: departmentData, isLoading: isDepartmentLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const [editStudent, { isLoading: isEditingStudent }] =
    useEditStudentMutation();

  const semesterOptions = semesterData?.data.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));

  const departmentOptions = departmentData?.data.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  const student = studentData?.data;

  // Format default values from student data
  const defaultValues = student
    ? {
        name: {
          firstName: student.name?.firstName,
          middleName: student.name?.middleName,
          lastName: student.name?.lastName,
        },
        gender: student.gender,
        dateOfBirth: dayjs(student.dateOfBirth),
        bloodGroup: student.bloodGroup,
        email: student.email,
        contactNo: student.contactNo,
        emergencyContactNo: student.emergencyContactNo,
        presentAddress: student.presentAddress,
        permanentAddress: student.permanentAddress,
        guardian: {
          fatherName: student.guardian?.fatherName,
          fatherOccupation: student.guardian?.fatherOccupation,
          fatherContactNo: student.guardian?.fatherContactNo,
          motherName: student.guardian?.motherName,
          motherOccupation: student.guardian?.motherOccupation,
          motherContactNo: student.guardian?.motherContactNo,
        },
        localGuardian: {
          name: student.localGuardian?.name,
          occupation: student.localGuardian?.occupation,
          contactNo: student.localGuardian?.contactNo,
          address: student.localGuardian?.address,
        },
        academicDepartment: student.academicDepartment?._id,
        admissionSemester: student.admissionSemester?._id,
      }
    : undefined;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating student...");

    const studentUpdateData = {
      student: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentUpdateData));

    // Only append file if a new image is selected
    if (data.image && typeof data.image !== "string") {
      formData.append("file", data.image);
    }

    try {
      const result = await editStudent({
        studentId: router.id!,
        payload: formData,
      }).unwrap();
      if (result?.success) {
        toast.success("Student updated successfully", { id: toastId });
        navigate("/admin/students");
      }
    } catch {
      toast.error("Failed to update student", { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    const errorData = error as TError;
    return (
      <Alert
        title="Error"
        description={errorData?.message || "Failed to load student data"}
        type="error"
        showIcon
      />
    );
  }

  return (
    <Row>
      <Col span={24}>
        {defaultValues && (
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <Divider>Personal Info.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.lastName" label="Last Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHDatePicker name="dateOfBirth" label="Date of Birth" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="bloodGroup"
                  label="Blood Group"
                  options={bloodGroupOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="email" name="email" label="Email" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Profile Picture">
                      <Input
                        type="file"
                        accept="image/*"
                        size="large"
                        value={
                          typeof value === "string" ? "" : value?.fileName || ""
                        }
                        {...field}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>

            <Divider>Contact Info.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="contactNo" label="Contact No." />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="emergencyContactNo"
                  label="Emergency Contact No."
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="presentAddress"
                  label="Present Address"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="permanentAddress"
                  label="Permanent Address"
                />
              </Col>
            </Row>

            <Divider>Guardian</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father Contact No."
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherContactNo"
                  label="Mother Contact No."
                />
              </Col>
            </Row>

            <Divider>Local Guardian</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="localGuardian.name" label="Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.occupation"
                  label="Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.contactNo"
                  label="Contact No."
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.address"
                  label="Address"
                />
              </Col>
            </Row>

            <Divider>Academic Info.</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  options={departmentOptions || []}
                  name="academicDepartment"
                  label="Academic Department"
                  disabled={isDepartmentLoading}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  options={semesterOptions || []}
                  name="admissionSemester"
                  label="Admission Semester"
                  disabled={isSemesterLoading}
                />
              </Col>
            </Row>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isEditingStudent}
              loading={isEditingStudent}
            >
              Update Student
            </Button>
          </PHForm>
        )}
      </Col>
    </Row>
  );
};

export default EditStudent;
