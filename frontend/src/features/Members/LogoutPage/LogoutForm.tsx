import { deleteCookie } from "cookies-next";
import { LogoutPageStyled } from "./styled";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function LogoutPage() {
  const router = useRouter();
  Cookies.remove("healthy_token"); // Delete the cookie using cookies-next
  router.push("/");
}
