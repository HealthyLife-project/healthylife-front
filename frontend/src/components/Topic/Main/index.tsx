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

import { Input, Button, notification, Radio, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

const text = (title: string) => {
  if (title === "Today") {
    return "사용자들이 많이 사용한 해시태그에 대한 이미지에요!";
  }
};

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
          {index === 0 ? (
            <>
              <div className="title">
                <TopicTitle title={element.title} />
                <Tooltip
                  placement="right"
                  title={text("Today")}
                  className="tooltip"
                  color="#108ee9"
                >
                  <QuestionCircleFilled />
                </Tooltip>
              </div>
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
            </>
          ) : (
            <>
              <div className="title">
                <TopicTitle title={element.title} />
              </div>
              <div className="topic-section">
                <TopicElement props={["사람의 건강", "반려동물의 건강"]} />
                <TopicElement
                  props={["운동하기 좋은 날", "반려동물과 운동하기 좋은 종목"]}
                />
                <TopicElement props={["피트니스", "반려동물과 함께 산책"]} />
              </div>
            </>
          )}
        </TodayTopicStyled>
      ))}
    </>
  );
};
export default TopicMain;
