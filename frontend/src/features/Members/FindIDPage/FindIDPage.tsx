import { FindIDPageStyled } from "./styled";
import { Input, Button, Divider } from "antd";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { useState } from "react";
import api from "@/util/chek";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AxiosError } from "axios";

export default function FindIDPage() {
  const router = useRouter();

  interface FormData {
    phone: string;
  }

  const initialValues: FormData = {
    phone: "",
  };

  const phoneRegExp = /^(010-\d{4}-\d{4}|010\d{8}|010 \d{4} \d{4})$/;

  const validationSchema: Yup.ObjectSchema<FormData> = Yup.object().shape({
    phone: Yup.string()
      .required("휴대전화 번호를 입력해주세요.")
      .matches(phoneRegExp, "휴대전화 번호 형식을 확인해주세요."),
  });

  const [loading, setLoading] = useState(false);

  const [foundID, setFoundID] = useState<{
    result: boolean;
    message: string;
    userid: string;
  } | null>(null);

  const findIDRequest = async (
    data: FormData,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setLoading(true);
    try {
      const formatPhoneNumber = data.phone.replace(/[- ]/g, "");
      const response = await api.post("/user/findID", {
        phone: formatPhoneNumber,
      });
      setFoundID(response.data);
    } catch (error: AxiosError | any) {
      console.error("Error finding ID:", error);
      setFoundID({
        result: false,
        userid: "",
        message: "아이디를 찾는 동안 오류가 발생했습니다.",
      });
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const onSubmit = (
    data: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    findIDRequest(data, setSubmitting);
  };

  return (
    <>
      <FindIDPageStyled>
        <div
          className="main-logo"
          onClick={() => {
            router.push("/");
          }}
        >
          HEALTHY LIFE
        </div>
        <div className="findID-container">
          <h1>아이디 찾기</h1>
          <p>아이디를 찾기 위해 휴대전화 번호를 입력해주세요.</p>
          <Formik<FormData>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              findIDRequest(data, setSubmitting);
              resetForm();
            }}
            validateOnChange={true}
          >
            {({
              isSubmitting,
              handleBlur,
              handleChange,
              validateField,
              setFieldTouched,
            }) => {
              return (
                <Form>
                  <div className="form-container">
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="휴대전화 번호를 입력해주세요"
                      as={Input}
                      onChange={(e: any) => {
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

                    <Button
                      htmlType="submit"
                      loading={loading}
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
