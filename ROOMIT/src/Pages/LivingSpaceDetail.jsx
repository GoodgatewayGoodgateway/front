import "./css/LivingSpaceDetail.css";
import Header from "../Components/Header";
import LivingSpaceData from "../Data/LivingSpaceData";
import { useNavigate, useParams } from "react-router-dom";
import KakaoMap from "../Components/Kakaomap";

const LivingSpaceDetail = () => {
  const { id } = useParams();
  const livingSpace = LivingSpaceData.find((it) => String(it.id) === id);
  const navigate = useNavigate();
  const currentLivingSpaceId = 99;

  if (!livingSpace) {
    return <div>해당 매물을 찾을 수 없습니다.</div>;
  }

  const dataToSend = { id: id, livingSpace: livingSpace };
  const handleClick = () => {
    navigate(`/housing/${id}/map`, { state: dataToSend });
  };

  return (
    <div className="livingSpaceDetail">
      <Header />

      <div className="livingSpaceDetail-content">
        <div className="card livingSpaceDetail-item">
          <div className="image-container">
            <img
              src="https://img.khan.co.kr/news/r/1100xX/2024/07/21/news-p.v1.20240719.96f020c1776f4ef69692b7b6825fb827.webp"
              alt={livingSpace.name}
            />
          </div>

          <div className="info">
            <h3>{livingSpace.name}</h3>
            <p>임대 유형: {livingSpace.type}</p>
            <p>임대료: {livingSpace.price}</p>
            <p>위치: {livingSpace.location}</p>
            <p>최대 인원: {livingSpace.maxPersons}</p>
            <p>현재 인원: {livingSpace.presentPersons}</p>
            <p>전용면적: {livingSpace.netLeasableArea}평</p>
            <p>등록일: {livingSpace.registrationTime}</p>
          </div>
        </div>

        <div className="card livingSpace-map">
          <KakaoMap livingSpace={livingSpace} id={currentLivingSpaceId} />
          <button id={id} onClick={handleClick}>
            크게보기
          </button>
        </div>

        <div className="card livingSpace-feature">특징(주변 편의시설, 역세권 등등)</div>
      </div>
    </div>
  );
};
export default LivingSpaceDetail;
