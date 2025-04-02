import { setCookie } from "cookies-next";
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
      setCookie("healthy_token", token, {
        path: "/",
        maxAge: 60 * 60 * 2, // 2시간 유지
      });
    }
  }, [signup, userid, token]);
  return (
    <>
      <div>hello social login</div>
    </>
  );
}
