import React, { useState, useEffect, useCallback } from 'react'; // useCallback 추가
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

const getActivityType = (wakeTime) => {
    if (!wakeTime) return '';
    let hour = parseInt(wakeTime.replace(/[^0-9]/g, ''), 10);
    if (wakeTime.includes('오전')) {
        if (hour === 12) hour = 0; // 오전 12시는 0시로 처리
    } else if (wakeTime.includes('오후')) {
        if (hour !== 12) hour += 12;
    }
    return hour >= 4 && hour <= 9 ? 'morning' : 'night';
};

const FilterBar = ({ users, onFilterChange }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const filterUsers = useCallback((filters) => {
        const filtered = users.filter(user => {
            const { age, smoking, drinking, lifestyle, habits } = user;

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

                if (drinkingFilter === '음주') return drinking === '음주';
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

            const isCleaningMatch = (userLevel, selectedLevel) => {
                if (!selectedLevel || selectedLevel === '상관없음') return true;
                return userLevel === selectedLevel;
            };

            const isNoiseMatch = (userNoise, selectedNoise) => {
                if (!selectedNoise || selectedNoise === '상관없음') return true;
                return userNoise === selectedNoise;
            };

            const isPetMatch = (userPet, selectedPet) => {
                if (!selectedPet || selectedPet === '상관없음') return true;
                return userPet === selectedPet;
            };

            const isMealTimeMatch = (userMealTime, selectedTime) => {
                if (!selectedTime || selectedTime === '상관없음') return true;
                return userMealTime === selectedTime;
            };

            return (
                isAgeMatch &&
                isSmokingMatch &&
                isDrinkingMatch &&
                isActivityTimeMatch &&
                isCleaningMatch(lifestyle?.cleanLevel, filters['청결 수준']) &&
                isNoiseMatch(lifestyle?.noise, filters['소음 민감도']) &&
                isPetMatch(habits?.petPreferences?.allowed, filters['반려동물 허용']) &&
                isMealTimeMatch(habits?.food?.mealTime, filters['식사 시간'])
            );
        });
        onFilterChange(filtered);  // 필터링된 결과를 부모 컴포넌트로 전달
    }, [users, onFilterChange]); // 의존성 배열에 users와 onFilterChange 추가

    useEffect(() => {
        const savedFilters = localStorage.getItem('selectedFilters');
        if (savedFilters) {
            const parsedFilters = JSON.parse(savedFilters);
            setSelectedFilters(parsedFilters);

            const result = {};
            parsedFilters.forEach(({ category, value }) => {
                result[category] = value;
            });
            filterUsers(result);
        }
    }, [filterUsers]); // filterUsers가 변경될 때마다 실행

    const toggleFilter = (category, value) => {
        setSelectedFilters((prev) => {
            let updatedFilters;

            if (value === '상관없음') {
                updatedFilters = prev.filter((f) => f.category !== category);
            } else {
                const existing = prev.find((f) => f.category === category);
                if (existing) {
                    if (existing.value === value) {
                        updatedFilters = prev.filter((f) => f.category !== category);
                    } else {
                        updatedFilters = prev.map((f) =>
                            f.category === category ? { category, value } : f
                        );
                    }
                } else {
                    updatedFilters = [...prev, { category, value }];
                }
            }
            localStorage.setItem('selectedFilters', JSON.stringify(updatedFilters));

            const result = {};
            updatedFilters.forEach(({ category, value }) => {
                result[category] = value;
            });
            filterUsers(result);

            return updatedFilters;
        });
    };

    const removeFilter = (category) => {
        const updated = selectedFilters.filter((f) => f.category !== category);
        setSelectedFilters(updated);
        localStorage.setItem('selectedFilters', JSON.stringify(updated));

        const result = {};
        updated.forEach(({ category, value }) => {
            result[category] = value;
        });
        filterUsers(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = {};
        selectedFilters.forEach(({ category, value }) => {
            result[category] = value;
        });
        console.log("🔍 검색된 필터:", result);
        filterUsers(result);
    };

    const getFilterDisplayValue = (category) => {
        const filter = selectedFilters.find(f => f.category === category);
        return filter ? filter.value : category;
    };

    return (
        <div className="filter-container">
            <form onSubmit={handleSubmit} className="filter-form">
                <div className='filter-header'>
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

                    </div>
                </div>
                <div className="filter-dropdowns">
                    {Object.keys(filters).map((category) => (
                        <div key={category} className="dropdown-container">
                            <button
                                type="button"
                                className={`dropdown-button ${openDropdown === category ? 'active' : ''} ${selectedFilters.some(f => f.category === category) ? 'has-selection' : ''}`}
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
                                            className={`dropdown-item ${selectedFilters.some((f) => f.category === category && f.value === option) ? 'selected' : ''}`}
                                            onClick={() => toggleFilter(category, option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedFilters([]);
                            localStorage.removeItem('selectedFilters');
                            filterUsers({});
                        }}
                        className="clear-button"
                    >
                        초기화
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterBar;
