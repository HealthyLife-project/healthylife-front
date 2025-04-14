import clsx from "clsx";
import { DrawerStyled } from "./styled";
import { useRouter } from "next/router";
import { Button, Segmented } from "antd";
import api from "@/util/chek";
import { useDispatch, useSelector } from "react-redux";
import { setTokenList } from "@/redux/redux";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { setTheme, selectTheme } from "@/redux/theme";

//Drawer 컴포넌트
const DrawerContainer = () => {
  //변수 선언
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useSelector(selectTheme);

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

  //onChange
  const onChange = (e: string) => {
    //console.log("onChange", e);
    dispatch(setTheme(e as "light" | "dark"));
  };

  return (
    <DrawerStyled className={clsx("main-wrap")}>
      <div onClick={openMyPage} className="mypage-router">
        마이페이지
      </div>
      <div className="mypage-router">채팅방 목록</div>
      <div className="main-bottom">
        <Button className="main-logout" onClick={handleLogout}>
          로그아웃
        </Button>
        <div className="dark-mode">
          <Segmented
            shape="round"
            options={[
              { value: "light", icon: <SunOutlined /> },
              { value: "dark", icon: <MoonOutlined /> },
            ]}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
      </div>
    </DrawerStyled>
  );
};

export default DrawerContainer;
