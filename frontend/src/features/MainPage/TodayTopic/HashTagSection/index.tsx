import { HashTagSectionStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Coponent

const HashTagSection = () => {
  const router = useRouter();

  return (
    <HashTagSectionStyled className={clsx("main-wrap")}>
      해시태그 컴포넌트
    </HashTagSectionStyled>
  );
};
export default HashTagSection;
