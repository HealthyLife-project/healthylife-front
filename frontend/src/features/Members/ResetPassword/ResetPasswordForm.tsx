import { ResetPasswordPageStyled } from "./styled"; // Assuming you're importing the styled component
import { Input, notification } from "antd";
import api from "@/util/chek";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Yup schema for password reset
const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .nullable()
    .min(6, "비밀번호는 6자 이상이어야 합니다.")
    .required("새 비밀번호를 입력해 주세요."),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref("newPassword"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해 주세요."),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

  const sendPasswordResetRequest = async (newPassword: string) => {
    // Password reset request API call
    try {
      const response = await api.post("/user/resetPassword", {
        newPassword: newPassword,
      });
      if (response.data.result) {
        router.push("/login");
      } else {
        notification.error({
          message: ":(",
          description: "비밀번호 재설정에 실패했습니다.",
          duration: 3,
        });
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <ResetPasswordPageStyled>
      <h1>비밀번호 재설정</h1>
      <p>새로운 비밀번호를 입력하여 비밀번호를 재설정하세요.</p>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={ResetPasswordSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values, { setSubmitting }) => {
          sendPasswordResetRequest(values.newPassword);
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldTouched,
          validateField,
          values,
        }) => {
          useEffect(() => {
            if (
              touched.newPassword &&
              touched.confirmPassword &&
              values.newPassword === values.confirmPassword &&
              !errors.confirmPassword
            ) {
              setPasswordMatchMessage("비밀번호가 일치합니다.");
            } else {
              setPasswordMatchMessage("");
            }
          }, [
            values.newPassword,
            values.confirmPassword,
            touched.newPassword,
            touched.confirmPassword,
            errors.confirmPassword,
          ]);
          return (
            <Form className="reset-password-container">
              <div className="input-container">
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="새 비밀번호"
                  className={`new-password-input ${
                    touched.newPassword && errors.newPassword
                      ? "input-error"
                      : ""
                  }`}
                  value={values.newPassword}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("newPassword", true, false);
                    validateField("newPassword");
                  }}
                  onBlur={handleBlur}
                  aria-label="New Password"
                />
                {touched.newPassword && errors.newPassword && (
                  <div className="error-message">{errors.newPassword}</div>
                )}
              </div>

              <div className="input-container">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  className={`confirm-password-input ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                  value={values.confirmPassword}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("confirmPassword", true, false);
                    validateField("confirmPassword");
                  }}
                  onBlur={handleBlur}
                  aria-label="Confirm Password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
                {passwordMatchMessage && (
                  <div className="success-message">{passwordMatchMessage}</div>
                )}
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Submit Password Reset Request"
                >
                  비밀번호 재설정
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </ResetPasswordPageStyled>
  );
}
