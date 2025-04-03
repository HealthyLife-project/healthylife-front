import { deleteCookie } from "cookies-next";
import { LogoutPageStyled } from "./styled";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();
  deleteCookie("token"); // Delete the cookie using cookies-next
  router.push("/");
}
