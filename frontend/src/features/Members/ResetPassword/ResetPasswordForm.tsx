import { ResetPasswordPageStyled } from "./styled";
import api from "@/util/chek";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, notification, Spin, Typography } from "antd";
import * as Yup from "yup";

const { Title } = Typography;

// Yup schema
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .max(16, "비밀번호는 최대 16자 이하이어야 합니다")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
      "영문 대소문자, 숫자, 특수 문자를 포함해야 합니다"
    )
    .required("새로운 비밀번호는 필수입니다"),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "새로운 비밀번호가 일치하지 않습니다")
    .required("새로운 비밀번호 확인은 필수입니다"),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const { id } = router.query;
  const [userid, setUserId] = useState<string | null>(null);
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
        setPasswordResetError("비밀번호가 일치하지 않습니다.");
        return;
      }

      const passwordData = {
        userid: currentUserId,
        password: newPassword,
        passwordCheck: confirmPassword,
      };

      const response = await api.post("/user/update/password", passwordData);
      const { result, message } = response.data;

      if (result) {
        notification.success({
          message: "비밀번호 변경 완료",
          description:
            "비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.",
          duration: 3,
        });
        router.push("/login");
      } else {
        setPasswordResetError(message);
        notification.error({
          message: "비밀번호 변경 실패",
          description:
            message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
          duration: 5,
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setPasswordResetError("비밀번호 변경에 실패하였습니다.");
      notification.error({
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

  if (!userid) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}
      >
        <div>
          <Title level={2}>비밀번호 재설정</Title>
          <p>유효한 사용자 식별자를 찾을 수 없습니다. 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <ResetPasswordPageStyled>
      <h1>비밀번호 재설정</h1>
      <p>새로운 비밀번호를 입력하여 비밀번호를 재설정하세요.</p>

      <Formik
        initialValues={{ password: "", password2: "" }}
        validationSchema={ResetPasswordSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values, { setSubmitting }) => {
          resetUserPassword(userid, values.password, values.password2);
          setSubmitting(false);
        }}
      >
        {({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          setFieldTouched,
          validateField,
        }) => (
          <Form>
            <div className="reset-password-container">
              <div className="input-container">
                <Field
                  type="password"
                  name="password"
                  placeholder="새로운 비밀번호"
                  as={Input.Password}
                  className={`new-password-input ${
                    touched.password && errors.password ? "input-error" : ""
                  }`}
                  value={values.password}
                  onChange={(e: any) => {
                    handleChange(e);
                    setFieldTouched("password", true, false);
                    validateField("password"); // Manually trigger validation for this field
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />
              </div>

              <div className="input-container">
                <Field
                  type="password"
                  name="password2"
                  placeholder="새로운 비밀번호 확인"
                  as={Input.Password}
                  className={`confirm-password-input ${
                    errors.password2 && touched.password2 ? "input-error" : ""
                  }`}
                  value={values.password2}
                  onChange={(e: any) => {
                    handleChange(e);
                    setFieldTouched("password2", true, false);
                    validateField("password2"); // Manually trigger validation for this field
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="password2"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />
                {touched.password &&
                  touched.password2 &&
                  !errors.password &&
                  !errors.password2 &&
                  values.password &&
                  values.password === values.password2 && (
                    <div className="success-message">
                      비밀번호가 일치합니다.
                    </div>
                  )}
              </div>

              <div className="button-container">
                <button type="submit">비밀번호 변경</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ResetPasswordPageStyled>
  );
}
