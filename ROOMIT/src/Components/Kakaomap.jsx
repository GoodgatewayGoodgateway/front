import React, { useEffect } from "react";

export default function KakaoMap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=75bc5cd267066eb95e92ea0808e8c631&autoload=false";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // ✅ 마커 예시
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.5665, 126.978),
          map,
        });

        // ✅ 정보창
        const info = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:6px;font-size:14px;">📍 서울시청</div>`,
        });
        info.open(map, marker);
      });
    };

    document.head.appendChild(script);
  }, []);

  return <div id="map" className="card"></div>;
}
