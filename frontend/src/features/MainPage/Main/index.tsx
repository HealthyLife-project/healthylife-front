import { MainStyled } from "./styled";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/redux";
import { RootState } from "../../../redux/store";

//Component
import Header from "@/components/Header"; //header
import MainBanner from "../MainBanner"; //Banner
import LCategory from "@/components/LCategory";
import TopicMain from "@/components/Topic/Main";
import Footer from "@/components/Footer";
import HashtagsModal from "@/components/HashtagModal/HashtagModal";

//메인 페이지 컴포넌트

const Main = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      <Header />
      <MainStyled className={clsx("main-wrap")}>
        <LCategory />
        <MainBanner />
        <TopicMain />
      </MainStyled>
      {isAuthenticated ? <HashtagsModal /> : <span></span>}
      <Footer />
    </>
  );
};

export default Main;
