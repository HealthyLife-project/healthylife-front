import { useState, useEffect } from "react";
import { TopicElementStyled, theme } from "./styled";
import clsx from "clsx";
import api from "@/util/chek";
import { Skeleton } from "antd";
interface TopicElementProps {
  props: string;
}

const cleanTitle = (str: string) => {
  const noTags = str.replace(/<[^>]*>/g, "");
  const txt = document.createElement("textarea");
  txt.innerHTML = noTags;
  return txt.value;
};

const TopicElement = ({ props }: TopicElementProps) => {
  const [healthNews, setHealthNews] = useState<any[]>([]);
  const [petHealthNews, setPetHealthNews] = useState<any[]>([]);

  // 뉴스 가져오기 함수
  const News = async (category: string) => {
    console.log("category", category);
    try {
      const res = await api.get(`news/health/${category}`);
      console.log(res.data); // 서버에서 받은 데이터 구조 확인
      // 만약 res.data가 배열이 아니면 빈 배열을 반환하도록 처리
      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      console.error("뉴스 요청 실패", err);
      return []; // 에러가 발생하면 빈 배열을 반환
    }
  };

  // useEffect로 뉴스 요청 및 5초 간격으로 재요청
  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        // 첫 번째 카테고리 뉴스 요청 (운동 건강)
        const healthData = await News(props);
        setHealthNews(healthData);

        // 두 번째 카테고리 뉴스 요청 (반려동물 건강)
      } catch (err) {
        console.error("뉴스 가져오기 실패", err);
      }
    };

    // 첫 번째 데이터 로딩

    fetchAllNews();

    // 2.5초 간격으로 뉴스 새로 요청
    const timeout = setTimeout(fetchAllNews, 5000);

    // 컴포넌트가 언마운트되면 타이머 제거
    return () => clearTimeout(timeout);
  }, []); // props가 변경될 때마다 이 useEffect가 실행됨

  return (
    <TopicElementStyled className={clsx("main-wrap")}>
      {healthNews.length > 0 ? (
        <div className="news-elements">
          {healthNews.map((item, index) => (
            <div key={index} className="title">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {cleanTitle(item.title)}
              </a>
              {/* <p>{item.description}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <Skeleton active paragraph={{ rows: 7 }} />
      )}
    </TopicElementStyled>
  );
};

export default TopicElement;
