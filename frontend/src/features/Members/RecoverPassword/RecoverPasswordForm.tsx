import { useState } from "react";
import { RecoverPasswordPageStyled } from "./styled";
import { Input } from "antd";
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
        return;
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
        recovery password it's okay we got this
        <form onSubmit={submitHandler}>
          <div className="recover-password-container">
            <div className="input-container">
              <Input
                type="text"
                placeholder="Please enter your email"
                className="email-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
            </div>
            <div className="button-container">
              <button type="submit">Send password reset email</button>
            </div>
          </div>
        </form>
      </RecoverPasswordPageStyled>
    </>
  );
}
