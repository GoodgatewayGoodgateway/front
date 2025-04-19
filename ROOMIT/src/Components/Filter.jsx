import React, { useState, useEffect, useCallback } from 'react';
import { Funnel } from 'lucide-react';
import './css/Filter.css';

const filters = {
    나이대: ['상관없음', '20-25', '26-30', '31-35'],
    흡연: ['상관없음', '비흡연', '흡연'],
    활동시간: ['상관없음', '아침형', '저녁형'],
    음주: ['상관없음', '음주', '가끔', '비음주'],
    '청결 수준': ['상관없음', '낮음', '보통', '높음', '매우 높음'],
    '소음 민감도': ['상관없음', '둔감', '보통', '민감', '매우 민감'],
    '반려동물 허용': ['상관없음', '허용 안함', '일부 허용', '대부분 허용', '모두 허용'],
    '식사 시간': ['상관없음', '불규칙적', '아침형', '저녁형', '밤형'],
};

const FilterPanel = ({ open, setOpen, users, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const togglePanel = () => setOpen(!open);

    const filterUsers = useCallback((filtersObj) => {
        const filtered = users.filter(user => {
            const { age, smoking, drinking, lifestyle, habits } = user;

            const isAgeMatch = (() => {
                const ageFilter = filtersObj['나이대'];
                if (!ageFilter || ageFilter === '상관없음') return true;
                const [min, max] = ageFilter.split('-').map(Number);
                return age >= min && age <= max;
            })();

            const isSmokingMatch = (() => {
                const f = filtersObj['흡연'];
                if (!f || f === '상관없음') return true;
                return smoking === (f === '비흡연' ? '비흡연' : '흡연');
            })();

            const isDrinkingMatch = (() => {
                const f = filtersObj['음주'];
                if (!f || f === '상관없음') return true;
                if (f === '음주') return drinking === '음주';
                if (f === '가끔') return drinking === '가끔 음주';
                if (f === '비음주') return drinking === '금주';
                return false;
            })();

            const getActivityType = (wakeTime) => {
                if (!wakeTime) return '';
                let hour = parseInt(wakeTime.replace(/[^0-9]/g, ''), 10);
                if (wakeTime.includes('오전') && hour === 12) hour = 0;
                if (wakeTime.includes('오후') && hour !== 12) hour += 12;
                return hour >= 4 && hour <= 9 ? 'morning' : 'night';
            };

            const isActivityTimeMatch = (() => {
                const f = filtersObj['활동시간'];
                if (!f || f === '상관없음') return true;
                const userType = getActivityType(lifestyle?.wakeUpTime);
                return (f === '아침형' && userType === 'morning') || (f === '저녁형' && userType === 'night');
            })();

            const isExactMatch = (userVal, selectedVal) => {
                if (!selectedVal || selectedVal === '상관없음') return true;
                return userVal === selectedVal;
            };

            return (
                isAgeMatch &&
                isSmokingMatch &&
                isDrinkingMatch &&
                isActivityTimeMatch &&
                isExactMatch(lifestyle?.cleanLevel, filtersObj['청결 수준']) &&
                isExactMatch(lifestyle?.noise, filtersObj['소음 민감도']) &&
                isExactMatch(habits?.petPreferences?.allowed, filtersObj['반려동물 허용']) &&
                isExactMatch(habits?.food?.mealTime, filtersObj['식사 시간'])
            );
        });

        onFilterChange(filtered);
    }, [users, onFilterChange]);

    useEffect(() => {
        const saved = localStorage.getItem('selectedFilters');
        if (saved) {
            const parsed = JSON.parse(saved);
            setSelectedFilters(parsed);
            const result = {};
            parsed.forEach(({ category, value }) => {
                result[category] = value;
            });
            filterUsers(result);
        }
    }, [filterUsers]);

    const toggleFilter = (category, value) => {
        setSelectedFilters((prev) => {
            let updated;
            if (value === '상관없음') {
                updated = prev.filter(f => f.category !== category);
            } else {
                const existing = prev.find(f => f.category === category);
                if (existing) {
                    updated = existing.value === value
                        ? prev.filter(f => f.category !== category)
                        : prev.map(f => f.category === category ? { category, value } : f);
                } else {
                    updated = [...prev, { category, value }];
                }
            }

            localStorage.setItem('selectedFilters', JSON.stringify(updated));
            const result = {};
            updated.forEach(({ category, value }) => {
                result[category] = value;
            });
            filterUsers(result);
            return updated;
        });
    };

    const clearFilters = () => {
        setSelectedFilters([]);
        localStorage.removeItem('selectedFilters');
        filterUsers({});
    };

    const isSelected = (category, value) =>
        selectedFilters.find(f => f.category === category && f.value === value);

    return (
        <div className="meetfilterPanel">
            <button className="meetbtn-filter" onClick={togglePanel}>
                <Funnel size={17} />
                필터
            </button>

            <div className={`meetfilterPanel ${open ? 'open' : ''}`}>
                <div className="meetfilterHeader">
                    <strong>🔍 필터 설정</strong>
                    <button onClick={togglePanel}>✕</button>
                </div>

                <div className="meetselectedFilters">
                    {selectedFilters.map(({ category, value }) => (
                        <div key={`${category}-${value}`} className="meetfilter-tag">
                            {category}: {value}
                            <span onClick={() => toggleFilter(category, '상관없음')}> ✕</span>
                        </div>
                    ))}
                </div>

                <div className="meetfilterOptions">
                    {Object.entries(filters).map(([category, options]) => (
                        <div key={category} className="meetcheckbox-group">
                            <strong className="category-title">└ {category}</strong>
                            <ul className="nested-options">
                                {options.map((option, index) => (
                                    <li key={option}>
                                        <label className="meetcheckbox-label">
                                            <input
                                                type="radio"
                                                name={category}
                                                checked={isSelected(category, option)}
                                                onChange={() => toggleFilter(category, option)}
                                            />
                                            {index === options.length - 1 ? `└ ${option}` : `├ ${option}`}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


                <div className="meetfilterFooter">
                    <button className="meetbtn meetbtn-reset" onClick={clearFilters}>초기화</button>
                    <button
                        className="meetbtn meetbtn-apply"
                        onClick={() => {
                            const result = {};
                            selectedFilters.forEach(({ category, value }) => {
                                result[category] = value;
                            });
                            filterUsers(result);
                            togglePanel();
                        }}
                    >
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
