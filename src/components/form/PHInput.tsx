import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput: React.FC<TProps> = ({ type, name, label }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Controller
        name={name}
        rules={{
          required: label
            ? `Please input your ${label.charAt(0).toUpperCase() + label.slice(1)}!`
            : "This field is required!",
        }}
        render={({ field }) => (
          <Form.Item label={label} name={name}>
            <Input {...field} type={type} id={name} style={{ width: "100%" }} size="large" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
