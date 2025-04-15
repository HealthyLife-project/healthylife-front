import { UserInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import UserContent from "../UserContent";

//마이페이지 > 개인정보 컴포넌트
const Userinfo = () => {
  return (
    <UserInfoStyle className={clsx("main-wrap")}>
      <UserContent />
    </UserInfoStyle>
  );
};

export default Userinfo;
