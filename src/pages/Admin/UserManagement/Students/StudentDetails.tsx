import { useParams } from "react-router";
import {
  Card,
  Row,
  Col,
  Avatar,
  Descriptions,
  Spin,
  Alert,
  Button,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetStudentByIdQuery } from "../../../../redux/features/admin/userManagement.api";
import type { TError } from "../../../../types/global.types";

const StudentDetails = () => {
  const router = useParams<{ id: string }>();
  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useGetStudentByIdQuery({ studentId: router.id! }, { skip: !router.id });

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !studentData?.data) {
    const errorData = error as TError;
    return (
      <Alert
        title="Error"
        description={errorData?.message || "Failed to load student details"}
        type="error"
        showIcon
      />
    );
  }

  const student = studentData.data;

  return (
    <div style={{ padding: "24px" }}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => window.history.back()}
        style={{ marginBottom: "24px" }}
      >
        Back
      </Button>

      {/* Header Card */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={24} align="middle">
          <Col xs={24} sm={6} style={{ textAlign: "center" }}>
            <Avatar
              src={student.profileImg}
              size={120}
              style={{ marginBottom: "16px" }}
            />
            <div style={{ fontWeight: "600", fontSize: "16px" }}>
              {student.fullName}
            </div>
            <div style={{ color: "#666", fontSize: "14px" }}>
              ID: {student.id}
            </div>
          </Col>
          <Col xs={24} sm={18}>
            <Descriptions column={{ xs: 1, sm: 2 }} size="small">
              <Descriptions.Item label="Email">
                {student.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {student.contactNo}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {student.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Blood Group">
                {student.bloodGroup}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {new Date(student.dateOfBirth).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Emergency Contact">
                {student.emergencyContactNo}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Academic Information */}
      <Card title="Academic Information" style={{ marginBottom: "24px" }}>
        <Descriptions column={{ xs: 1, sm: 2 }} layout="vertical">
          <Descriptions.Item label="Department">
            {student.academicDepartment.name}
          </Descriptions.Item>
          <Descriptions.Item label="Faculty">
            {student.academicFaculty.name}
          </Descriptions.Item>
          <Descriptions.Item label="Admission Semester">
            {student.admissionSemester.name}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Address Information */}
      <Card title="Address Information" style={{ marginBottom: "24px" }}>
        <Descriptions column={{ xs: 1 }} layout="vertical">
          <Descriptions.Item label="Present Address">
            {student.presentAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Permanent Address">
            {student.permanentAddress}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Guardian Information */}
      <Card title="Guardian Information" style={{ marginBottom: "24px" }}>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ marginBottom: "16px", color: "#1890ff" }}>
                Father Information
              </h4>
              <Descriptions column={1} layout="vertical" size="small">
                <Descriptions.Item label="Name">
                  {student.guardian.fatherName}
                </Descriptions.Item>
                <Descriptions.Item label="Occupation">
                  {student.guardian.fatherOccupation}
                </Descriptions.Item>
                <Descriptions.Item label="Contact Number">
                  {student.guardian.fatherContactNo}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div>
              <h4 style={{ marginBottom: "16px", color: "#1890ff" }}>
                Mother Information
              </h4>
              <Descriptions column={1} layout="vertical" size="small">
                <Descriptions.Item label="Name">
                  {student.guardian.motherName}
                </Descriptions.Item>
                <Descriptions.Item label="Occupation">
                  {student.guardian.motherOccupation}
                </Descriptions.Item>
                <Descriptions.Item label="Contact Number">
                  {student.guardian.motherContactNo}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Local Guardian Information */}
      <Card title="Local Guardian Information">
        <Descriptions column={{ xs: 1, sm: 2 }} layout="vertical">
          <Descriptions.Item label="Name">
            {student.localGuardian.name}
          </Descriptions.Item>
          <Descriptions.Item label="Occupation">
            {student.localGuardian.occupation}
          </Descriptions.Item>
          <Descriptions.Item label="Contact Number">
            {student.localGuardian.contactNo}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {student.localGuardian.address}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default StudentDetails;
