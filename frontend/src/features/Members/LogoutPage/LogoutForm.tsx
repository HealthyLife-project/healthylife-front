import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setTokenList } from "@/redux/redux";
import { useEffect } from "react";
import api from "@/util/chek";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.get("/auth/logout");
        dispatch(setTokenList({ token: { name: "" } })); // redux 초기화
        router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, []);

  return <div>로그아웃 중입니다</div>;
};
export default LogoutPage;
