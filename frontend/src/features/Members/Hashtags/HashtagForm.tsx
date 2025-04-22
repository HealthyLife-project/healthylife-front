import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import api from "@/util/chek";
import { useRouter } from "next/router";
import { HashtagFormStyled, StyledHashtagButton } from "./styled";

// 백엔드 응답 데이터의 각 항목 구조 정의
interface Hashtags {
  id: string;
  hash: string;
  category: string;
  categoryid: string;
}

interface HashtagFormProps {
  userid: number;
  onCloseModal: () => void;
}

const HashtagForm: React.FC<HashtagFormProps> = ({ userid, onCloseModal }) => {
  const router = useRouter();
  // 백엔드에서 가져온 데이터 배열을 저장하는 상태, 초기값은 빈 배열
  const [tags, setTags] = useState<Hashtags[]>([]);
  // 카테고리별 그룹화된 해시태그를 저장하는 상태
  const [groupedTags, setGroupedTags] = useState<{ [key: string]: Hashtags[] }>(
    {}
  );
  // 각 버튼의 토글 상태 (참/거짓), 초기값은 빈 객체 (키:버튼ID)
  const [toggledStates, setToggledStates] = useState<{
    [key: string]: boolean;
  }>({});
  // 선택된 해시값들 저장
  const [selectedHashtags, setSelectedHashtags] = useState<
    { hash: string; categoryid: string }[]
  >([]);

  useEffect(() => {
    const hashtagRequest = async () => {
      try {
        const response = await api.get("/hashtag/allhash");
        setTags(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    hashtagRequest();
  }, []);

  // tags 상태가 업데이트될 때 카테고리별 그룹화
  useEffect(() => {
    const groupHashtagsByCategory = () => {
      const grouped: { [key: string]: Hashtags[] } = {};
      tags.forEach((tag) => {
        if (grouped[tag.categoryid]) {
          grouped[tag.categoryid].push(tag);
        } else {
          grouped[tag.categoryid] = [tag];
        }
      });
      setGroupedTags(grouped);
    };

    groupHashtagsByCategory();
  }, [tags]);

  // 클릭된 버튼의 ID를 인자로 받음, Hash 값도 받음
  // 상태업데이트 혹은 이전 상태 기반으로 업데이트
  const handleToggle = (
    itemID: string,
    itemName: string,
    itemCategoryId: string
  ) => {
    setToggledStates((prevStates) => ({
      ...prevStates,
      [itemID]: !prevStates[itemID], // 클릭된 버튼의 ID에 해당하는 토글 상태를 반전
    }));

    setSelectedHashtags((prevHashtags) => {
      const isHashtagSelected = prevHashtags.some(
        (hashtagObj) => hashtagObj.hash === itemName
      );

      if (isHashtagSelected) {
        return prevHashtags.filter(
          (hashtagObj) => hashtagObj.hash !== itemName
        );
      } else {
        return [
          ...prevHashtags,
          { hash: itemName, categoryid: itemCategoryId },
        ];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedHashtags.length < 2) {
      notification.warning({
        message: "경고",
        description: "2개 이상의 해시태그를 선택해 주세요.",
        duration: 3,
      });
      return;
    }

    const hashtagsAndCategories = selectedHashtags.map(
      ({ hash, categoryid }) => ({
        hashtag: hash,
        category: categoryid,
      })
    );

    try {
      const response = await api.post("/hashtag/selectedTags", {
        userid: userid,
        hashtagsAndCategories: hashtagsAndCategories,
      });

      notification.success({
        message: ":)",
        description: "해시태그 등록에 성공하였습니다.",
        duration: 3,
      });

      onCloseModal();
      router.push("/");
    } catch (error) {
      console.error("해시태그 오류", error);
      notification.error({
        message: ":(",
        description: "해시태그 등록에 실패하였습니다.",
        duration: 3,
      });
    }
  };

  return (
    <>
      <div>
        <HashtagFormStyled>
          <div className="hashtags-container">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {Object.values(groupedTags)
                .flat()
                .map((hashtag) => (
                  <StyledHashtagButton
                    className="hashtags"
                    key={hashtag.id}
                    onClick={() =>
                      handleToggle(hashtag.id, hashtag.hash, hashtag.categoryid)
                    }
                    $toggled={!!toggledStates[hashtag.id]}
                  >
                    {hashtag.hash}
                  </StyledHashtagButton>
                ))}
            </div>
          </div>
          <div className="submit-container">
            <div style={{ marginTop: "20px" }}>
              <Button
                className="registerHashtags"
                htmlType="submit"
                onClick={handleSubmit}
              >
                해시태그 등록
              </Button>
            </div>
          </div>
        </HashtagFormStyled>
      </div>
    </>
  );
};

export default HashtagForm;
