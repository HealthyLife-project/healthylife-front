import { useEffect, useRef, useState } from "react";
import { MapStyle } from "./styled";
import clsx from "clsx";
import api from "@/util/chek";

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAOMap = () => {
  const mapRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null); // 공통 InfoWindow
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            // 1. 지도 설정
            const mapContainer = document.getElementById("map");
            const mapOption = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 5,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
            mapRef.current = map;

            // 2. 현재 위치 마커
            new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(lat, lng),
              title: "현재 위치",
            });

            // 3. 공통 InfoWindow 생성
            const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
            infoWindowRef.current = infoWindow;

            // 4. 서버에 위치 전송
            try {
              const res = await api.post("/maps/search", {
                lat,
                lng,
              });
              const data = res.data;
              setPlaces(data);

              // 5. 마커 표시
              data.forEach((place: any) => {
                const markerPosition = new window.kakao.maps.LatLng(
                  place.y,
                  place.x
                );

                const marker = new window.kakao.maps.Marker({
                  map,
                  position: markerPosition,
                  title: place.place_name,
                });

                const content = `
                    <div style="
                        background: white;
                        padding: 10px;
                        border-radius: 8px;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                        font-size: 13px;
                        line-height: 1.5;
                    ">
                        <strong>${place.place_name}</strong><br/>
                        <p style="margin: 0;">${
                          place.road_address_name || ""
                        }</p>
                    </div>
                `;

                window.kakao.maps.event.addListener(marker, "click", () => {
                  // 기존 infoWindow 닫고 새로 열기
                  infoWindowRef.current.setContent(content);
                  infoWindowRef.current.open(map, marker);
                });

                // 빈 공간 클릭 시 InfoWindow 닫기
                window.kakao.maps.event.addListener(map, "click", () => {
                  infoWindowRef.current.close();
                });
              });
            } catch (error) {
              console.error("장소 검색 실패", error);
            }
          });
        }
      });
    });
  }, []);

  return (
    <MapStyle className={clsx("main-wrap")}>
      <div id="map"></div>
    </MapStyle>
  );
};

export default KAKAOMap;
