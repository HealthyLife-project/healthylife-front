import { useState, useEffect } from "react";
import { TopicElementStyled } from "./styled";
import clsx from "clsx";
import api from "@/util/chek";

interface TopicElementProps {
  props: string[];
}

const TopicElement = ({ props }: TopicElementProps) => {
  const [healthNews, setHealthNews] = useState<any[]>([]);
  const [petHealthNews, setPetHealthNews] = useState<any[]>([]);

  // useEffect로 뉴스 요청
  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        // 첫 번째 카테고리 뉴스 요청 (운동 건강)
        const healthData = await News(props[0]);
        setHealthNews(healthData);

        // 두 번째 카테고리 뉴스 요청 (반려동물 건강)
        const petHealthData = await News(props[1]);
        setPetHealthNews(petHealthData);
      } catch (err) {
        console.error("뉴스 가져오기 실패", err);
      }
    };

    fetchAllNews();
  }, [props]); // props가 변경될 때마다 API 호출을 다시 실행

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

  return (
    <TopicElementStyled className={clsx("main-wrap")}>
      {healthNews.length > 0 ? (
        <div className="news-elements">
          {healthNews.map((item, index) => (
            <div key={index} className="title">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              {/* <p>{item.description}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p>운동 건강 뉴스를 불러오는 중...</p>
      )}
    </TopicElementStyled>
  );
};

export default TopicElement;
