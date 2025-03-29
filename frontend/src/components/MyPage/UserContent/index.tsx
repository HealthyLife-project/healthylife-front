import { UserContentStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import ContentInfo from "../ContentInfo";

//list
//import { userdata } from "./datalist";
import { userinfo } from "./model";

// interface User {
//   id: number;
//   userid: string;
//   name: string;
//   hashtag: string;
// }
let userdata: userinfo = {
  id: 1,
  userid: "hong",
  name: "gam",
  hashtag: "맑음",
};
//마이페이지 > 개인정보 컴포넌트
const UserContent = () => {
  return (
    <UserContentStyle>
      <ContentInfo info={userdata} />
    </UserContentStyle>
  );
};

export default UserContent;
