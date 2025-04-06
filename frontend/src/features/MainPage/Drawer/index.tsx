import { DrawerStyled } from "./styled";
import { useRouter } from "next/router";

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
    <>
      <div onClick={openMyPage} className="mypage-router">
        마이페이지
      </div>
      <button className="main-logout" onClick={handleLogout}>
        로그아웃
      </button>
      <div>다크모드</div>
    </>
  );
};

export default DrawerContainer;
