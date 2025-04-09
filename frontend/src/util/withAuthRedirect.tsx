import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface RootState {
  [x: string]: any;
  auth: {
    isLoggedIn: string;
  };
}

//로그인을 하지 않은 경우 로그인 페이지로 이동
const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const MySwal = withReactContent(Swal);

  const AuthRedirectWrapper = (props: any) => {
    const router = useRouter();
    const isLoggedIn = useSelector((state: RootState) => {
      if (!state.token.tokenList) {
        return "notlogin";
      } else {
        return state.token.tokenList.userid;
      }
    });

    useEffect(() => {
      if (isLoggedIn === "notlogin") {
        MySwal.fire({
          icon: "error",
          title: "로그인이 필요한 서비스 입니다.",
          footer:
            '<span>회원가입이 필요한가요?</span><a href="/signup"> 이곳을 누르세요!</a>',
        }).then(() => {
          router.push("/login");
        });
      }
    }, [isLoggedIn]);
    //router.push("/");
    if (!isLoggedIn) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthRedirectWrapper;
};

export default withAuthRedirect;
