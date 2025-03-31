// HeroBanner.jsx
import React from 'react';
import './css/HeroBanner.css';

function HeroBanner() {
    return (
        <section className="hero-banner">
            <div className="hero-content">
                <h1 className="hero-title">나에게 딱 맞는 룸메이트를 찾아보세요</h1>
                <p className="hero-subtitle">성향, 생활패턴, 관심사가 비슷한 최적의 룸메이트와 함께하세요</p>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="원하는 지역, 예산 또는 키워드를 입력하세요"
                    />
                    <button className="search-button">
                        <span role="img" aria-label="search">🔍</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;