import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import axios from "axios";

export default async function LogoutPage() {
  const router = useRouter();

  const response = await axios.get("http://localhost:5001/auth/logout");

  response.data.result ? router.push("/") : "";

  return <div>Logging out...</div>;
}
