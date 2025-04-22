import { LCategoryStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

//person pet 카테고리 이동 컴포넌트
const LCategory = () => {
  //useState
  const [click, setClick] = useState("");
  //const location = useLocation();

  useEffect(() => {
    //console.log(window.location.pathname);
    let pathname = window.location.pathname; //pathName person인지 pet인지 확인용
    if (pathname.includes("person")) {
      setClick("person");
    } else if (pathname.includes("pet")) {
      setClick("pet");
    } else {
      setClick("");
    }
  }, []);

  const router = useRouter();

  //person click
  const person = () => {
    setClick("person");
    router.push("/person");
  };

  //pet click
  const pet = () => {
    setClick("pet");
    router.push("/pet");
  };

  return (
    <LCategoryStyled className={clsx("main-wrap")}>
      <div
        className={`person ${click === "person" ? "clicked" : ""}`}
        onClick={() => {
          person();
        }}
      >
        Person
      </div>
      <div
        className={`pet ${click === "pet" ? "clicked" : ""}`}
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
