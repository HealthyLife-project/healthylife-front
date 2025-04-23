import { SubMapStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import KAKAOMap from "@/components/Map";

//Coponent

//submain > main > submap 컴포넌트
const SubMap = () => {
  const router = useRouter();

  return (
    <SubMapStyled className={clsx("main-wrap")}>
      <KAKAOMap position={"main"} />
    </SubMapStyled>
  );
};
export default SubMap;
