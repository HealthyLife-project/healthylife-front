import { MainBannerStyled } from "./styled";
import { useRouter } from "next/router";
import clsx from "clsx";

//swiper
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
    api.get("/ad/getAd").then((res) => {
      console.log("res", res.data);

      setBannerImg(res.data);
    });

    console.log(bannerimg);
  }, []);

  return (
    <MainBannerStyled className={clsx("main-wrap")}>
      <div>
        <Swiper
          className="swiper"
          spaceBetween={50}
          slidesPerView={1}
          //onSlideChange={() => console.log("slide change")}
          //onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <img
              src={process.env.NEXT_PUBLIC_ORIGIN_URL + bannerimg[0]?.imgsrc}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div>
    </MainBannerStyled>
  );
};

export default MainBanner;
