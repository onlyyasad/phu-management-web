import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button } from "antd";

const CreateAcademicSemester = () => {
  const onsSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <PHForm onSubmit={onsSubmit}>
      <PHInput type="text" name="title" label="Title" />
      <Button type="primary" htmlType="submit" block>
        Create Semester
      </Button>
    </PHForm>
  );
};

export default CreateAcademicSemester;
