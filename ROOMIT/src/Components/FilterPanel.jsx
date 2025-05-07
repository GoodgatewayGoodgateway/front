import React, { useState, useEffect, useCallback } from "react";
import "./css/FilterPanel.css";

const categoryKeyMap = {
  "임대 유형": "type",
  지역: "location",
  "최대 인원": "maxPersons",
  면적: "netLeasableArea",
  가격대: "price",
  "AI 추천": "aiRecommendation",
};

const FilterHeader = () => (
  <div className="filterHeader">
    <strong>🔍 필터 설정</strong>
  </div>
);

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

      let filtered = datas.filter((data) => {
        return filters.every(({ category }) => {
          if (category === "등록순") return true;
          const selectedValue = filtersObj[category];
          if (!selectedValue || selectedValue === "상관없음") return true;

          const dataKey = categoryKeyMap[category];
          const dataValue = data[dataKey];

          if (typeof dataValue === "string") {
            return dataValue.includes(selectedValue);
          } else {
            return dataValue === selectedValue;
          }
        });
      });

      // 등록순 정렬 적용
      const sortValue = filtersObj["등록순"];
      if (sortValue === "최신순") {
        filtered.sort(
          (a, b) =>
            new Date(b.registrationTime.replaceAll(".", "-")) -
            new Date(a.registrationTime.replaceAll(".", "-"))
        );
      } else if (sortValue === "오래된 순") {
        filtered.sort(
          (a, b) =>
            new Date(a.registrationTime.replaceAll(".", "-")) -
            new Date(b.registrationTime.replaceAll(".", "-"))
        );
      }

      return filtered;
    },
    [datas, filters]
  );

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
