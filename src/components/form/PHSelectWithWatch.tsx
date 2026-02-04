import { Form, Select } from "antd";
import type React from "react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
type TProps = {
  name: string;
  options: TOption[];
  label?: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  mode?: "multiple" | "tags";
};

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const PHSelectWithWatch: React.FC<TProps> = ({
  label,
  name,
  options,
  disabled,
  mode,
  placeholder,
  handleChange,
}) => {
  const { control } = useFormContext();

  const courseId = useWatch({
    control,
    name: "course",
  });

  useEffect(() => {
    if (handleChange) {
      handleChange(courseId);
    }
  }, [courseId]);

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
              placeholder={
                placeholder ?? (label ? `Select ${label}` : "Select")
              }
            />
          </Form.Item>
        </div>
      )}
    />
  );
};

export default PHSelectWithWatch;
