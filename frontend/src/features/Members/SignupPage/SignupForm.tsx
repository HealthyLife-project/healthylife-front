import { SignupPageStyled, FormItem, FormLabel } from "./styled";

import React from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import api from "@/util/chek";
import { useRouter } from "next/router";

// 회원 정보 데이터 종류 설정
interface SignupPageValues {
  userid: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  nickname: string;
  age: string;
  gender: "남성" | "여성";
  phone: string;
  address: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();

  // 초기 정보
  const initialValues: SignupPageValues = {
    userid: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    nickname: "",
    age: "",
    gender: "남성",
    phone: "",
    address: "",
  };

  // 휴대전화 번호 형식
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  //  아이디, 비밀번호, 이름, 이메일, 등 정보 형식
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

    name: Yup.string()
      .min(2, "이름은 2글자 이상이여야 합니다")
      .required("이름은 필수입니다"),

    email: Yup.string()
      .email("유효한 이메일 주소를 입력하세요")
      .required("이메일은 필수입니다"),

    nickname: Yup.string().required("닉네임은 필수입니다"),

    age: Yup.string()
      .required("나이는 필수입니다")
      .matches(/^[0-9]+$/, "나이는 숫자여야 합니다")
      .min(1, "1 보다 커야합니다")
      .max(150, "150 미만 이여야합니다"),

    gender: Yup.string().oneOf(
      ["male", "female"],
      "성별은 남성 혹은 여성이여야 합니다"
    ),

    phone: Yup.string()
      .required("휴대전화 번호를 입력해주세요.")
      .matches(phoneRegExp, "휴대전화 번호를 확인해주세요."),

    address: Yup.string().required("주소를 검색해주세요."),
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

