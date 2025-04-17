import { useState } from "react";
import { RecoverPasswordPageStyled } from "./styled";
import { Input, notification } from "antd";
import api from "@/util/chek";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function RecoverPasswordPage() {
  const [passwordRecoveryEmailError, setPasswordRecoveryEmailError] =
    useState<any>(null); // Adjust the type as needed
  const [email, setEmail] = useState("");
  const router = useRouter();

  const sendPasswordRecoveryEmail = async (email: string) => {
    setPasswordRecoveryEmailError(null); // Clear any previous errors
    console.log("sendpasswordrecovery email");
    console.log(email);
    // router.push("/forgot-password/password-recovery-feedback");

    // 비밀번호 재설정 요청 이메일로
    try {
      const response = await api.post("/user/findUserEmail", {
        email: email,
      });
      // if successful result: true else result: false
      console.log("이메일로 링크 보내기:", response);
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
      setPasswordRecoveryEmailError(error); // Set the error state
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    sendPasswordRecoveryEmail(email);
  };

  return (
    <>
      <RecoverPasswordPageStyled>
        <h1>비밀번호 찾기</h1>
        <p>비밀번호 재설정을 위해 아래에 이메일 주소를 입력해 주세요.</p>
        <form onSubmit={submitHandler}>
          <div className="recover-password-container">
            <div className="input-container">
              <Input
                type="text"
                placeholder="이메일 주소를 입력해 주십시오."
                className="email-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="button-container">
              <button type="submit">비밀번호 재설정 이메일 보내기</button>
            </div>
            <a href="/login">비밀번호를 기억하시나요? 로그인</a>
          </div>
        </form>
      </RecoverPasswordPageStyled>
    </>
  );
}
