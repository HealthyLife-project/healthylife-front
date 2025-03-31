import { MainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function Main() {
  const router = useRouter();
  return (
    <>
      <MainStyled className={clsx("main-wrap")}>
        <div className="main-logo">HEALTHY LIFE</div>
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
      </MainStyled>
    </>
  );
}
