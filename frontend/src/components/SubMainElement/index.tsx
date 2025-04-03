import { SubElementStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Coponent

//submain > main > subCategory > subElement 전체 컴포넌트
const SubElement = (props: { num: number }) => {
  //props
  const { num } = props;
  const router = useRouter();

  return (
    <SubElementStyled className={clsx("main-wrap")}>
      자식요소 {num}
    </SubElementStyled>
  );
};
export default SubElement;
