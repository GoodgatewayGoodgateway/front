import "./css/LivingSpaceDetail.css";
import KakaoMap from "../Components/Kakaomap";
import Loading from "./Loading";
import RetryPage from "./RetryPage";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchListingById, fetchAiSummary } from "../services/livingSpace"; // ✅ 새로운 fetch 함수 사용

const LivingSpaceDetail = () => {
  const { id } = useParams(); // 문자열로 들어옴
  const navigate = useNavigate();

  const [livingSpace, setLivingSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListingById(id); // ✅ 백엔드에서 ID로 직접 요청
        setLivingSpace(data);

        const aiResult = await fetchAiSummary(data); // AI 요약도 요청
        setAiSummary(aiResult ?? ""); // summary 키만 저장
      } catch (err) {
        setError(err.message || "에러 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleMapClick = () => {
    navigate(`/housing/${id}/map`, {
      state: { id, livingSpace },
    });
  };

  if (loading) return <Loading />;
  if (error) return <RetryPage errorMessage={error} />;

  return (
    <div className="detail-container">

      <div className="detail-top">
        {/* 왼쪽 정보 카드 */}
        <div className="detail-card info-card">
          <h2>{livingSpace.name}</h2>

          <div className="info-list">
            <p><strong>가구 유형</strong> {livingSpace.type}</p>
            <p><strong>보증금</strong> {livingSpace.deposit}</p>
            {livingSpace.type !== "아파트" && (
              <p><strong>월세</strong> {livingSpace.monthly}</p>
            )}
            <p><strong>임대료</strong> {livingSpace.price}</p>
            <p><strong>위치</strong> {livingSpace.address}</p>
            <p><strong>전용면적</strong> {livingSpace.area}평</p>
          </div>
        </div>

        {/* 오른쪽 지도 */}
        <div className="detail-card map-card">
          <KakaoMap livingSpace={livingSpace} />
          <button className="map-open-btn" onClick={handleMapClick}>
            크게보기
          </button>
        </div>
      </div>

      {/* AI 요약 칸 */}
      <div className="detail-card ai-card">
        <h3>AI 추천 요약</h3>
        <p>{aiSummary || "추천 문장을 불러오는 중..."}</p>
      </div>

    </div>

  );
};

export default LivingSpaceDetail;
