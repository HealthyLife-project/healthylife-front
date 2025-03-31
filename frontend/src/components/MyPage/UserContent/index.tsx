import { UserContentStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import ContentInfo from "../ContentInfo";

//list
import { userdata } from "./datalist";

//마이페이지 > 개인정보 메인 컴포넌트
const UserContent = () => {
  return (
    <UserContentStyle>
      <ContentInfo info={userdata} />
    </UserContentStyle>
  );
};

export default UserContent;
