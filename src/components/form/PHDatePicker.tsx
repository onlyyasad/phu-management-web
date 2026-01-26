import { DatePicker, Form } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
};

const PHDatePicker: React.FC<TProps> = ({ name, label }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <DatePicker
              {...field}
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

export default PHDatePicker;
