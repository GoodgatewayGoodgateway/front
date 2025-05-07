import "./css/LivingSpace.css";
import Header from "../Components/Header";
import LivingSpaceItem from "../Components/LivingSpace_Item";
import FilterPanel from "../Components/FilterPanel";
import { Funnel } from "lucide-react";
import React, { useState, useEffect } from "react";

const filterOptions = [
  { category: "등록순", options: ["상관없음", "최신순", "오래된 순"] },
  { category: "임대 유형", options: ["상관없음", "월세", "전세"] },
  {
    category: "지역",
    // prettier-ignore
    options: [
      "상관없음", "서울", "경기", "인천", "부산", "대구", "광주", "대전",
      "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
    ],
  },
  { category: "최대 인원", options: ["상관없음", "1명", "2명", "3명", "4명", "5명 이상"] },
  { category: "면적", options: ["상관없음", "20-29평", "30-39평", "40-49평", "50평 이상"] },
  { category: "가격대", options: ["상관없음", "0-50만원", "50-100만원", "100만원 이상"] },
  { category: "AI 추천", options: ["학교 근처 순", "직장 근처 순", "편의시설 근처 순"] },
];

const LivingSpace = ({ LivingSpaceData }) => {
  const [filteredLivingSpaces, setFilteredLivingSpaces] = useState(LivingSpaceData);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 최초 데이터 로드
    setFilteredLivingSpaces(LivingSpaceData);
  }, [LivingSpaceData]);

  const togglePanel = () => {
    setOpen((prev) => !prev);
    console.log("📂 패널 토글 상태:", !open);
  };

  return (
    <div className="livingSpace">
      <Header />
      <div className="livingSpace-header">
        <h1>주거공간</h1>
        <h2>현재 올라온 매물을 확인해보세요!</h2>
        <button className="btn-filter" onClick={togglePanel}>
          <Funnel size={17} />
          필터
        </button>
      </div>

      <FilterPanel
        open={open}
        setOpen={setOpen}
        filters={filterOptions}
        datas={LivingSpaceData}
        onFilterChange={setFilteredLivingSpaces}
        showFilterButton={false} // 내부 필터 버튼 비활성화
      />

      <div className="livingSpace-list">
        {filteredLivingSpaces
          .filter((item) => item && item.id)
          .map((item, index) => (
            <LivingSpaceItem key={index} LivingSpaceData={item} />
          ))}
      </div>
    </div>
  );
};

export default LivingSpace;
