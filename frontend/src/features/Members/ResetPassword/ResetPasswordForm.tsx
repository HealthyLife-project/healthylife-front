import { ResetPasswordPageStyled } from "./styled";
import api from "@/util/chek";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Assuming you are using React Router
import { useRouter } from "next/router";
import { Input, Button, Space, Spin, Typography } from "antd"; // Importing Ant Design components

const { Title } = Typography;

export default function ResetPasswordPage() {
  const { email } = useParams(); // Get the emailOrUsername from the URL params
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState<string | null>(
    null
  );

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      setLoading(true);
      setPasswordResetError(null);
      try {
        // 해당 이메일로 유저한테 비밀번호 재설정 링크보낸후 리다이렉트
        // 해당 이메일로 유저 정보가 저장되어있는지 확인$
        // /forgot-password/reset-password
        const response = await api.get(`/auth/user/${email}`);
        if (response.data.result && response.data.userid) {
          if (mounted) {
            const fetchedUser = response.data;

            setUser(fetchedUser);
            setUserId(fetchedUser.userid);
          }
        } else {
          setPasswordResetError("Invalid or expired reset link."); // Handle case where user is not found
        }
      } catch (error: any) {
        console.error("Error fetching user:", error);
        setPasswordResetError("Failed to fetch user details.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [email]);

  const resetUserPassword = async (
    userid: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    setLoading(true);
    setPasswordResetError(null);
    try {
      if (newPassword !== confirmPassword) {
        setPasswordResetError("비밀번호가 일치 하지 않습니다.");
        return;
      }
      // 비밀번호 재설정 api
      const response = await api.post("/auth/reset-password", {
        userid: userid,
        password: newPassword,
      });
      if (response.data.result) {
        console.log("Password reset successful:", response);
        router.push("/login");
      } else if (response.data.message) {
        setPasswordResetError(response.data.message);
      } else {
        setPasswordResetError("비밀번호 재설정 실패하였습니다.");
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
      setPasswordResetError("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (userid) {
      resetUserPassword(userid, password, password2);
    } else {
      setPasswordResetError("User details not loaded yet.");
    }
  };

  const isButtonDisabled =
    password.length > 0 &&
    password2.length > 0 &&
    password === password2 &&
    !loading;

  if (loading && !user && !passwordResetError) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
      >
        <Spin />
      </div>
    );
  }

  if (passwordResetError) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
      >
        <div>
          <Title level={2}>Reset Password</Title>
          <p style={{ color: "red" }}>{passwordResetError}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
      >
        <div>
          <Title level={2}>Reset Password</Title>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <ResetPasswordPageStyled>
      <div>
        Reset Password
        <form onSubmit={submitHandler}>
          <Space
            direction="vertical"
            size="middle"
            style={{ textAlign: "center" }}
          >
            {passwordResetError && (
              <p style={{ color: "red" }}>{passwordResetError}</p>
            )}
            <Input.Password
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input.Password
              placeholder="Confirm password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isButtonDisabled}
              loading={loading}
            >
              Change Password
            </Button>
          </Space>
        </form>
      </div>
    </ResetPasswordPageStyled>
  );
}
