import { MainBannerStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//swiper
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "antd";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import api from "@/util/chek";
import { useEffect, useState } from "react";

//Component

type AdBanner = {
  id: number;
  imgsrc: string;
  imgsrcAder: string | null;
};

//메인 페이지 > 메인 배너 컴포넌트
const MainBanner = () => {
  //변수 선언
  const router = useRouter();

  //useState
  const [bannerimg, setBannerImg] = useState<AdBanner[]>([]);

  useEffect(() => {
    //관리자 페이지에서 이미지 요청
    api.get("/ad/getAd").then((res) => {
      console.log("banenr res", res.data);
      setBannerImg(res.data);
    });
  }, []);

  return (
    <MainBannerStyled className={clsx("main-wrap")}>
      <div>
        <Swiper
          className="swiper"
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            {bannerimg[0]?.imgsrc ? (
              <img
                className="imgstyle"
                src={
                  process.env.NEXT_PUBLIC_ORIGIN_URL +
                  "/" +
                  bannerimg[0]?.imgsrc
                }
                alt="bannner-1"
              />
            ) : (
              <Skeleton.Node active className="imgstyle" />
            )}
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="imgstyle"
              src={
                process.env.NEXT_PUBLIC_ORIGIN_URL + "/" + bannerimg[1]?.imgsrc
              }
              alt="bannner-2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="imgstyle"
              src={
                process.env.NEXT_PUBLIC_ORIGIN_URL + "/" + bannerimg[2]?.imgsrc
              }
              alt="bannner-3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="imgstyle"
              src={
                process.env.NEXT_PUBLIC_ORIGIN_URL + "/" + bannerimg[3]?.imgsrc
              }
              alt="bannner-4"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </MainBannerStyled>
  );
};

export default MainBanner;
