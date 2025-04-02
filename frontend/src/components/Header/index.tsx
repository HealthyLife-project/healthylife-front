import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//헤더 컴포넌트
const Header = () => {
  const router = useRouter();
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
        <div className="loginandsignup">
          <button
            className={clsx("main-login")}
            onClick={() => {
              router.push("/login");
            }}
          >
            로그인
          </button>
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
