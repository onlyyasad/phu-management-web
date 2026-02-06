import moment from "moment";
import { Card, Button, Row, Col, Typography, Space } from "antd";
import {
  useEnrollInCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "../../redux/features/student/courseManagement.api";
import { toast } from "sonner";
import type { TError } from "../../types/global.types";

type TModifiedData = {
  courseTitle: string;
  sections: {
    section: number;
    _id: string;
    startTime: string;
    endTime: string;
    days: string[];
  }[];
};

type TPreProcessedData = {
  [key: string]: TModifiedData;
};
const OfferedCourse = () => {
  const {
    data: offeredCourses,
    isLoading,
    isError,
    error,
  } = useGetMyOfferedCoursesQuery(undefined);

  const [enrollInCourse, { isLoading: isEnrolling }] =
    useEnrollInCourseMutation();

  const singleObject = offeredCourses?.data?.reduce((acc, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      startTime: item.startTime,
      endTime: item.endTime,
      days: item.days,
    });
    return acc;
  }, {} as TPreProcessedData);

  const modifiedData = Object.values(singleObject || {});

  const handleEnroll = async (sectionId: string) => {
    const toastId = toast.loading("Enrolling in course...");
    const payload = {
      offeredCourse: sectionId,
    }

    try {
      const res = await enrollInCourse(payload).unwrap();
      if (res.success) {
        toast.success("Successfully enrolled in course", { id: toastId });
      }
    } catch (error) {
      const errResponse = error as TError;
      toast.error(errResponse.message || "Failed to enroll in course", {
        id: toastId,
      });
    }
  };

  if (isLoading) return <div>Loading offered courses...</div>;
  if (isError)
    return <div>Error loading courses: {String(error ?? "Unknown error")}</div>;

  return (
    <Space orientation="vertical" size="middle" style={{ display: "flex" }}>
      {modifiedData.length === 0 && (
        <Typography.Text>No offered courses found.</Typography.Text>
      )}

      {modifiedData.map((course) => (
        <Card
          key={course.courseTitle}
          title={
            <Typography.Title level={4} style={{ margin: 0 }}>
              {course.courseTitle}
            </Typography.Title>
          }
        >
          <Space orientation="vertical" size="small" style={{ width: "100%" }}>
            {course.sections.map((sec) => (
              <Row
                key={sec._id}
                align="middle"
                justify="space-between"
                style={{ background: "#fafafa", padding: 12, borderRadius: 6 }}
              >
                <Col flex="auto">
                  <Typography.Text strong>
                    Section {sec.section}
                  </Typography.Text>
                  <div style={{ marginTop: 8 }}>
                    <Row gutter={24}>
                      <Col>
                        <Typography.Text type="secondary">Days</Typography.Text>
                        <div>
                          <Typography.Text>
                            {sec.days.join(", ")}
                          </Typography.Text>
                        </div>
                      </Col>

                      <Col>
                        <Typography.Text type="secondary">
                          Class
                        </Typography.Text>
                        <div>
                          <Typography.Text>
                            {moment(sec.startTime, [
                              "HH:mm",
                              "HH:mm:ss",
                              "H:mm",
                            ]).format("h:mm A")}{" "}
                            -{" "}
                            {moment(sec.endTime, [
                              "HH:mm",
                              "HH:mm:ss",
                              "H:mm",
                            ]).format("h:mm A")}
                          </Typography.Text>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col>
                  <Button
                    type="primary"
                    onClick={() => handleEnroll(sec._id)}
                    disabled={isEnrolling}
                  >
                    Enroll
                  </Button>
                </Col>
              </Row>
            ))}
          </Space>
        </Card>
      ))}
    </Space>
  );
};

export default OfferedCourse;
