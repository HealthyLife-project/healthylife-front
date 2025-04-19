import { FindIDPageStyled } from "./styled";
import { Input, Button, Divider } from "antd";
import * as Yup from "yup";

import { useState } from "react";
import api from "@/util/chek";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function FindIDPage() {
  interface FormData {
    phone: string;
  }

  const initialValues: FormData = {
    phone: "",
  };

  const phoneRegExp =
    // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    /^(010-\d{4}-\d{4}|010\d{8}|010 \d{4} \d{4})$/;

  const validationSchema: Yup.ObjectSchema<FormData> = Yup.object().shape({
    phone: Yup.string()
      .required("휴대전화 번호를 입력해주세요.")
      // .matches(phoneRegExp, "휴대전화 번호를 확인해주세요."),
      .matches(phoneRegExp, "휴대전화 번호 형식을 확인해주세요."),
  });

  // const [foundID, setFoundID] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [foundID, setFoundID] = useState<{
    result: boolean;
    message: string;
    userid: string;
  } | null>(null);

  const [phoneNumber, setPhoneNumber] = useState("");

  const findIDRequest = async (
    data: FormData,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const formatPhoneNumber = data.phone.replace(/[- ]/g, "");
      console.log("Sending phone number:", data.phone);
      const response = await api.post("/user/findID", {
        phone: formatPhoneNumber,
      });
      console.log(response);
      setFoundID(response.data);
    } catch (error: any) {
      console.error("Error finding ID:", error);
      setFoundID({
        result: false,
        userid: "",
        message: "아이디를 찾는 동안 오류가 발생했습니다.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (
    data: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log("Submitted phone number:", data.phone); // Log on submit
    console.log("submitted number", phoneNumber);
    setSubmitting(true);
    findIDRequest(data, setSubmitting);
  };

  return (
    <>
      <FindIDPageStyled>
        <div className="findID-container">
          <h1>아이디 찾기</h1>
          <p>아이디를 찾기 위해 휴대전화 번호를 입력해주세요.</p>
          <Formik<FormData>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={true}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              validateField,
              setFieldTouched,
            }) => {
              return (
                <Form>
                  <div className="form-container">
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="휴대전화 번호를 입력해주세요"
                      value={phoneNumber}
                      as={Input}
                      onChange={(e: any) => {
                        handleChange(e);
                        validateField("phone");
                        setPhoneNumber(e.target.value);
                        setFieldTouched("phone", true, false);
                      }}
                      onBlur={handleBlur}
                    />

                    {/*  */}
                    <ErrorMessage
                      name="phone"
                      component="div"
                      render={(msg) => (
                        <div className="error-message">{msg}</div>
                      )}
                    />

                    {/*  */}

                    <Button
                      htmlType="submit"
                      disabled={isSubmitting}
                      className="submit-button"
                    >
                      아이디 찾기
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>

          {foundID && foundID.result && (
            <div className="result-message">
              <Divider />
              <p>
                회원님의 아이디는: <strong>{foundID.userid}</strong> 입니다.
              </p>
            </div>
          )}

          {foundID && !foundID.result && foundID.message && (
            <div className="error-message">
              <Divider />
              <p>{foundID.message}</p>
            </div>
          )}
        </div>
      </FindIDPageStyled>
    </>
  );
}
