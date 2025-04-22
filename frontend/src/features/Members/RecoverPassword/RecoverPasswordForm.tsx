import { useState } from "react";
import { RecoverPasswordPageStyled } from "./styled";
import { Input, notification } from "antd";
import api from "@/util/chek";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RecoverPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("유효한 이메일 주소를 입력해 주세요.")
    .required("이메일 주소를 입력해 주세요."),
});

export default function RecoverPasswordPage() {
  const router = useRouter();

  const sendPasswordRecoveryEmail = async (email: string) => {
    // 비밀번호 재설정 요청 이메일로
    try {
      const response = await api.post("/user/findUserEmail", {
        email: email,
      });
      // if successful result: true else result: false
      if (response.data.id) {
        router.push("/forgot-password/password-recovery-feedback");
      } else {
        notification.error({
          message: ":(",
          description: "등록되어있는 이메일이 아닙니다.",
          duration: 3,
        });
      }
    } catch (error: any) {
      console.error("Error sending password recovery email:", error);
    }
  };

  return (
    <RecoverPasswordPageStyled>
      <h1>비밀번호 찾기</h1>
      <p>비밀번호 재설정을 위해 아래에 이메일 주소를 입력해 주세요.</p>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={RecoverPasswordSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values, { setSubmitting }) => {
          sendPasswordRecoveryEmail(values.email);
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
        }) => (
          <Form className="recover-password-container">
            <div className="input-container">
              <Input
                type="email"
                name="email"
                placeholder="이메일 주소를 입력해 주십시오."
                className={`email-input ${
                  touched.email && errors.email ? "input-error" : ""
                }`}
                value={values.email}
                onChange={(e) => {
                  handleChange(e); // updates Formik value
                  setFieldTouched("email", true, false); // mark as touched
                  validateField("email"); // force validation
                }}
                onBlur={handleBlur}
                aria-label="Email Address"
              />
              {touched.email && errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="button-container">
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Submit Password Recovery Request"
              >
                비밀번호 재설정 이메일 보내기
              </button>
            </div>
            <a href="/login">비밀번호를 기억하시나요? 로그인</a>
          </Form>
        )}
      </Formik>
    </RecoverPasswordPageStyled>
  );
}
