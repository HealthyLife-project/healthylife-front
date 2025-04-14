import { FooterStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//Footer 컴포넌트
const Footer = () => {
  const router = useRouter();

  const github = () => {
    window.location.href =
      "https://github.com/orgs/HealthyLife-project/repositories";
  };

  return (
    <FooterStyled className={clsx("main-wrap")}>
      <div className="team">
        <span className="team-company">HEALTHY LIFE</span>
        <span className="team-content">
          Contant team.healthy.official.gmail.com
        </span>
        <span className="team-content">
          Copyright Healthy. All rights reserved
        </span>
        <span className="team-content github" onClick={github}>
          Github
        </span>
      </div>
    </FooterStyled>
  );
};
export default Footer;
