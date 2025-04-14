// hooks/useCheckLoginAlert.ts
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//로그인을 하지 않은 경우 alert 띄어주기
const useCheckLoginAlert = () => {
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  return (tokenList: any) => {
    if (!tokenList) {
      MySwal.fire({
        icon: "error",
        title: "로그인이 필요한 서비스 입니다.",
        footer:
          '<span>회원가입이 필요한가요?</span><a href="/signup"> 이곳을 누르세요!</a>',
        allowOutsideClick: false,
      }).then(() => {
        router.push("/login");
      });
      return false;
    }
    return true;
  };
};

export default useCheckLoginAlert;
