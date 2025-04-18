import { FindIDPageStyled } from "./styled";
import { Input } from "antd";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import api from "@/util/chek";

interface FormData {
  phone: string;
}

export default function FindIDPage() {
  // 휴대전화 번호 형식
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema: Yup.ObjectSchema<FormData> = Yup.object().shape({
    phone: Yup.string()
      .required("휴대전화 번호를 입력해주세요.")
      .matches(phoneRegExp, "휴대전화 번호를 확인해주세요."),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      phone: "",
    },
  });

  const [foundID, setFoundID] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const findIDRequest = async (data: FormData) => {
    // Replace this with your actual API call
    try {
      console.log("Sending phone number:", data.phone);
      // Simulate API call
      const response = await api.post("/user/findID", {
        phone: phoneNumber,
      });

      console.log("phone number response", response);

      //   if (response.result) {
      //     setFoundID(response.id);
      //     setErrorMessage(null);
      //   } else {
      //     setFoundID(null);
      //     setErrorMessage(response.message || "아이디를 찾을 수 없습니다.");
      //   }
    } catch (error: any) {
      console.error("Error finding ID:", error);
      setFoundID(null);
      setErrorMessage("아이디를 찾는 동안 오류가 발생했습니다.");
    }
  };

  const onSubmit = (data: FormData) => {
    findIDRequest(data);
  };
  return (
    <>
      <div>
        <FindIDPageStyled>
          {" "}
          <h1>아이디 찾기</h1>
          <p>아이디를 찾기위해 휴대전화 번호를 입력해주세요.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="find-ID-container">
              <div className="input-container">
                <Input
                  type="text"
                  placeholder="휴대전화 번호를 입력해 주십시오."
                  className="phone-number-input"
                  {...register("phone")}
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone.message}</div>
                )}
              </div>
              <div className="button-container">
                <button type="submit">아이디 찾기</button>
              </div>
              <a href="/login">아이디를 기억하시나요? 로그인</a>
            </div>
            {foundID && (
              <div className="success-message">
                찾으시는 아이디는: <strong>{foundID}</strong> 입니다.
              </div>
            )}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </form>
        </FindIDPageStyled>
      </div>
    </>
  );
}
