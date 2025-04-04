import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//헤더 컴포넌트
const Header = () => {
  //useState
  const [isLogin, setIsLogin] = useState("");

  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  const router = useRouter();

  //로그인 정보 확인 - store용
  useEffect(() => {
    console.log("tokenList 업데이트됨:", tokenList);
    setIsLogin(tokenList.token);
  }, [tokenList]);

  // 로그인 버튼 클릭
  function handleLogin() {
    router.push("/login");
  }

  // 로그아웃 버튼
  function handleLogout() {
    router.push("/logout");
  }

  return (
    <>
      <HeaderStyled className={clsx("main-wrap")}>
        <div
          className="main-logo"
          onClick={() => {
            router.push("/");
          }}
        >
          HEALTHY LIFE
        </div>
        <div className="login-and-signup">
          <div>
            {isLogin ? (
              <button className={clsx("main-login")} onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <button className={clsx("main-login")} onClick={handleLogin}>
                로그인
              </button>
            )}
          </div>
          {/* <button
            className={clsx("main-login")}
            onClick={() => {
              handleLogin();
            }}
          >
            로그인
          </button> */}
          <button
            className={clsx("main-signup")}
            onClick={() => {
              router.push("/signup");
            }}
          >
            회원가입
          </button>
        </div>
      </HeaderStyled>
    </>
  );
};
export default Header;
