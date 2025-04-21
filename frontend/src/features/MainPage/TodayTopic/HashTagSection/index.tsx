import { HashTagSectionStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import api from "@/util/chek";

//Component

//메인 > 해시태그 컴포넌트
const HashTagSection = () => {
  const router = useRouter();

  //useState
  const [hashtaglist, setHashTagList] = useState([""]);

  //useEffect
  useEffect(() => {
    //유저들이 선택한 해시태그 기준 내림차순으로 가져와 화면에 띄어 주기
    api.get("/hashtag/most").then((res) => {
      const tagname = res.data
        .filter((item: { hashtag: string }) => item.hashtag)
        .map((item: { hashtag: string }) => item.hashtag);

      setHashTagList(tagname);
    });
  }, []);

  return (
    <HashTagSectionStyled className={clsx("main-wrap")}>
      <div className="scroll-track-1">
        {[...hashtaglist, ...hashtaglist].map((element, index) => (
          <div key={index} className="hashtag-element">
            {element}
          </div>
        ))}
      </div>
    </HashTagSectionStyled>
  );
};
export default HashTagSection;