  // 유저아이디 중복확인 백엔드 요청
  const checkUseridAvailability = async (userid: string) => {
    try {
      const response = await api.get(`/user/finduser/${userid}`);
      const { result, message } = response.data;
      setUseridAvailability({ result, message });
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
      } else {
        setUseridAvailability({
          result: false,
          message: error.response.data.message,
        }); // Default error message
      }
    }
  };

  // 닉네임 중복확인 백엔드 요청
  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await api.get(`/user/findnickname/${nickname}`);
      setNicknameAvailability(response.data);
    } catch (error) {
      console.error("Error checking nickname:", error);
      setNicknameAvailability({
        result: false,
        message: "Error checking nickname",
      });
    }
  };

  // 회원가입 버튼 함수
  const handleSubmit = async (
    values: SignupPageValues,
    { setSubmitting, setStatus }: FormikHelpers<SignupPageValues>
  ) => {
    setSubmitting(true);
    try {
      // 전화번호 형식 정리 010-1234-5678, 01012345678, 010 1234 5678 => 01012345678
      const cleanedPhoneNumber = values.phone.replace(/[\s-]/g, "");

      const signupData = {
        userid: values.userid,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name,
        email: values.email,
        nickname: values.nickname,
        age: values.age,
        gender: values.gender,
        phone: cleanedPhoneNumber,
        address: values.address,
      };
      const response = await api.post("/user/signup", signupData);
      setStatus({ success: true, message: "회원가입 성공!" }); // Set success message

      notification.success({
        message: ":)",
        description: "회원가입 성공하였습니다.",
        duration: 3,
      });

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("회원가입 실패:", error.response?.data || error.message);
        setStatus({
          success: false,
          message: error.response?.data?.message || "회원가입 실패",
        });
        notification.error({
          message: ":(",
          description: "회원가입 실패하였습니다.",
          duration: 3,
        });
      } else {
        console.error("회원가입 실패:", error);
        setStatus({ success: false, message: "회원가입 실패" });
        notification.error({
          message: ":(",
          description: "회원가입 실패하였습니다.",
          duration: 3,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SignupPageStyled>
        <div className="signup-page-container">
          <h1 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            HEALTHYLIFE
          </h1>
          <h3>회원가입</h3>
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
              validateField,
              setFieldTouched,
              setFieldValue,
            }) => {
              // 비밀번호 일치 확인 변수
              const [passwordMatchError, setPasswordMatchError] = useState("");

              useEffect(() => {
                if (
                  touched.password &&
                  touched.confirmPassword &&
                  values.password === values.confirmPassword &&
                  !errors.confirmPassword
                ) {
                  setPasswordMatchError("비밀번호가 일치합니다.");
                } else {
                  setPasswordMatchError("");
                }
              }, [
                values.password,
                values.confirmPassword,
                touched.password,
                touched.confirmPassword,
                errors.confirmPassword,
              ]);

              return (
                <Form>
                  <FormItem>
                    {/* 유저 아이디 */}
                    <FormLabel htmlFor="userid">아이디</FormLabel>
                    <div className="input-with-button-container">
                      <Field
                        type="text"
                        id="userid"
                        name="userid"
                        placeholder="아이디를 입력해주세요"
                        as={Input}
                        onChange={(e: string) => {
                          handleChange(e);
                          validateField("userid");
                          setUseridAvailability(null);
                          setFieldTouched("userid", true, false);
                        }}
                        onBlur={handleBlur}
                      />
                      <Button
                        onClick={() => checkUseridAvailability(values.userid)}
                        disabled={!!errors.userid}
                      >
                        중복확인
                      </Button>
                    </div>
                    <ErrorMessage
                      name="userid"
                      component="div"
                      render={(msg) => (
                        <div className="error-message">{msg}</div>
                      )}
                    />
                    {!errors.userid && useridAvailability && (
                      <div
                        className="error-message"
                        style={{
                          color: useridAvailability.result ? "green" : "red",
                        }}
                      >
                        {useridAvailability.message}
                      </div>
                    )}
                  </FormItem>

                  {/* 비밀번호 */}
                  <FormItem>
                    <FormLabel htmlFor="password">비밀번호</FormLabel>
                    <div className="input-with-button-container">
                      <Field
                        id="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        as={Input.Password}
                        onBlur={handleBlur}
                        onChange={(e: string) => {
                          handleChange(e);
                          validateField("password");
                          setFieldTouched("password", true, false);
                        }}
                        value={values.password}
                      />
                    </div>
                    {touched.password && errors.password && (
                      <div className="error-message">{errors.password}</div>
                    )}
                  </FormItem>

                  {/* 비밀번호 재입력 */}
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">
                      비밀번호 확인
                    </FormLabel>
                    <div className="input-with-button-container">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="비밀번호를 재입력해 주세요"
                        as={Input.Password}
                        onBlur={handleBlur}
                        onChange={(e: string) => {
                          handleChange(e);
                          validateField("confirmPassword");
                          setFieldTouched("confirmPassword", true, false);
                        }}
                        value={values.confirmPassword}
                      />
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="error-message">
                        {errors.confirmPassword}
                      </div>
                    )}
                    {touched.confirmPassword &&
                      !errors.confirmPassword &&
                      passwordMatchError && (
                        <div className="success-message">
                          {passwordMatchError}
                        </div>
                      )}
                  </FormItem>

                  {/* 이름 */}
                  <FormItem>
                    <FormLabel htmlFor="name">이름</FormLabel>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="이름을 입력해주세요"
                      as={Input}
                      onChange={(e: string) => {
                        handleChange(e);
                        validateField("name");
                        setFieldTouched("name", true, false);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      render={(msg) => (
                        <div className="error-message">{msg}</div>
                      )}
                    />
                  </FormItem>

                  {/* 이메일 */}
                  <FormItem>
                    <FormLabel htmlFor="email">이메일</FormLabel>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="이메일을 입력해주세요"
                      as={Input}
                      onChange={(e: string) => {
                        handleChange(e);
                        validateField("email");
                        setFieldTouched("email", true, false);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      render={(msg) => (
                        <div className="error-message">{msg}</div>
                      )}
                    />
                  </FormItem>

                  {/* 닉네임 */}
                  <FormItem>
                    <FormLabel htmlFor="nickname">닉네임</FormLabel>
                    <div className="input-with-button-container">
                      <Field
                        type="text"
                        id="nickname"
                        name="nickname"
                        placeholder="닉네임을 입력해주세요"
                        as={Input}
                        onChange={(e: string) => {
                          handleChange(e);
                          validateField("nickname");
                          setNicknameAvailability(null);
                          setFieldTouched("nickname", true, false);
                        }}
                        onBlur={handleBlur}
                      />
                      <Button
                        onClick={() =>
                          checkNicknameAvailability(values.nickname)
                        }
                        disabled={!!errors.nickname}
                      >
                        중복확인
                      </Button>
                    </div>
                    <ErrorMessage
                      name="nickname"
                      component="div"
                      render={(msg) => (
                        <div className="error-message">{msg}</div>
                      )}
                    />
                    {!errors.nickname && nicknameAvailability && (
                      <div
                        className="error-message"
                        style={{
                          color: nicknameAvailability.result ? "green" : "red",
                        }}
                      >
                        {nicknameAvailability.message}
                      </div>
                    )}
                  </FormItem>

                  {/* 나이 */}
                  <FormItem>
                    <FormLabel htmlFor="age">나이</FormLabel>
                    <Field
                      type="text"
                      id="age"
                      name="age"
                      placeholder="나이를 입력해주세요"
                      as={Input}
                      onChange={(e: string) => {
                        handleChange(e);
                        validateField("age");
                        setFieldTouched("age", true, false);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      render={(msg) => (
                        <div className="error-message">{msg}</div>
                      )}
                    />
                  </FormItem>

                  {/* 성별 */}
                  <FormItem className="gender">
                    <FormLabel>성별</FormLabel>
                    <div>
                      <label style={{ marginRight: "15px" }}>
                        <Field type="radio" name="gender" value="male" />
                        남성
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="female" />
                        여성
                      </label>
                    </div>
                    <div>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        render={(msg) => (
                          <div className="error-message">{msg}</div>
                        )}
                      />
                    </div>
                  </FormItem>

                  {/* 휴대전화 번호 */}
                  <FormItem>
                    <FormLabel htmlFor="phone">휴대전화 번호</FormLabel>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="휴대전화 번호를 입력해주세요"
                      as={Input}
                      onChange={(e: string) => {
                        handleChange(e);
                        validateField("phone");
                        setFieldTouched("phone", true, false);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      render={(msg) => (
                        <div className="error-message">{msg}</div>
                      )}
                    />
                  </FormItem>

                  {/* 주소 */}
                  <FormItem>
                    <FormLabel htmlFor="address">주소</FormLabel>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder="주소를 검색해 주세요."
                      as={Input}
                      onChange={(e: string) => {
                        handleChange(e);
                        validateField("address");
                        setFieldTouched("address", true, false);
                      }}
                      onClick={() => {
                        new window.daum.Postcode({
                          oncomplete: function (data: any) {
                            setFieldValue("address", data.address);
                          },
                        }).open();
                      }}
                    />
                  </FormItem>
                  <ErrorMessage
                    name="address"
                    component="div"
                    render={(msg) => <div className="error-message">{msg}</div>}
                  />
                  <div className="submit-button-wrapper">
                    <Button htmlType="submit" disabled={isSubmitting}>
                      회원가입
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </SignupPageStyled>
    </>
  );
};
export default SignupPage;
