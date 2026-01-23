import { Button, Card } from "antd";
import { type FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, type TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.info("Logging in...");
    try {
      const res = await login(data).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login successful!", { id: toastId, duration: 3000 });
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.", {
        id: toastId,
        duration: 3000,
      });
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
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="id" label="id" />
          <PHInput type="password" name="password" label="password" />
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Login
          </Button>
        </PHForm>
      </Card>
    </div>
  );
};

export default Login;
