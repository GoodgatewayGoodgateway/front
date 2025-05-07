import React, { useState, useEffect, useCallback } from "react";
import "./css/FilterPanel.css";

// 필터 헤더 컴포넌트
const FilterHeader = () => (
  <div className="filterHeader">
    <strong>🔍 필터 설정</strong>
  </div>
);

// 선택된 필터 태그 컴포넌트
const SelectedFilters = ({ selectedFilters, onRemove }) => (
  <div className="selectedFilters">
    {selectedFilters.map(({ category, value }) => (
      <div key={`${category}-${value}`} className="filter-tag">
        {category}: {value}
        <span onClick={() => onRemove(category, "상관없음")}> ✕</span>
      </div>
    ))}
  </div>
);

// 필터 카테고리 컴포넌트
const FilterCategory = ({ category, options, selectedFilters, onToggle }) => {
  const isSelected = (value) =>
    selectedFilters.find((f) => f.category === category && f.value === value);

  return (
    <div className="checkbox-group">
      <strong className="category-title">└ {category}</strong>
      <ul className="nested-options">
        {options.map((option, index) => (
          <li key={option}>
            <label className="checkbox-label">
              <input
                type="radio"
                name={category}
                checked={!!isSelected(option)}
                onChange={() => onToggle(category, option)}
              />
              {index === options.length - 1 ? `└ ${option}` : `├ ${option}`}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 필터 푸터 컴포넌트
const FilterFooter = ({ onReset, onApply }) => (
  <div className="filterFooter">
    <button className="lvsbtn btn-reset" onClick={onReset}>
      초기화
    </button>
    <button className="lvsbtn btn-apply" onClick={onApply}>
      적용
    </button>
  </div>
);

// 메인 필터 패널 컴포넌트
const FilterPanel = ({
  open,
  setOpen,
  filters,
  datas,
  onFilterChange,
  showfilterButton = true,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const togglePanel = () => setOpen((prev) => !prev);

  const filterDatas = useCallback(
    (filtersObj) => {
      if (!datas || !Array.isArray(datas)) return [];

      return datas.filter((data) => {
        return filters.every(({ category }) => {
          const selectedValue = filtersObj[category];
          if (!selectedValue || selectedValue === "상관없음") return true;

          const dataValue = data[category];
          return typeof dataValue === "string" && dataValue.includes(selectedValue);
        });
      });
    },
    [datas, filters]
  );

  // ✅ selectedFilters가 바뀌었을 때만 필터 적용
  useEffect(() => {
    const filtersObj = {};
    selectedFilters.forEach(({ category, value }) => {
      filtersObj[category] = value;
    });

    const result = filterDatas(filtersObj);
    onFilterChange(result);
  }, [selectedFilters, filterDatas, onFilterChange]);

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      let updated;
      if (value === "상관없음") {
        updated = prev.filter((f) => f.category !== category);
      } else {
        const existing = prev.find((f) => f.category === category);
        if (existing) {
          updated =
            existing.value === value
              ? prev.filter((f) => f.category !== category)
              : prev.map((f) => (f.category === category ? { category, value } : f));
        } else {
          updated = [...prev, { category, value }];
        }
      }

      localStorage.setItem("selectedFilters", JSON.stringify(updated));
      const result = {};
      updated.forEach(({ category, value }) => {
        result[category] = value;
      });
      filterDatas(result);
      return updated;
    });
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    localStorage.removeItem("selectedFilters");
  };

  const handleApply = () => {
    // const result = {};
    // selectedFilters.forEach(({ category, value }) => {
    //   result[category] = value;
    // });
    // filterDatas(result);
    togglePanel();
  };

  return (
    <div className="filterPanel">
      <div className={`filterPanel ${open ? "open" : ""}`}>
        <FilterHeader onClose={togglePanel} />
        <SelectedFilters selectedFilters={selectedFilters} onRemove={toggleFilter} />
        <div className="filterOptions">
          {filters.map(({ category, options }) => (
            <FilterCategory
              key={category}
              category={category}
              options={options}
              selectedFilters={selectedFilters}
              onToggle={toggleFilter}
            />
          ))}
        </div>
        <FilterFooter onReset={clearFilters} onApply={handleApply} />
      </div>
    </div>
  );
};

export default FilterPanel;
