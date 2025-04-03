import { UserContentStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import ContentInfo from "../ContentInfo";

//list
import { userdata } from "./datalist";
import axios from "axios";

//마이페이지 > 개인정보 메인 컴포넌트
const UserContent = () => {
  //현재 로그인한 유저 정보 가져오기
  axios({
    method: "get",
    url: "http://localhost:5001/user/findall",
  }).then((res) => {
    console.log("res", res.data);
  });

  return (
    <UserContentStyle className={clsx("main-wrap")}>
      <ContentInfo info={userdata} />
    </UserContentStyle>
  );
};

export default UserContent;
