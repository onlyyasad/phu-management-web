import { Form, Select } from "antd";
import type React from "react";
import { Controller } from "react-hook-form";
type TProps = {
  name: string;
  label?: string;
  options: TOption[];
};

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const PHSelect: React.FC<TProps> = ({ label, name, options }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Form.Item
            label={label}
            name={name}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <Select
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
            />
          </Form.Item>
        </div>
      )}
    />
  );
};

export default PHSelect;
