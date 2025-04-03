import { SubCategoryStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import SubElement from "@/components/SubMainElement";

//Coponent

//submain > main > subCategory 전체 컴포넌트
const SubCategory = () => {
  const router = useRouter();

  //변수 선언
  const num: number[] = [1, 2, 3, 4];

  return (
    <SubCategoryStyled className={clsx("main-wrap")}>
      {num.map((elemenet: number) => (
        <div className="sub-element">
          <SubElement key={elemenet} num={elemenet} />
        </div>
      ))}
    </SubCategoryStyled>
  );
};
export default SubCategory;
