import { LCategoryStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//헤더 컴포넌트
const LCategory = () => {
  const router = useRouter();

  //person click
  const person = () => {
    console.log("person");
    router.push("/person");
  };

  //pet click
  const pet = () => {
    console.log("pet");
    router.push("/pet");
  };

  return (
    <LCategoryStyled className={clsx("main-wrap")}>
      <div
        onClick={() => {
          person();
        }}
      >
        Person
      </div>
      <div
        onClick={() => {
          pet();
        }}
      >
        Pet
      </div>
    </LCategoryStyled>
  );
};
export default LCategory;
