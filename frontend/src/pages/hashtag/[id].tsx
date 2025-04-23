import { useRouter } from "next/router";
import HashTag from "@/features/HashTag";

const HashTagModify = () => {
  const router = useRouter();

  const { id } = router.query;

  // id가 string일 경우 number로 변환
  const numericId = typeof id === "string" ? Number(id) : undefined;

  // numericId가 undefined인 경우를 처리할 수 있는 로직 추가
  if (numericId === undefined) {
    return <div>Invalid or missing ID</div>; // 또는 로딩 화면, 오류 처리 등 추가 가능
  }

  return <HashTag id={numericId} />;
};

export default HashTagModify;
