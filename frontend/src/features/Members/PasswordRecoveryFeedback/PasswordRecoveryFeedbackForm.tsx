import { PasswordRecoveryFeedbackPageStyled, StyledLink } from "./styled";

export default function PasswordRecoveryFeedbackPage() {
  return (
    <>
      <PasswordRecoveryFeedbackPageStyled>
        <h1>이메일을 확인해 주십시오.</h1>
        <p>
          비밀번호 재설정을 위해 귀하의 이메일 주소로 이메일이 발송되었습니다.
        </p>
        <div>
          <StyledLink href="/login">로그인 화면으로 이동</StyledLink>
        </div>
      </PasswordRecoveryFeedbackPageStyled>
    </>
  );
}
