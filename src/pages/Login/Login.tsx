import { Form, Input, Button, Card } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";

interface LoginFormData {
  id: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { id: "", password: "" },
  });
  const [login, { data, error, isLoading }] = useLoginMutation();

  console.log(data, error);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      console.log("Login successful");
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card style={{ width: 400 }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item
            label="ID"
            validateStatus={errors.id ? "error" : ""}
            help={errors.id?.message}
          >
            <Controller
              name="id"
              control={control}
              rules={{ required: "Please input your ID!" }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: "Please input your password!" }}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
