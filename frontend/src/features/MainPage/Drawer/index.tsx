import clsx from "clsx";
import { DrawerStyled } from "./styled";
import { useRouter } from "next/router";
import { Button, Switch } from "antd";
import api from "@/util/chek";
import { useDispatch } from "react-redux";
import { setTokenList } from "@/redux/redux";

//Drawer 컴포넌트
const DrawerContainer = () => {
  //변수 선언
  const dispatch = useDispatch();
  const router = useRouter();

  //마이페이지 이동
  const openMyPage = () => {
    router.push("/mypage");
  };
  // 로그아웃 버튼
  function handleLogout() {
    try {
      api.get("/auth/logout");
      dispatch(
        setTokenList({
          token: {
            name: "",
            userid: "",
            id: "",
          },
        })
      ); // redux 초기화
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <DrawerStyled className={clsx("main-wrap")}>
      <div onClick={openMyPage} className="mypage-router">
        마이페이지
      </div>
      <div className="main-bottom">
        <Button className="main-logout" onClick={handleLogout}>
          로그아웃
        </Button>
        <div className="dark-mode">
          <Switch
            checkedChildren="Light"
            unCheckedChildren="Night"
            defaultChecked
          />
        </div>
      </div>
    </DrawerStyled>
  );
};

export default DrawerContainer;
