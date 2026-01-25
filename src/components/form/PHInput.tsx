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
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            name={name}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <Input
              {...field}
              type={type}
              id={name}
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
