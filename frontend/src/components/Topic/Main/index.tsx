import { TodayTopicStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import TopicElement from "../TopicElements";
import TopicTitle from "../TopicTitle";

//Coponent

//list
import { title_lst } from "./datalist";
import { useEffect, useState } from "react";
import api from "@/util/chek";
import ImageElement from "../ImageElement";

//today topic, news main 컴포넌트
const TopicMain = () => {
  //변수 선언
  const router = useRouter();
  const [hash, setHash] = useState([""]);
  useEffect(() => {
    api.get("/hashtag/most").then((res) => {
      const tagname = res.data
        .filter((item: { hashtag: string }) => item.hashtag)
        .map((item: { hashtag: string }) => item.hashtag);
      setHash(tagname);
      //console.log("tagname", tagname);
    });
  }, []);

  return (
    <>
      {title_lst.map((element: { title: string }, index: number) => (
        <TodayTopicStyled className={clsx("main-wrap")} key={index}>
          <TopicTitle title={element.title} />
          {index === 0 ? (
            <div className="topic-section">
              <div className="today-img">
                <ImageElement hash={hash[0]} />
              </div>
              <div className="today-img">
                <ImageElement hash={hash[1]} />
              </div>
              <div className="today-img">
                <ImageElement hash={hash[2]} />
              </div>
            </div>
          ) : (
            <div className="topic-section">
              <TopicElement />
              <TopicElement />
              <TopicElement />
            </div>
          )}
        </TodayTopicStyled>
      ))}
    </>
  );
};
export default TopicMain;
