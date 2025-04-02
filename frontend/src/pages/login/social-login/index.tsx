import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SocialLogin() {
  const router = useRouter();

  // URL에서 쿼리 파라미터 값 가져오기
  const { userid, token, signup } = router.query;

  console.log("query", userid, token, signup);

  useEffect(() => {
    if (signup === "false") {
      // 먼저 해시태크 값을들 고르게 한후에 저장
      // 그 이후 /mypage 이동후 추가 정보 작성

      //   router.push("/mypage");
      // 회원가입이 아니라면 userid만 처리
      console.log("회원가입이 아니므로 userid:", userid);
      console.log("hello");
      router.push("/hashtag");
    } else if (signup === "true" && token) {
      //   router.push("/");
    }
  }, [signup, userid, token]);
}
