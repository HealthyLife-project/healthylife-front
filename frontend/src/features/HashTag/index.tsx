import clsx from "clsx";
import { HashTagStyle } from "./styled";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import api from "@/util/chek";
import { useFormik } from "formik";
import { Button } from "antd";

const HashTag = (props: { id: number }) => {
  //변수 선언
  const { id } = props;
  const [hashlist, setHashList] = useState([""]); //전체 해시태그
  const [userhash, setUserHash] = useState([""]); //유저가 선택한 해시태그
  //useEffect

  useEffect(() => {
    //해시태그 전체 가져 오기
    api.get(`/hashtag/allhash`).then((res) => {
      let hash = res.data
        .filter((item: { hash: string }) => item.hash)
        .map((item: { hash: string }) => item.hash);

      setHashList(hash);
    });

    //유저 id에 해당하는 해시태그 가져오기
    // api.get(`/hashtag/user/${id}`).then((res) => {
    //   console.log("res", res.data);
    // });
  }, []);

  //해시태그 수정 폼
  const hashFormik = useFormik({
    initialValues: {},
    enableReinitialize: true, //state 값 update
    onSubmit: (values) => {
      //폼 안에 버튼을 눌렀을 때 생기는 것
      console.log("values", values);
    },
  });

  return (
    <>
      <Header />
      <HashTagStyle className={clsx("main-wrap")}>
        <h1>HASHTAG</h1>
        <form className="hash-form" onSubmit={hashFormik.handleSubmit}>
          <div className="hash-section">
            {hashlist.map((item: string, index: number) => {
              return (
                <div className="hash-content" key={index}>
                  {item}
                </div>
              );
            })}
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
