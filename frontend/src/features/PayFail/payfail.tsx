import { useEffect } from "react";
import { useRouter } from "next/router";

export default function FailPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return <div></div>;
}
