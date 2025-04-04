import { deleteCookie } from "cookies-next";
import { LogoutPageStyled } from "./styled";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import axios from "axios";

export default async function LogoutPage() {
  const router = useRouter();
  const response = await axios.get("http://localhost:5001/auth/logout");

  response.data.result ? router.push("/") : "";

  return <div>Logging out...</div>;
}
