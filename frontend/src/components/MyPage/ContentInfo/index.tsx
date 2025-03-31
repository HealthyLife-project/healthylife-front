import { userinfo } from "../UserContent/model"; //interface model
import { ContentInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component

//list

interface User {
  info: userinfo;
}

//마이페이지 > 개인정보 > 내용 컴포넌트
const ContentInfo: React.FC<User> = ({ info }) => {
  //const { id, userid, name, hashtag } = props;
  return (
    <ContentInfoStyle>
      <div>
        <div>Name : {info.name}</div>
        <div>hashtag : {info.hashtag}</div>
      </div>
    </ContentInfoStyle>
  );
};

export default ContentInfo;
