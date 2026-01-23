import { Input } from "antd";
import { Controller } from "react-hook-form";

type TProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput: React.FC<TProps> = ({ type, name, label }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          htmlFor={name}
          style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
        >
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
      )}
      <Controller
        name={name}
        rules={{ required: label ? `Please input your ${label.charAt(0).toUpperCase() + label.slice(1)}!` : "This field is required!" }}
        render={({ field }) => (
          <Input {...field} type={type} id={name} style={{ width: "100%" }} />
        )}
      />
    </div>
  );
};

export default PHInput;
