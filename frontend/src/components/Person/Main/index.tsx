import { PersonMainStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Coponent
import Header from "@/components/Header";
import LCategory from "@/components/LCategory";

//person 메인 컴포넌트
const PersonMain = () => {
  const router = useRouter();

  return (
    <PersonMainStyled className={clsx("main-wrap")}>
      <Header />
      <LCategory />
    </PersonMainStyled>
  );
};
export default PersonMain;
