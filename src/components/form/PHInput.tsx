import { Input } from "antd";
import { Controller } from "react-hook-form";

type TProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput: React.FC<TProps> = ({ type, name, label }) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label.toUpperCase()}</label>}
      <Controller
        name={name}
        rules={{ required: "Please input your ID!" }}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PHInput;
