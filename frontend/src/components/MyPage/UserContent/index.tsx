import { UserContentStyle } from "./styled"; //스타일
import clsx from "clsx";
import api from "@/util/chek";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//Component
import ContentInfo from "../ContentInfo";

//마이페이지 > 개인정보 메인 컴포넌트
const UserContent = () => {
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수

  //useState - userinfo
  const [name, setName] = useState(""); //이름
  const [nickname, setNickName] = useState(""); //닉네임
  const [address, setAddress] = useState(""); //주소
  const [email, setEmail] = useState(""); //이메일
  const [gender, setGender] = useState(""); //성별
  const [phone, setPhone] = useState(""); //전화번호
  const [userid, setUserid] = useState(""); //유저 아이디
  const [id, setId] = useState<number | undefined>(undefined);

  //useState - uesrhashtag
  const [hashTag, setHashTag] = useState([""]);

  //새로고침 시 redux 타이밍을 맞추기 위한 useEffect
  useEffect(() => {
    if (tokenList?.id) {
      setId(tokenList.id);
    }
  }, [tokenList]);

  //현재 로그인한 유저 정보 가져오기
  useEffect(() => {
    if (!id) return;

    api.get(`/user/${id}`).then((res) => {
      setName(res.data.name);
      setNickName(res.data.nickname);
      setAddress(res.data.address);
      setEmail(res.data.email);
      setGender(res.data.gender);
      setPhone(res.data.phone);
      setUserid(res.data.userid);
    });
  }, [id]);
  //해당 유저에 해당하는 해시태그
  // axios({
  //   method: "get",
  //   url: `http://localhost:5001/hashtag/hash/7`,
  // }).then((res) => {
  //   //console.log(res.data)
  //   //setHashTag(res.data);
  // });

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
