import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KakaoMap from "../Components/Kakaomap";
import "./css/IncreaseKakaoMap.css";

const IncreaseKakaoMap = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="increaseKakaoMap">
      <KakaoMap livingSpace={data.livingSpace} id={data.id} style="height=100vh" />
    </div>
  );
};

export default IncreaseKakaoMap;
