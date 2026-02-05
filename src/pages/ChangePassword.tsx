import { Button, Card } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import type { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import type { TError } from "../types/global.types";

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Changing password...");

    try {
      const res = await changePassword(data).unwrap();
      if (res?.success) {
        toast.success("Password changed successfully!", { id: toastId });
        dispatch(logout());
      } else {
        toast.error("Failed to change password!", { id: toastId });
      }
    } catch (error) {
      const errorResponse = error as TError;
      const errorMessage =
        errorResponse?.message || "An error occurred while changing password!";
      toast.error(errorMessage, {
        id: toastId,
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
        <h2 style={{ textAlign: "center" }}>Change Password</h2>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="password" name="oldPassword" label="Old Password" />
          <PHInput type="password" name="newPassword" label="New Password" />
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Change Password
          </Button>
        </PHForm>
      </Card>
    </div>
  );
};

export default ChangePassword;
