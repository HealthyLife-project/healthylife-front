import MyPage from "@/components/MyPage/Main";
import withAuthRedirect from "@/util/withAuthRedirect";

// export default function Signup() {
//   return <MyPage />;
// }
export default withAuthRedirect(MyPage);
