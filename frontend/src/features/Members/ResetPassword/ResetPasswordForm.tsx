import { ResetPasswordPageStyled } from "./styled";
import api from "@/util/chek";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button, Space, Spin, Typography } from "antd"; // Importing Ant Design components

const { Title } = Typography;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [userid, setUserId] = useState<string | null>();
  const { id } = router.query;
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (typeof id === "string") {
      setUserId(id);
    }
  }, [id]);

  const resetUserPassword = async (
    currentUserId: string,
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
      const response = await api.post("/user/update/password", {
        userid: currentUserId,
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
      setPasswordResetError("User identifier not available.");
    }
  };

  const isButtonDisabled =
    password.length > 0 &&
    password2.length > 0 &&
    password === password2 &&
    !loading;

  if (loading) {
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
          <Title level={2}>비밀번호 재설정</Title>
          <p style={{ color: "red" }}>{passwordResetError}</p>
        </div>
      </div>
    );
  }

  if (!userid) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
      >
        <div>
          <Title level={2}>비밀번호 재설정</Title>
          <p>
            사용자 식별 정보를 확인할 수 없습니다. 유효한 비밀번호 재설정 링크를
            다시 한번 확인하여 주시기 바랍니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResetPasswordPageStyled>
      <div>
        <h1>비밀번호 재설정</h1>
        <p>새로운 비밀번호를 아래에 입력해주세요.</p>
        <form onSubmit={submitHandler}>
          <div className="reset-password-container">
            <div className="input-container">
              <Space
                direction="vertical"
                size="middle"
                style={{ textAlign: "center" }}
              >
                {passwordResetError && (
                  <p style={{ color: "red" }}>{passwordResetError}</p>
                )}

                <Input.Password
                  className="new-password-input"
                  placeholder="새로운 비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input.Password
                  className="confirm-password-input"
                  placeholder="새로운 비밀번호 재입력"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </Space>
            </div>

            <div className="button-container">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isButtonDisabled}
                loading={loading}
              >
                비밀번호 변경
              </Button>
            </div>
            {/* </Space> */}
          </div>
        </form>
      </div>
    </ResetPasswordPageStyled>
  );
}
