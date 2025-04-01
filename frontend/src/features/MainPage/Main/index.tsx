import { MainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Component
import Header from "@/components/Header";

//메인 페이지 컴포넌트
const Main = () => {
  const router = useRouter();
  return (
    <>
      <MainStyled className={clsx("main-wrap")}>
        <Header />
      </MainStyled>
      <button
        className={clsx("main-signup")}
        onClick={() => {
          router.push("/mypage");
        }}
      >
        마이페이지 이동
      </button>
    </>
  );
};

export default Main;
