import React, { useState } from 'react';
import './css/Filter.css';

const filters = {
    나이대: ['상관없음', '20-25', '26-30', '31-35'],
    흡연: ['상관없음', '비흡연', '흡연'],
    활동시간: ['상관없음', '아침형', '저녁형'],
    음주: ['상관없음', '음주', '가끔', '비음주'],
};

const getActivityType = (wakeTime) => {
    if (!wakeTime) return '';

    let hour = parseInt(wakeTime.replace(/[^0-9]/g, ''), 10);
    if (wakeTime.includes('오전')) {
        if (hour === 12) hour = 0; // 오전 12시는 0시로 처리
    } else if (wakeTime.includes('오후')) {
        if (hour !== 12) hour += 12;
    }

    if (hour >= 4 && hour <= 9) {
        return 'morning';
    } else {
        return 'night';
    }
};

const FilterBar = ({ users, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleFilter = (category, value) => {
        setSelectedFilters((prev) => {
            // "상관없음" 선택 시 해당 카테고리 필터 제거
            if (value === '상관없음') {
                return prev.filter((f) => f.category !== category);
            }

            const existing = prev.find((f) => f.category === category);
            if (existing) {
                if (existing.value === value) {
                    return prev.filter((f) => f.category !== category);
                } else {
                    return prev.map((f) =>
                        f.category === category ? { category, value } : f
                    );
                }
            } else {
                return [...prev, { category, value }];
            }
        });
    };

    const removeFilter = (category) => {
        setSelectedFilters((prev) => prev.filter((f) => f.category !== category));
    };

    // 필터링된 사용자 목록 계산
    const filterUsers = (filters) => {
        const filtered = users.filter(user => {
            const { age, smoking, drinking, lifestyle } = user;

            const isAgeMatch = (() => {
                const ageFilter = filters['나이대'];
                if (!ageFilter || ageFilter === '상관없음') return true;
                const [min, max] = ageFilter.split('-').map(Number);
                return age >= min && age <= max;
            })();

            const isSmokingMatch = (() => {
                const smokingFilter = filters['흡연'];
                if (!smokingFilter || smokingFilter === '상관없음') return true;
                return smoking === (smokingFilter === '비흡연' ? '비흡연' : '흡연');
            })();

            const isDrinkingMatch = (() => {
                const drinkingFilter = filters['음주'];
                if (!drinkingFilter || drinkingFilter === '상관없음') return true;
                if (drinkingFilter === '음주') return drinking.includes('음주');
                if (drinkingFilter === '가끔') return drinking === '가끔 음주';
                if (drinkingFilter === '비음주') return drinking === '금주';
                return false;
            })();

            const isActivityTimeMatch = (() => {
                const activityTimeFilter = filters['활동시간'];
                if (!activityTimeFilter || activityTimeFilter === '상관없음') return true;
                const userType = getActivityType(lifestyle?.wakeUpTime);
                if (activityTimeFilter === '아침형') return userType === 'morning';
                if (activityTimeFilter === '저녁형') return userType === 'night';
                return false;
            })();

            return isAgeMatch && isSmokingMatch && isDrinkingMatch && isActivityTimeMatch;
        });
        onFilterChange(filtered);  // 필터링된 결과를 부모 컴포넌트로 전달
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = {};
        selectedFilters.forEach(({ category, value }) => {
            result[category] = value;
        });
        console.log("🔍 검색된 필터:", result);
        filterUsers(result);  // 필터링 로직 호출
    };

    // 각 필터 카테고리의 현재 선택된 값을 표시하는 함수
    const getFilterDisplayValue = (category) => {
        const filter = selectedFilters.find(f => f.category === category);
        return filter ? filter.value : category;
    };

    return (
        <div className="filter-container">
            <form onSubmit={handleSubmit} className="filter-form">
                <div className="selected-filters">
                    {selectedFilters.map(({ category, value }) => (
                        <div
                            key={`${category}-${value}`}
                            className="filter-tag"
                            onClick={() => removeFilter(category)}
                        >
                            {category}: {value}
                            <span className="remove-icon">✕</span>
                        </div>
                    ))}
                    <button type="submit" className="search-button">
                        🔍 검색
                    </button>
                </div>

                <div className="filter-dropdowns">
                    {Object.keys(filters).map((category) => (
                        <div key={category} className="dropdown-container">
                            <button
                                type="button"
                                className={`dropdown-button ${openDropdown === category ? 'active' : ''} ${selectedFilters.some(f => f.category === category) ? 'has-selection' : ''
                                    }`}
                                onClick={() => setOpenDropdown((prev) => (prev === category ? null : category))}
                            >
                                {getFilterDisplayValue(category)}
                                <span className="dropdown-icon">▼</span>
                            </button>

                            {openDropdown === category && (
                                <div className="dropdown-menu">
                                    {filters[category].map((option) => (
                                        <div
                                            key={option}
                                            className={`dropdown-item ${selectedFilters.some(
                                                (f) => f.category === category && f.value === option
                                            ) ? 'selected' : ''}`}
                                            onClick={() => toggleFilter(category, option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {selectedFilters.length > 0 && (
                        <button type="button" onClick={() => setSelectedFilters([])} className="clear-button">
                            초기화
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FilterBar;