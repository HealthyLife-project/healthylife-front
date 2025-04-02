import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SocialLogin() {
  const router = useRouter();

  const { userid, token, signup } = router.query;

  console.log("query", router.query);
  useEffect(() => {
    if (signup === "false") {
      console.log("social-signup", userid, token, signup);

      // 회원가입이 아니라면 userid만 처리
      console.log("회원가입이 아니므로 userid:", userid);
    } else if (signup === "true" && token) {
      // 회원가입이면서 토큰이 있다면 JWT 토큰 처리
      console.log("회원가입이고, 토큰:", token);
    }
  }, [signup, userid, token]);

  return (
    <>
      <div>hello social login</div>
    </>
  );
}
