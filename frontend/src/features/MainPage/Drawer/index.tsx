import clsx from "clsx";
import { DrawerStyled } from "./styled";
import { useRouter } from "next/router";
import { Button } from "antd";

//Drawer 컴포넌트
const DrawerContainer = () => {
  const router = useRouter();

  //마이페이지 이동
  const openMyPage = () => {
    router.push("/mypage");
  };
  // 로그아웃 버튼
  function handleLogout() {
    router.push("/logout");
  }

  return (
    <DrawerStyled className={clsx("main-wrap")}>
      <div onClick={openMyPage} className="mypage-router">
        마이페이지
      </div>
      <Button className="main-logout" onClick={handleLogout}>
        로그아웃
      </Button>
      <div>다크모드</div>
    </DrawerStyled>
  );
};

export default DrawerContainer;
