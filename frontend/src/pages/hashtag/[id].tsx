import HashTag from "@/features/HashTag";
import { useRouter } from "next/router";

const HashTagModify = () => {
  const router = useRouter();

  const { id } = router.query;

  return <HashTag id={id} />;
};

export default HashTagModify;
