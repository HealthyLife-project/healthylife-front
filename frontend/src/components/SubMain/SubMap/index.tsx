import { SubMapStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Coponent

//submain > main > submap 컴포넌트
const SubMap = () => {
  const router = useRouter();

  return <SubMapStyled className={clsx("main-wrap")}>sub map</SubMapStyled>;
};
export default SubMap;
