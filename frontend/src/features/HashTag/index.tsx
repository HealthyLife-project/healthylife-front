import clsx from "clsx";
import { HashTagStyle } from "./styled";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import api from "@/util/chek";
import { useFormik } from "formik";
import { Button } from "antd";
import { openNotificationWithIcon } from "@/util/notification";

const HashTag = (props: { id: number }) => {
  //변수 선언
  const { id } = props;
  const [hashlist, setHashList] = useState<
    { id: number; hash: string; categoryid: number }[]
  >([]); //전체 해시태그
  const [userhash, setUserHash] = useState<
    { id: number; hashtagId: number; category: string }[]
  >([]); //유저가 회원가입 시 선택한 해시태그
  const [updatelist, setUpdateList] = useState<{
    id: number;
    arr: { hashtag: number; category: number }[];
  }>({ id: id, arr: [] }); //업데이트할 배열

  //useEffect
  useEffect(() => {
    //해시태그 전체 가져 오기
    api.get(`/hashtag/allhash`).then((res) => {
      console.log("all res", res.data);
      setHashList(res.data);
    });

    //유저 id에 해당하는 해시태그 가져오기
    api.get(`/hashtag/user/${id}`).then((res) => {
      console.log("user res", res.data);
      setUserHash(res.data);

      // 기존 유저 해시태그를 updatelist에 설정
      setUpdateList((prevState) => ({
        ...prevState,
        id: Number(id),
        arr: res.data.map((uh: { hashtagId: any; category: any }) => ({
          hashtag: uh.hashtagId,
          category: Number(uh.category),
        })),
      }));
    });
  }, [id]); // id가 변경될 때마다 실행

  // 해시태그 클릭 시 처리
  const handleHashClick = (item: {
    id: number;
    hash: string;
    categoryid: number;
  }) => {
    const isAlreadySelected = updatelist.arr.some(
      (arrItem) =>
        arrItem.hashtag === item.id && arrItem.category === item.categoryid
    );

    if (isAlreadySelected) {
      // 이미 선택된 해시태그는 제거
      setUpdateList((prevState) => ({
        ...prevState,
        id: Number(id),
        arr: prevState.arr.filter(
          (arrItem) =>
            !(
              arrItem.hashtag === item.id &&
              arrItem.category === item.categoryid
            )
        ),
      }));
    } else {
      // 선택되지 않은 해시태그는 추가
      setUpdateList((prevState) => ({
        ...prevState,
        id: Number(id),
        arr: [
          ...prevState.arr,
          { hashtag: item.id, category: item.categoryid },
        ],
      }));
    }
  };

  //해시태그 수정 폼
  const hashFormik = useFormik({
    initialValues: {},
    enableReinitialize: true, //state 값 update
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      //console.log("updatelist", updatelist);
      api
        .post("/hashtag/update", updatelist)
        .then((res) => {
          //console.log("hash update res", res.data);
          openNotificationWithIcon("success", "성공적으로 수정하였습니다.");
        })
        .catch((error: string) => {
          console.log("error", error);
        });
    },
  });

  return (
    <>
      <Header />
      <HashTagStyle className={clsx("main-wrap")}>
        <h1>HASHTAG</h1>
        <form className="hash-form" onSubmit={hashFormik.handleSubmit}>
          <div className="hash-section">
            {hashlist.map(
              (item: { id: number; hash: string; categoryid: number }) => {
                const isSelected = updatelist.arr.some(
                  (arrItem) =>
                    arrItem.hashtag === item.id &&
                    arrItem.category === item.categoryid
                );
                return (
                  <div
                    className={clsx("hash-content", { selected: isSelected })}
                    key={item.id}
                    onClick={() => handleHashClick(item)} // 해시태그 클릭 시 처리
                  >
                    {item.hash}
                  </div>
                );
              }
            )}
          </div>

          <Button className="hash-btn" htmlType="submit">
            저장
          </Button>
        </form>
      </HashTagStyle>
    </>
  );
};

export default HashTag;
