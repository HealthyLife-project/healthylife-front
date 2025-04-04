import { MainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Component
import Header from "@/components/Header"; //header
import MainBanner from "../MainBanner"; //Banner
import LCategory from "@/components/LCategory";
import TopicMain from "@/components/Topic/Main";
import Footer from "@/components/Footer";

//메인 페이지 컴포넌트

/* 컴포넌트 순서
1.헤더 
2.메인배너
3.Today Topic
4-1.뉴스 - person
4-2.뉴스 - pet
5.footer
*/
const Main = () => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          router.push("/hashtag");
        }}
      >
        hashtags
      </button>
      <Header />
      <MainStyled className={clsx("main-wrap")}>
        <LCategory />
        <MainBanner />
        <TopicMain />
      </MainStyled>
      <Footer />
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
