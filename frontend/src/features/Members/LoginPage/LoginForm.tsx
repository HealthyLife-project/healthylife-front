import { LoginPageStyled } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

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
      <LoginPageStyled>
        <div className="login-page-container">
          <div>
            <input
              type="text"
              placeholder="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </LoginPageStyled>
    </>
  );
}
