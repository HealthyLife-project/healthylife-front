import { userinfo } from "../UserContent/model"; //interface model
import { ContentInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component

//list

// interface User {
//   info: userinfo;
// }

//마이페이지 > 개인정보 > 내용 컴포넌트
const ContentInfo = (props: {
  name: string;
  nickname: string;
  address: string;
  email: string;
  gender: string;
  phone: string;
  userid: string;
  hashtag: string[];
}) => {
  const { name, nickname, address, email, gender, phone, userid, hashtag } =
    props;
  return (
    <ContentInfoStyle>
      <div>
        <div>이름 : {name}</div>
        <div>닉네임 : {nickname}</div>
        <div>ID : {userid}</div>
        <div>address : {address} </div>
        <div>email : {email}</div>
        <div>gender :{gender} </div>
        <div>phone : {phone}</div>
      </div>
      <div>
        <div>선호하는 HASHTAG</div>
        <div>dfs</div>
      </div>
    </ContentInfoStyle>
  );
};

export default ContentInfo;
