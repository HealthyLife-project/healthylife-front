import { MainStyled } from "./styled";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();
  return (
    <>
      <MainStyled>
        <div className="main-title">
          main page
          <div className="login">
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              로그인 페이지 이동
            </button>
            <div className="signup">
              <button
                onClick={() => {
                  router.push("/signup");
                }}
              >
                회원가입 페이지 이동
              </button>
            </div>
            <button
              onClick={() => {
                router.push("/test");
              }}
            >
              to hello world{" "}
            </button>
          </div>
        </div>
      </MainStyled>
    </>
  );
}
