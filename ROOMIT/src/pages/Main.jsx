import React from 'react';
import Header from '../components/Header';
const Main = () => {
    return (
        <div>
            <Header />
            <div className='main_img'>
                <h2>함께 살아갈 <br />청년들을 위한</h2>
                <h2>공동 주거 매칭</h2>

                <p>
                    성향, 생활패턴, 관심사가 맞는 룸메이트와 함께<br />
                    더 나은 공동생활을 시작하세요.
                </p>

                <button>매칭 시작하기</button>

            </div>
        </div>
    );
};

export default Main;
