import { FooterStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Coponent

//Footer 컴포넌트
const Footer = () => {
  const router = useRouter();

  return (
    <FooterStyled className={clsx("main-wrap")}>
      <div className="team">
        <span>HEALTHY LIFE</span>
        <span>Contant team.healthy.official.gmail.com</span>
        <span>Copyright Healthy. All rights reserved</span>
      </div>
      <div className="submenu">
        <span>이용약관</span>
        <span>개인정보처리방침</span>
        <span>서비스소개</span>
        <span>광고상품 소개</span>
      </div>
    </FooterStyled>
  );
};
export default Footer;
