import { Form, Select } from "antd";
import type React from "react";
import { Controller } from "react-hook-form";
type TProps = {
  name: string;
  options: TOption[];
  label?: string;

  disabled?: boolean;
  mode?: "multiple" | "tags";
};

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const PHSelect: React.FC<TProps> = ({
  label,
  name,
  options,
  disabled,
  mode,
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <Select
              mode={mode}
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        </div>
      )}
    />
  );
};

export default PHSelect;
