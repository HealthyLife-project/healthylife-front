import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

//헤더 컴포넌트
const Header = () => {
  const router = useRouter();
  const token = getCookie("healthy_token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  console.log("header token", token);

  // 로그인 로직
  function handleLogin() {
    console.log("Login button clicked!");
    setIsLoggedIn(true); // 페이지 이동 전에 상태 업데이트
    router.push("/login");
  }

  // 로그아웃 로직
  function handleLogout() {
    console.log("Logout button clicked!");
    setIsLoggedIn(false); // 페이지 이동 전에 상태 업데이트
    router.push("/logout");
  }

  // 로그인 상태에 따른 버튼 렌더링
  useEffect(() => {
    setIsLoggedIn(!!token);
    console.log("로그인 상태", isLoggedIn);
  }, [token]);

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
            {isLoggedIn ? (
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
              router.push("/login");
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
