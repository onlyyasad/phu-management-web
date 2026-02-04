import { TimePicker, Form } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
};

const format = "h:mm a";

const PHTimePicker: React.FC<TProps> = ({ name, label }) => {
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
            <TimePicker.RangePicker {...field} use12Hours format={format} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
