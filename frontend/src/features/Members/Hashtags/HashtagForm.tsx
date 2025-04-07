import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

// 백엔드 응답 데이터의 각 항목 구조 정의
interface Hashtags {
  id: string;
  hash: string;
}

const HashtagForm: React.FC = () => {
  // 백엔드에서 가져온 데이터 배열을 저장하는 상태, 초기값은 빈 배열
  const [tags, setTags] = useState<Hashtags[]>([]);
  // 각 버튼의 토글 상태 (참/거짓), 초기값은 빈 객체 (키:버튼ID)
  const [toggledStates, setToggledStates] = useState<{
    [key: string]: boolean;
  }>({});
  // 선택된 해시값들 저장
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

  useEffect(() => {
    const hashtagRequest = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/hashtag/allhash"
        );
        setTags(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    hashtagRequest();
  }, []);

  // 클릭된 버튼의 ID를 인자로 받음, Hash 값도 받음
  // 상태업데이트 혹은 이전 상태 기반으로 업데이트
  const handleToggle = (itemID: string, itemName: string) => {
    setToggledStates((prevStates) => ({
      ...prevStates,
      [itemID]: !prevStates[itemID], // 클릭된 버튼의 ID에 해당하는 토글 상태를 반전
    }));

    setSelectedHashtags((prevHashtags) => {
      const isCurrentlyToggled = !toggledStates[itemID];

      if (isCurrentlyToggled) {
        return [...prevHashtags, itemName]; // 이전 배열에 현재 아이템 해시값을 추가한 새 배열 반환
      } else {
        return prevHashtags.filter((hashtag) => hashtag !== itemName); // 이전 배열에서 현재 아이템 해시값과 다른 값들만 필터링하여 새 배열 반환
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/hashtag/selectedTags",
        { hashtags: selectedHashtags }
      );
      console.log("해시태그 제출 성공", response.data);
    } catch (error) {
      console.error("해시태그 오류", error);
    }
  };

  return (
    <>
      <div>
        {tags.map((hashtag) => (
          <Button
            key={hashtag.id}
            onClick={() => handleToggle(hashtag.id, hashtag.hash)}
            style={{
              backgroundColor: toggledStates[hashtag.id] ? "green" : "red",
              color: "white",
            }}
          >
            {hashtag.hash}
          </Button>
        ))}
        <div>
          <Button htmlType="submit" onClick={handleSubmit}>
            해시태그 등록
          </Button>
        </div>
      </div>
    </>
  );
};

export default HashtagForm;
