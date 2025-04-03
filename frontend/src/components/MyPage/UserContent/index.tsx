import { UserContentStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component
import ContentInfo from "../ContentInfo";

//list
//import { userdata } from "./datalist";
import axios from "axios";
import { useState } from "react";

//마이페이지 > 개인정보 메인 컴포넌트
const UserContent = () => {
  //useState - userinfo
  const [name, setName] = useState(""); //이름
  const [nickname, SetNickName] = useState(""); //닉네임
  const [address, SetAddress] = useState(""); //주소
  const [email, SetEmail] = useState(""); //이메일
  const [gender, SetGender] = useState(""); //성별
  const [phone, SetPhone] = useState(""); //전화번호
  const [userid, SetUserid] = useState(""); //유저 아이디

  //useState - uesrhashtag
  const [hashTag, setHashTag] = useState([""]);

  //현재 로그인한 유저 정보 가져오기
  axios({
    method: "get",
    url: `http://localhost:5001/user/7`,
  }).then((res) => {
    //console.log("res", res.data);
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
