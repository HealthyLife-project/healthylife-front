import { UserImageStyle } from "./styled"; //스타일
import clsx from "clsx";
import Image from "next/image";

//image
import userimage from "../../../assets/images/usericon.png";

//마이 페이지 > 개인정보 > 이미지 컴포넌트
const UserImage = () => {
  return (
    <UserImageStyle>
      <div className={clsx("main-image")}>
        <Image
          src={userimage}
          alt="user"
          className={clsx("user-image-style")}
        />
      </div>
    </UserImageStyle>
  );
};

export default UserImage;
