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
      //처음 소셜 로그인 한 경우
      router.push("/mypage?signup=false");
    } else if (signup === "true") {
      router.push("/");
    }
  }, [signup, userid, token]);
  return (
    <>
      <div>hello social login</div>
    </>
  );
}
