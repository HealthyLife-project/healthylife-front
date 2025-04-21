import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//프리미엄에 가입하지 않은 경우 alert 띄어주기
const usePremium = () => {
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  return (tokenList: any) => {
    if (!tokenList.premiun) {
      MySwal.fire({
        icon: "error",
        title: "프리미엄 회원만 사용이 가능합니다.",
        footer:
          "<span>프리미엄 회원이 되기를 원하나요? 프리미엄 탭으로 이동하세요!</span>",
        allowOutsideClick: false,
      }).then(() => {
        router.push("/mypage");
      });
      return false;
    }
    return true;
  };
};

export default usePremium;
