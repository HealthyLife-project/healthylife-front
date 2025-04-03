import { SignupPageStyled } from "./styled";

import React from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { Button } from "antd";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

interface SignupPageValues {
  userid: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  nickname: string;
  age: number;
  gender: "남성" | "여성";
  phone: string;
  address: string;
}

const SignupPage: React.FC = () => {
  const initialValues: SignupPageValues = {
    userid: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    nickname: "",
    age: 0,
    gender: "남성",
    phone: "000-0000-0000",
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
    // phone: Yup.string()
    //   .matches(/^\d{3}-\d{4}-\d{4}$/, "전화번호 형식 000-0000-0000")
    //   .transform((value) => value.replace(/-/g, ""))
    //   .test("전화번호 형식이 맞습니다", "전화번호 형식이 틀립니다", (value) => {
    //     if (!value) return false; // Changed to false to disallow empty values
    //     return /^\d{11}$/.test(value); // removed replace from here, as it is already being done in the transform.
    //   })
    //   .required("전화번호를 입력해 주세요"),
    phone: Yup.string()
      .required("휴대폰 번호를 입력해주세요.")
      .matches(phoneRegExp, "휴대폰 번호를 입력해주세요."),

    address: Yup.string().required("주소를 입력해 주세요"),
  });

  // 아이디 중복확인
  const [useridAvailability, setUseridAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  const [nicknameAvailability, setNicknameAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  const checkUseridAvailability = async (userid: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/user/finduser/${userid}`
      );
      console.log("response userid", response.data);
      setUseridAvailability(response.data);
    } catch (error) {
      console.error("Error checking user ID:", error);
      setUseridAvailability({
        available: false,
        message: "Error checking user ID.",
      });
    }
  };

  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/user/findnickname/${nickname}`
      );
      console.log("response nickname", response.data);
    } catch (error) {
      console.error("Error checking nickname:", error);
      setNicknameAvailability({
        available: false,
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

      const response = await axios.post(
        "http://localhost:5001/user/signup",
        values
      );
      console.log("response.data", response.data); // Log response from backend
      setStatus({ success: true, message: "회원가입 성공!" }); // Set success message
      // 이후 페이지 이동을 해시태그로 해서 해시태그 값들 받아오기
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
          {({ isSubmitting, values }) => (
            <Form>
              <label htmlFor="userid">아이디</label>
              <Field type="text" id="userid" name="userid" />
              <Button onClick={() => checkUseridAvailability(values.userid)}>
                중복확인
              </Button>
              {useridAvailability && (
                <div
                  style={{
                    color: useridAvailability.available ? "green" : "red",
                  }}
                >
                  {useridAvailability.message}
                </div>
              )}
              <ErrorMessage
                name="userid"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="password">비밀번호</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="name">이름</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="email">이메일</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="nickname">닉네임</label>
              <Field type="text" id="nickname" name="nickname" />
              <Button
                onClick={() => checkNicknameAvailability(values.nickname)}
              >
                중복확인
              </Button>
              {nicknameAvailability && (
                <div
                  style={{
                    color: nicknameAvailability.available ? "green" : "red",
                  }}
                >
                  {nicknameAvailability.message}
                </div>
              )}
              <ErrorMessage
                name="nickname"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="age">나이</label>
              <Field type="number" id="age" name="age" />
              <ErrorMessage
                name="age"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}

              <div className="gender">
                <label>성별</label>
                <label>
                  <Field type="radio" name="gender" value="male" />
                  남성
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  여성
                </label>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="phone">휴대전화 번호</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage
                name="phone"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
              <label htmlFor="address">주소</label>
              <Field type="text" id="address" name="address" />
              <ErrorMessage
                name="address"
                component="div"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
              {/*  */}
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

// 회원가입 아이디 중복확인 요청
// 이메일 중복확인 요청
// 카테고리 hashtag 추가
//
