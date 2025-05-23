import { LoginPageStyled } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setTokenList } from "@/redux/redux";
import clsx from "clsx";
import api from "@/util/chek";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button, Drawer, Input } from "antd";
import { useDispatch } from "react-redux";

import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//image
import naver from "../../../assets/images/naverloginimg.png";
import google_login from "../../../assets/images/google_logo.png";
import kakao from "@/assets/images/kakaotalk_sharing_btn_small.png";

//로그인 컴포넌트
export default function LoginPage() {
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); //input 비밀번호 공개유무

  //변수 선언
  const dispatch = useDispatch();
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  //login btn
  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        userid: userid,
        password: password,
      });

      //로그인 정보 - store 저장
      dispatch(setTokenList(response.data.user));
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      //로그인 정보가 맞지 않음 - notification 설정
      MySwal.fire({
        icon: "error",
        title: "다시 시도해 주세요.",
      });
    }
  };

  //네이버 소셜 로그인
  const NaverLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_ORIGIN_URL}/auth/naver`;
  };

  //카카오 소셜 로그인
  function handleKakaoLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_ORIGIN_URL}/auth/kakao`;
  }

  //구글 소셜 로그인
  function handleGoogleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_ORIGIN_URL}/auth/google`;
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
              <Input
                type="text"
                placeholder="ID"
                className="id-input"
                onChange={(event) => setUserid(event.target.value)}
              />

              <Input.Password
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
            <div className="find-ID">
              <Link href="/findID">아이디 찾기</Link>
            </div>

            <div className="recover-password">
              <Link href="/forgot-password/recover-password">
                비밀번호 찾기
              </Link>
            </div>

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
              <img className="imgstyle" src={kakao.src} alt="kakao_login" />
            </div>
            <div className="google-login" onClick={handleGoogleLogin}>
              <img
                className="imgstyle"
                src={google_login.src}
                alt="google_login"
              />
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
