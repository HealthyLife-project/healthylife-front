import { UserInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import UserContent from "../UserContent";

//마이페이지 > 개인정보 컴포넌트
const Userinfo = () => {
  return (
    <UserInfoStyle className={clsx("main-wrap")}>
      <div className="user-info">
        <UserContent />
      </div>
    </UserInfoStyle>
  );
};

export default Userinfo;
