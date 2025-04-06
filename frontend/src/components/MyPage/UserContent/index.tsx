import { UserContentStyle } from "./styled"; //스타일
import clsx from "clsx";
import api from "@/util/chek";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//Component
import ContentInfo from "../ContentInfo";

//마이페이지 > 개인정보 메인 컴포넌트
const UserContent = () => {
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState - userinfo
  const [name, setName] = useState(""); //이름
  const [nickname, SetNickName] = useState(""); //닉네임
  const [address, SetAddress] = useState(""); //주소
  const [email, SetEmail] = useState(""); //이메일
  const [gender, SetGender] = useState(""); //성별
  const [phone, SetPhone] = useState(""); //전화번호
  const [userid, SetUserid] = useState(tokenList.token.userid); //유저 아이디
  const [id, setId] = useState(tokenList.token.id);

  //useState - uesrhashtag
  const [hashTag, setHashTag] = useState([""]);
  //현재 로그인한 유저 정보 가져오기
  api.get(`/user/${id}`).then((res) => {
    setName(res.data.name);
    SetNickName(res.data.nickname);
    SetAddress(res.data.address);
    SetEmail(res.data.email);
    SetGender(res.data.gender);
    SetPhone(res.data.phone);
    SetUserid(res.data.userid);
  });

  //해당 유저에 해당하는 해시태그
  axios({
    method: "get",
    url: `http://localhost:5001/hashtag/hash/7`,
  }).then((res) => {
    //console.log(res.data)
    //setHashTag(res.data);
  });

  return (
    <UserContentStyle className={clsx("main-wrap")}>
      <ContentInfo
        name={name}
        nickname={nickname}
        address={address}
        email={email}
        gender={gender}
        phone={phone}
        userid={userid}
        hashtag={hashTag}
      />
    </UserContentStyle>
  );
};

export default UserContent;
