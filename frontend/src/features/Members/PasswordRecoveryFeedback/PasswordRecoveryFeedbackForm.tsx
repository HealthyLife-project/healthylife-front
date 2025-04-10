import { PasswordRecoveryFeedbackPageStyled } from "./styled";
import Link from "next/link";

export default function PasswordRecoveryFeedbackPage() {
  return (
    <>
      <PasswordRecoveryFeedbackPageStyled>
        <h1>check your email</h1>
        <p>
          an email has been sent to your email address to reset your password
        </p>
        <div>
          <Link href="/login">back to login</Link>
        </div>
      </PasswordRecoveryFeedbackPageStyled>
    </>
  );
}
