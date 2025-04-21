import clsx from "clsx";
import { DrawerHeaderStyle } from "./styled";

//image
import heart from "@/assets/images/favorite.png";
import { useRouter } from "next/router";

/*
1.user name 띄우기
2.프리미엄확인하기
3.해시태그 수정 바로가기
*/

//Drawer Header 컴포넌트
const DrawerHeader = (props: { name: string; id: number }) => {
  //변수 선언
  const { name, id } = props;
  const router = useRouter();

  //해시태그 수정 페이지 이동
  const hashtag = () => {
    router.push(`/hashtag/${id}`);
  };

  //마이페이지 이동
  const mypage = () => {
    router.push("/mypage");
  };

  return (
    <DrawerHeaderStyle className={clsx("main-wrap")}>
      <div onClick={mypage} className="mypage-router">
        {name}
      </div>
      <div className="heart-img" onClick={hashtag}>
        <img className="imgstyle" src={heart.src} alt="heart" />
      </div>
    </DrawerHeaderStyle>
  );
};

export default DrawerHeader;
