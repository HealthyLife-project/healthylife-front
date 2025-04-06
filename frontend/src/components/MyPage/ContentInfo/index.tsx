import { ContentInfoStyle } from "./styled"; //스타일
import clsx from "clsx";

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
    <ContentInfoStyle className={clsx("main-wrap")}>
      <div className="user-info">
        <div className="info-row">
          <div className="info-label">이름</div>
          <div className="info-value">{name}</div>
        </div>
        <div className="info-row">
          <div className="info-label">닉네임</div>
          <div className="info-value">{nickname}</div>
        </div>
        <div className="info-row">
          <div className="info-label">ID</div>
          <div className="info-value">{userid}</div>
        </div>
        <div className="info-row">
          <div className="info-label">주소</div>
          <div className="info-value">{address}</div>
        </div>
        <div className="info-row">
          <div className="info-label">이메일</div>
          <div className="info-value">{email}</div>
        </div>
        <div className="info-row">
          <div className="info-label">성별</div>
          <div className="info-value">{gender}</div>
        </div>
        <div className="info-row">
          <div className="info-label">전화번호</div>
          <div className="info-value">{phone}</div>
        </div>
        <div className="info-row">
          <div className="info-label">선호하는 해시태그</div>
          <div className="info-value">좋음</div>
        </div>
      </div>
    </ContentInfoStyle>
  );
};

export default ContentInfo;
