import "./css/FilterPanel.css";

// const filterOptions = {
//   임대유형: ["임대 유형"],
//   지역: ["상세위치"],
//   최대인원: [""],
//   presentPersons: [""],
// };

const FilterPanel = () => {
  return (
    <div className="filterPanel">
      <div className="filterHeader">
        <strong>🔍 필터 설정</strong>
      </div>

      <div className="filterOptions">
        <div>▸ 카테고리</div>
        <div>▸ 가격대</div>
        <div>▸ 브랜드</div>
        <div>▸ 평점</div>
      </div>

      <div className="filterFooter">
        <button className="btn btn-reset">초기화</button>
        <button className="btn btn-apply">적용</button>
      </div>
    </div>
  );
};

export default FilterPanel;
