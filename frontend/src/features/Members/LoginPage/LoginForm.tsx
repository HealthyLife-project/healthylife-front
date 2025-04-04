import { LoginPageStyled } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from "cookies-next";
import clsx from "clsx";

//image
import naver from "../../../assets/images/naverloginimg.png";
import Header from "@/components/Header";

//로그인 컴포넌트
export default function LoginPage() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    console.log("로그인버튼");
    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        userid: userid,
        password: password,
      });

      console.log("response", response);
      const token = response.data.token;

      // JWT 저장
      //Cookies.set("token", token);
      setCookie("healthy_token", token, {
        path: "/",
        maxAge: 60 * 60 * 2, // 2시간 유지
      });

      // 로그인 후 필요한 동작 수행 (예: 페이지 이동 등)
      router.push("/");

      console.log("로그인 성공", userid);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  //네이버 로그인
  const NAVER_CLIENT_ID = process.env.NAVER_KEY; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = "http://localhost:5001/auth/naver"; // Callback URL
  const STATE = "flase";

  //네이버 소셜 로그인
  const NaverLogin = () => {
    console.log("네이버 소셜 로그인");
    window.location.href = REDIRECT_URI;
  };

  // function handleLogout() {

  // }

  function handleKakaoLogin() {
    window.location.href = "http://localhost:5001/auth/kakao";
  }

  function handleGoogleLogin() {
    window.location.href = "http://localhost:5001/auth/google";
  }

  return (
    <>
      <LoginPageStyled className={clsx("main-wrap")}>
        <div
          className="main-logo"
          onClick={() => {
            router.push("/");
          }}
        >
          HEALTHY LIFE
        </div>
        <div className="login-form">
          <div className="login-container">
            <div className="login-inputs">
              <input
                type="text"
                placeholder="ID"
                className="id-input"
                onChange={(event) => setUserid(event.target.value)}
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
            <div
              onClick={() => {
                router.push("/signup");
              }}
            >
              회원가입
            </div>
          </div>
          <div className="login-sns">
            <div className="kakao-login" onClick={handleKakaoLogin}>
              카카오
            </div>
            <div className="google-login" onClick={handleGoogleLogin}>
              구글
            </div>
            <div
              className="naver-login"
              onClick={() => {
                NaverLogin();
              }}
            >
              <img className="imgstyle" src={naver.src} alt="naver" />
            </div>
          </div>
        </div>
        <Header />
      </LoginPageStyled>
    </>
  );
}
// function setCookie(
//   arg0: string,
//   token: any,
//   arg2: { path: string; maxAge: number }
// ) {
//   throw new Error("Function not implemented.");
// }
