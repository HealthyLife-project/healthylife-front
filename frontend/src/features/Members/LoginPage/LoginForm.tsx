import { LoginPageStyled } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setTokenList } from "@/redux/redux";
import axios from "axios";
import clsx from "clsx";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { useDispatch } from "react-redux";

//image
import naver from "../../../assets/images/naverloginimg.png";

//로그인 컴포넌트
export default function LoginPage() {
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  //변수 선언
  const dispatch = useDispatch();
  const router = useRouter();

  //login btn
  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        userid: userid,
        password: password,
      });

      //console.log("response.data.user", response.data.user); user데이터

      //로그인 정보 - store 저장
      dispatch(setTokenList({ token: response.data.user }));
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      //로그인 정보가 맞지 않음 - notification 설정
    }
  };

  //네이버 소셜 로그인
  const NaverLogin = () => {
    window.location.href = "http://localhost:5001/auth/naver";
  };

  //카카오 소셜 로그인
  function handleKakaoLogin() {
    window.location.href = "http://localhost:5001/auth/kakao";
  }

  //구글 소셜 로그인
  function handleGoogleLogin() {
    window.location.href = "http://localhost:5001/auth/google";
  }

  //enter 시 로그인 실행
  const activeEnter = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

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
                onKeyDown={(e) => activeEnter(e)}
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
      </LoginPageStyled>
    </>
  );
}
