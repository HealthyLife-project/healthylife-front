import { SignupPageStyled, FormItem, FormLabel } from "./styled";

import React from "react";
import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  ErrorMessage,
  useFormikContext,
} from "formik";
import { Button, Divider, Input } from "antd";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import api from "@/util/chek";
import { useRouter } from "next/router";

interface SignupPageValues {
  userid: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  nickname: string;
  age: number | undefined;
  gender: "남성" | "여성";
  phone: string;
  address: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();

  const initialValues: SignupPageValues = {
    userid: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    nickname: "",
    age: undefined,
    gender: "남성",
    phone: "",
    address: "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    userid: Yup.string()
      .min(4, "4자 이상 입력해주세요!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "아이디에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("아이디는 필수입니다"),

    password: Yup.string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .max(16, "비밀번호는 최대 16자 이하이어야 합니다")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
        "비밀번호는 영문 대소문자, 숫자, 특수 문자를 포함해야 합니다."
      )
      .required("비밀번호는 필수입니다"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다")
      .required("비밀번호 확인은 필수입니다"),

    name: Yup.string().min(2, "이름은 2글자 이상이여야 합니다"),

    email: Yup.string()
      .email("유효한 이메일 주소를 입력하세요")
      .required("이메일은 필수입니다"),

    nickname: Yup.string().required("닉네임은 필수입니다"),

    age: Yup.number()
      .integer("나이는 숫자여야 합니다")
      .min(1, "1 보다 커야합니다")
      .max(150, "150 미만 이여야합니다"),

    gender: Yup.string().oneOf(
      ["male", "female"],
      "성별은 남성 혹은 여성이여야 합니다"
    ),

    phone: Yup.string()
      .required("휴대폰 번호를 입력해주세요.")
      .matches(phoneRegExp, "휴대폰 번호를 입력해주세요."),

    address: Yup.string().required("주소를 입력해 주세요"),
  });

  // 아이디 중복확인
  const [useridAvailability, setUseridAvailability] = useState<{
    result: boolean;
    message: string;
  } | null>(null);

  // 닉네임 중복확인
  const [nicknameAvailability, setNicknameAvailability] = useState<{
    result: boolean;
    message: string;
  } | null>(null);

  // const checkUseridAvailability = async (userid: string) => {
  //   try {
  //     const response = await api.get(`/user/finduser/${userid}`);
  //     const { result, message } = response.data;
  //     // const result = response.data.result;
  //     // const message = response.data.message;

  //     setUseridAvailability({ result, message });

  //     // setUseridAvailability();
  //     // console.log("userid response data", response.data);
  //   } catch (error) {
  //     // error
  //     // const response = await api.get(`/user/finduser/${userid}`);
  //     // const result = response.data.result;
  //     // const message = response.data.message;

  //     // setUseridAvailability({ result: result, message: message });
  //     console.error("Error checking user ID:", error);
  //   }
  // };

