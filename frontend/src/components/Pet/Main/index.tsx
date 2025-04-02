import { PetMainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Component
import Header from "@/components/Header";
import LCategory from "@/components/LCategory";
import Footer from "@/components/Footer";
import SubMain from "@/components/SubMain/Main";

//pet 메인 컴포넌트
const PetMain = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <PetMainStyled className={clsx("main-wrap")}>
        <LCategory />
        <SubMain />
      </PetMainStyled>
      <Footer />
    </>
  );
};
export default PetMain;
