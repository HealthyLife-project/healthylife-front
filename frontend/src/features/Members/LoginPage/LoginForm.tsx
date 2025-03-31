import { LoginPageStyled } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import clsx from "clsx";

//로그인 컴포넌트
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/signin", {
        email,
        password,
      });

      console.log("response", response);
      const token = response.data.token;

      // JWT 저장
      Cookies.set("token", token);
      // 로그인 후 필요한 동작 수행 (예: 페이지 이동 등)
      router.push("/");

      console.log("로그인 성공", email);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <LoginPageStyled className={clsx("main-wrap")}>
        <div className="main-logo">HEALTHY LIFE</div>
        <div className="login-form">
          <div className="login-container">
            <div className="login-inputs">
              <input
                type="text"
                placeholder="ID"
                className="id-input"
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                type="text"
                placeholder="PASSWORD"
                className="password-input"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button className="login-btn" onClick={handleLogin}>
              LOGIN
            </button>
          </div>
          <div className="login-sub-container">
            <div>아이디 찾기</div>
            <div>비밀번호 찾기</div>
            <div>회원가입</div>
          </div>
        </div>
      </LoginPageStyled>
    </>
  );
}
