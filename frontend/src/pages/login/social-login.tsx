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
  useEffect(() => {
    // userid와 token이 string일 경우에만 처리
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

    // signup 값에 따라 리디렉션 처리
    if (signup === "false") {
      router.push("/mypage?signup=false");
    } else if (signup === "true") {
      router.push("/");
    }
  }, [dispatch, router, signup, userid, token]); // 의존성 배열 추가

  return (
    <>
      <div></div>
    </>
  );
}
