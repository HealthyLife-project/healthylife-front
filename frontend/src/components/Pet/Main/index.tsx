import { PetMainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Component
import Header from "@/components/Header";
import LCategory from "@/components/LCategory";

//pet 메인 컴포넌트
const PetMain = () => {
  const router = useRouter();

  return (
    <PetMainStyled className={clsx("main-wrap")}>
      <Header />
      <LCategory />
    </PetMainStyled>
  );
};
export default PetMain;
