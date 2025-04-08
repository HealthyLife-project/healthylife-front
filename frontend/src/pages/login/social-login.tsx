import { setTokenList } from "@/redux/redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SocialLogin() {
  //변수 선언
  const router = useRouter();
  const dispatch = useDispatch();
  const { userid, token, signup } = router.query;

  //console.log("query", router.query);

  dispatch(
    setTokenList({
      token: {
        userid: userid,
      },
    })
  );

  useEffect(() => {
    if (signup === "false") {
      //
      //console.log("social-signup", userid, token, signup);
      router.push("/");
      // 회원가입이 아니라면 userid만 처리
      //console.log("회원가입이 아니므로 userid:", userid);
    } else if (signup === "true") {
      //&& token
      router.push("/");
    }
  }, [signup, userid, token]);
  return (
    <>
      <div>hello social login</div>
    </>
  );
}