  const checkUseridAvailability = async (userid: string) => {
    try {
      const response = await api.get(`/user/finduser/${userid}`);
      const { result, message } = response.data;
      setUseridAvailability({ result, message });
      console.log("useridAvailability updated:", { result, message });
      console.log("userid response data", response.data);
    } catch (error: any) {
      console.error("Error checking user ID:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setUseridAvailability({
          result: false,
          message: error.response.data.message,
        });
        console.log("useridAvailability updated (error):", {
          result: false,
          message: error.response.data.message,
        });
      } else {
        setUseridAvailability({
          result: false,
          message: error.response.data.message,
        }); // Default error message
        console.log("useridAvailability updated (error - generic):", {
          result: false,
          message: error.response.data.message,
        });
      }
    }
  };

  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await api.get(`/user/findnickname/${nickname}`);

      console.log("response nickname", response.data);
      setNicknameAvailability(response.data);
    } catch (error) {
      console.error("Error checking nickname:", error);
      setNicknameAvailability({
        result: false,
        message: "Error checking nickname",
      });
    }
  };

  const handleSubmit = async (
    values: SignupPageValues,
    { setSubmitting, setStatus }: FormikHelpers<SignupPageValues>
  ) => {
    try {
      console.log("values prior to axios request", values);
      const response = await api.post("/user/signup", values);
      console.log("response.data", response.data); // Log response from backend
      setStatus({ success: true, message: "회원가입 성공!" }); // Set success message
      alert("회원가입 성공");

      router.push("/");
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
    <>
      <SignupPageStyled>
        <div className="signup-page-container">
          <h1>회원가입</h1>
          <Formik<SignupPageValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
          >
            {/* touched: boolean values; 유저의 행동을 주시함*/}
            {/* true: if the user has focused on and then blurred the field */}
            {/* false: if the user has not yet interacted with the field in this way */}
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
            }) => (
              <Form>
                <FormItem>
                  <FormLabel htmlFor="userid">아이디</FormLabel>
                  <div className="input-with-button-container">
                    <Field type="text" id="userid" name="userid" />
                    <Button
                      onClick={() => checkUseridAvailability(values.userid)}
                      disabled={!!errors.userid}
                    >
                      중복확인
                    </Button>
                  </div>
                </FormItem>

                <ErrorMessage
                  name="userid"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />
                {useridAvailability && (
                  <div
                    className="error-message"
                    style={{
                      color: useridAvailability.result ? "green" : "red",
                    }}
                  >
                    {useridAvailability.message}
                  </div>
                )}
                {/* <ErrorMessage
                  name="userid"
                  render={(msg) => (
                    <UseridErrorMessage
                      yupErrorMessage={msg}
                      useridAvailability={useridAvailability}
                    />
                  )}
                /> */}
                {/* <ErrorMessage name="userid">
                  {(msg) => (
                    <UseridErrorMessage
                      yupErrorMessage={msg}
                      useridAvailability={useridAvailability}
                    />
                  )}
                </ErrorMessage> */}
                {/* <ErrorMessage name="userid" component={UseridErrorMessage} /> */}

                <FormItem>
                  <FormLabel htmlFor="password">비밀번호</FormLabel>
                  <Input.Password
                    id="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                </FormItem>
                {touched.password && errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}

                <FormItem>
                  <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
                  <Input.Password
                    id="confirmPassword"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                  />
                </FormItem>
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}

                <FormItem>
                  <FormLabel htmlFor="name">이름</FormLabel>
                  <Field type="text" id="name" name="name" />
                </FormItem>
                <ErrorMessage
                  name="name"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />

                <FormItem>
                  <FormLabel htmlFor="email">이메일</FormLabel>
                  <Field type="email" id="email" name="email" />
                </FormItem>
                <ErrorMessage
                  name="email"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />

                <FormItem>
                  <FormLabel htmlFor="nickname">닉네임</FormLabel>
                  <div className="input-with-button-container">
                    <Field type="text" id="nickname" name="nickname" />
                    <Button
                      onClick={() => checkNicknameAvailability(values.nickname)}
                    >
                      중복확인
                    </Button>
                  </div>
                </FormItem>
                {nicknameAvailability && (
                  <div
                    className="error-message"
                    style={{
                      color: nicknameAvailability.result ? "green" : "red",
                    }}
                  >
                    {nicknameAvailability.message}
                  </div>
                )}
                <ErrorMessage
                  name="nickname"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />

                <FormItem>
                  <FormLabel htmlFor="age">나이</FormLabel>
                  <Field type="text" id="age" name="age" />
                </FormItem>
                <ErrorMessage
                  name="age"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />

                <FormItem className="gender">
                  <FormLabel>성별</FormLabel>
                  <label style={{ marginRight: "15px" }}>
                    <Field type="radio" name="gender" value="male" />
                    남성
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" />
                    여성
                  </label>
                </FormItem>
                <ErrorMessage
                  name="gender"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />

                <FormItem>
                  <FormLabel htmlFor="phone">휴대전화 번호</FormLabel>
                  <Field type="text" id="phone" name="phone" />
                </FormItem>
                <ErrorMessage
                  name="phone"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />

                <FormItem>
                  <FormLabel htmlFor="address">주소</FormLabel>
                  <Field type="text" id="address" name="address" />
                </FormItem>
                <ErrorMessage
                  name="address"
                  component="div"
                  render={(msg) => <div className="error-message">{msg}</div>}
                />

                <Button htmlType="submit" disabled={isSubmitting}>
                  회원가입
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </SignupPageStyled>
    </>
  );
};
export default SignupPage;
