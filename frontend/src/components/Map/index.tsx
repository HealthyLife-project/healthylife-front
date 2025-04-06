import { useEffect, useRef, useState } from "react";
import { MapStyle } from "./styled"; //스타일
import clsx from "clsx";

//Component

declare global {
  interface Window {
    kakao: any;
  }
}

//마이페이지 > 운동정보 지도 컴포넌트
const KAKAOMap = () => {
  console.log("avigator.geolocation", navigator.geolocation);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var markers = []; //마커 배열
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };

        //맵 생성
        var map = new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return (
    <>
      <MapStyle className={clsx("main-wrap")}>
        <div id="map" className="main-map"></div>
      </MapStyle>
    </>
  );
};

export default KAKAOMap;
