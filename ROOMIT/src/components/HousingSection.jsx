// HousingSection.jsx
import React, { useEffect, useState } from "react";
import "./css/HousingSection.css";
import HousingCard from "./HousingCard";
import { fetchAllLivingSpace } from "../services/livingSpace"; // ✅ 백엔드 연동 함수 import

function HousingSection() {
  const [livingSpaces, setLivingSpaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllLivingSpace();
        // console.log("✅ 주거공간 목록:", data);

        // 예: name이나 price 같은 필드가 있는 유효한 항목만 필터링
        const filteredLivingSpaces = data.filter((item) => item.id && item.price);

        setLivingSpaces(filteredLivingSpaces);
      } catch (err) {
        // console.error("❌ 주거공간 가져오기 실패:", err.message);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const safeLivingSpaces =
    Array.isArray(livingSpaces) && livingSpaces.length > 0 ? livingSpaces : [];

  return (
    <section className="housing-section container">
      <h2 className="section-title">추천 공유 주거 공간</h2>
      <div className="housing-section-content">
        <div className="housing-grid">
          {safeLivingSpaces.slice(0, 5).map((item, index) => (
            <HousingCard
              key={item.id || index}
              name={item.address || index} // 주소가 없을 경우 기본값 설정
              icon={item.icon || "🏠"} // 기본 아이콘
              type={item.roomType || "정보없음"}
              price={`월 ${item.price}만원`}
              features={item.features || "정보 없음"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HousingSection;
