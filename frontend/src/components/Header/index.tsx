import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button, Drawer, Input } from "antd";
//Component
import DrawerContainer from "@/features/MainPage/Drawer";

interface UserType {
  name: string;
}

interface TokenState {
  tokenList: {
    token: UserType;
  };
}

//헤더 컴포넌트
const Header = () => {
  //useState
  const [isLogin, setIsLogin] = useState(false); //로그인 상태 확인
  const [name, setname] = useState(""); //로그인한 유저 이름 저장
  const [userid, setUserid] = useState(""); //소셜 로그인을 한 유저 아이디
  const [open, setOpen] = useState(false); //drawer 여부 확인

  //변수 선언
  const tokenList = useSelector((state: RootState) => state.token.tokenList); //store 확인용 변수
  const router = useRouter();

  //로그인 정보 확인 - store용
  useEffect(() => {
    console.log("tokenList 업데이트됨:", tokenList);
    const username = tokenList?.name;
    const userid = tokenList?.userid;

    if (tokenList && (username || userid)) {
      setIsLogin(true);
      setname(username || "");
      setUserid(userid || "");
    } else {
      setIsLogin(false);
      setname("");
      setUserid("");
    }
  }, [tokenList]);

  // 로그인 버튼 클릭
  function handleLogin() {
    router.push("/login");
  }

  //Drawer 열기
  const showDrawer = () => {
    setOpen(true);
  };

  //Drawer 닫기
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderStyled className={clsx("main-wrap")}>
        <div
          className="main-logo"
          onClick={() => {
            router.push("/");
          }}
        >
          HEALTHY LIFE
        </div>
        <div className="login-and-signup">
          {isLogin ? (
            <>
              <div>
                <span className="user-name" onClick={showDrawer}>
                  {userid ? userid : name}
                </span>
                님 환영합니다
              </div>
              <Drawer title={name} onClose={onClose} open={open}>
                <DrawerContainer />
              </Drawer>
            </>
          ) : (
            <>
              <button className={clsx("main-login")} onClick={handleLogin}>
                로그인
              </button>
              <button
                className={clsx("main-signup")}
                onClick={() => {
                  router.push("/signup");
                }}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </HeaderStyled>
    </>
  );
};
export default Header;
