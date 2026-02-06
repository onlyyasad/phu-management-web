import moment from "moment";
import { Card, Row, Col, Typography, Space, Badge } from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/courseManagement.api";
import type { TMyEnrolledCourse } from "../../types/myEnrolledCourse.types";

const MySchedule = () => {
  const { data, isLoading, isError } = useGetMyEnrolledCoursesQuery(undefined);

  if (isLoading) return <div>Loading your schedule...</div>;
  if (isError) return <div>Error loading your schedule</div>;

  const enrolledCourses = data?.data as TMyEnrolledCourse[];

  return (
    <Space orientation="vertical" size="middle" style={{ display: "flex" }}>
      {!enrolledCourses ||
        (enrolledCourses.length === 0 && (
          <Typography.Text>No enrolled courses found.</Typography.Text>
        ))}

      {enrolledCourses?.map((item) => (
        <Card
          key={item._id}
          title={
            <Typography.Title level={4} style={{ margin: 0 }}>
              {item.course.title}
            </Typography.Title>
          }
        >
          <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            {/* Schedule Details */}
            <div style={{ background: "#fafafa", padding: 12, borderRadius: 6 }}>
              <Typography.Text strong style={{ display: "block", marginBottom: 12 }}>
                Schedule Details
              </Typography.Text>
              <Row gutter={[32, 16]}>
                <Col span={6}>
                  <div>
                    <Typography.Text type="secondary">Section</Typography.Text>
                    <div>
                      <Badge
                        color="blue"
                        text={
                          <Typography.Text strong>
                            {item.offeredCourse.section}
                          </Typography.Text>
                        }
                      />
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <Typography.Text type="secondary">Faculty</Typography.Text>
                    <div>
                      <Typography.Text>{item.faculty.fullName}</Typography.Text>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <Typography.Text type="secondary">Days</Typography.Text>
                    <div>
                      <Typography.Text>
                        {item.offeredCourse.days.join(", ")}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <Typography.Text type="secondary">Class Time</Typography.Text>
                    <div>
                      <Typography.Text>
                        {moment(item.offeredCourse.startTime, [
                          "HH:mm",
                          "HH:mm:ss",
                          "H:mm",
                        ]).format("h:mm A")}{" "}
                        -{" "}
                        {moment(item.offeredCourse.endTime, [
                          "HH:mm",
                          "HH:mm:ss",
                          "H:mm",
                        ]).format("h:mm A")}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Results Section */}
            {item.isCompleted && (
              <div style={{ background: "#f6f8fb", padding: 12, borderRadius: 6 }}>
                <Typography.Text strong style={{ display: "block", marginBottom: 12 }}>
                  Results
                </Typography.Text>
                <Row gutter={[32, 16]}>
                  <Col span={6}>
                    <div>
                      <Typography.Text type="secondary">Class Test 1</Typography.Text>
                      <div>
                        <Typography.Text>{item.courseMarks.classTest1}</Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Typography.Text type="secondary">Mid Term</Typography.Text>
                      <div>
                        <Typography.Text>{item.courseMarks.midTerm}</Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Typography.Text type="secondary">Class Test 2</Typography.Text>
                      <div>
                        <Typography.Text>{item.courseMarks.classTest2}</Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Typography.Text type="secondary">Final Term</Typography.Text>
                      <div>
                        <Typography.Text>{item.courseMarks.finalTerm}</Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Typography.Text type="secondary">Grade</Typography.Text>
                      <div>
                        <Typography.Text strong>{item.grade}</Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Typography.Text type="secondary">Grade Points</Typography.Text>
                      <div>
                        <Typography.Text>{item.gradePoints}</Typography.Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Space>
        </Card>
      ))}
    </Space>
  );
};

export default MySchedule;
