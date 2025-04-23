import { setTokenList } from "@/redux/redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SocialLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userid, token, signup } = router.query;

  useEffect(() => {
    // userid와 token이 string일 경우만 처리
    if (typeof userid === "string" && typeof token === "string") {
      dispatch(
        setTokenList({
          token: {
            userid: userid,
            name: "",
            id: "",
            premium: 0,
          },
        })
      );
    }

    if (signup === "false") {
      // 처음 소셜 로그인 한 경우
      router.push("/mypage?signup=false");
    } else if (signup === "true") {
      router.push("/");
    }
  }, [signup, userid, token, dispatch, router]);

  return <div></div>;
}
