import { SignupPageStyled } from "./styled";

import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface SignupPageValues {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const SignupPage: React.FC = () => {
  const initialValues: SignupPageValues = {
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("유효한 이메일 주소를 입력하세요")
      .required("이메일은 필수입니다"),
    password: Yup.string()
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .required("비밀번호는 필수입니다"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다")
      .required("비밀번호 확인은 필수입니다"),
    nickname: Yup.string().required("닉네임은 필수입니다"),
  });

  const handleSubmit = async (
    values: SignupPageValues,
    { setSubmitting, setStatus }: FormikHelpers<SignupPageValues>
  ) => {
    try {
      console.log("vaules from signup", values);
      const response = await axios.post(
        "http://localhost:5001/user/signup",
        values
      );
      console.log("response.data", response.data); // Log response from backend
      setStatus({ success: true, message: "회원가입 성공!" }); // Set success message
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("회원가입 실패:", error.response?.data || error.message);
        setStatus({
          success: false,
          message: error.response?.data?.message || "회원가입 실패",
        });
      } else {
        console.error("회원가입 실패:", error);
        setStatus({ success: false, message: "회원가입 실패" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SignupPageStyled>
      <div className="signup-page-container">
        회원가입 페이지
        <Formik<SignupPageValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="email">이메일</label>
              <Field type="email" id="email" name="email" />

              <label htmlFor="password">비밀번호</label>
              <Field type="password" id="password" name="password" />

              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />

              <label htmlFor="nickname">닉네임</label>
              <Field type="text" id="nickname" name="nickname" />

              <button type="submit" disabled={isSubmitting}>
                회원가입
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
