import { ResetPasswordPageStyled } from "./styled";
import api from "@/util/chek";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button, Space, Spin, Typography, notification } from "antd"; // Importing Ant Design components
import { current } from "@reduxjs/toolkit";
import { data } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik"; // Added

const { Title } = Typography;

// Yup Schema for Reset Password
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .max(16, "비밀번호는 최대 16자 이하이어야 합니다")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
      "비밀번호는 영문 대소문자, 숫자, 특수 문자를 포함해야 합니다."
    )
    .required("새로운 비밀번호는 필수입니다"),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "새로운 비밀번호가 일치하지 않습니다")
    .required("새로운 비밀번호 확인은 필수입니다"),
});

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
      console.log("prior to post request", {
        userid: currentUserId,
        password: newPassword,
      });
      // 비밀번호 재설정 api
      const passwordData = {
        userid: currentUserId,
        password: newPassword,
        passwordCheck: confirmPassword,
      };
      const response = await api.post("/user/update/password", passwordData);
      console.log("userid, password", currentUserId, newPassword);
      const { result, message } = response.data;
      if (result) {
        console.log("Password reset successful:", response);
        notification.success({
          // Success notification
          message: "비밀번호 변경 완료",
          description:
            "비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.",
          duration: 3, // Display for 3 seconds
        });
        router.push("/login");
      } else if (!result) {
        console.log("response.data.message", response);
        setPasswordResetError(message);
        notification.error({
          // Error notification
          message: "비밀번호 변경 실패",
          description:
            message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
          duration: 5, // Display for 5 seconds
        });
      } else {
        setPasswordResetError(message);
        notification.error({
          // Error notification
          message: "비밀번호 변경 실패",
          description:
            message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
          duration: 5, // Display for 5 seconds
        });
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
      setPasswordResetError("Failed to reset password.");
      notification.error({
        // Error notification for network or other errors
        message: "오류 발생",
        description:
          "비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

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
          <p
            style={{
              color: "red",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {passwordResetError}
          </p>
        </div>
      </div>
    );
  }

  if (!userid) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "4rem 0",
          textAlign: "center",
        }}
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
        <Formik
          initialValues={{
            password: "",
            password2: "",
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values) => {
            resetUserPassword(userid!, values.password, values.password2);
          }}
        >
          {(
            formikProps: FormikProps<{ password: string; password2: string }>
          ) => (
            <Form>
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
                    {/*  비밀번호 입력창 + 오류메시지 */}
                    <Field
                      type="password"
                      name="password"
                      placeholder="새로운 비밀번호"
                      as={Input.Password}
                      className="new-password-input"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      render={(msg) => (
                        <div className="error-message" style={{ color: "red" }}>
                          {msg}
                        </div>
                      )}
                    />
                    {/* 비밀번호 확인 입력창 + 오류메시지 */}
                    <Field
                      type="password"
                      name="password2"
                      placeholder="새로운 비밀번호 재입력"
                      as={Input.Password}
                      className="confirm-password-input"
                    />
                    <ErrorMessage
                      name="password2"
                      component="div"
                      render={(msg) => (
                        <div className="error-message" style={{ color: "red" }}>
                          {msg}
                        </div>
                      )}
                    />
                    {formikProps.touched.password &&
                      formikProps.touched.password2 &&
                      !formikProps.errors.password &&
                      !formikProps.errors.password2 &&
                      formikProps.values.password !== "" &&
                      formikProps.values.password ===
                        formikProps.values.password2 && (
                        <div
                          className="error-message"
                          style={{ color: "green" }}
                        >
                          비밀번호가 일치합니다
                        </div>
                      )}
                  </Space>
                </div>

                <div className="button-container">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={formikProps.isSubmitting}
                    loading={loading}
                  >
                    비밀번호 변경
                  </Button>
                </div>
                {/* </Space> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ResetPasswordPageStyled>
  );
}
