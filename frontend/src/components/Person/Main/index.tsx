import { PersonMainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Coponent
import Header from "@/components/Header";
import LCategory from "@/components/LCategory";
import Footer from "@/components/Footer";
import SubMain from "@/components/SubMain/Main";

//person 메인 컴포넌트
const PersonMain = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <PersonMainStyled className={clsx("main-wrap")}>
        <LCategory />
        <SubMain />
      </PersonMainStyled>
      <Footer />
    </>
  );
};
export default PersonMain;
