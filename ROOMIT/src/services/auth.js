import axios from 'axios';

const BASE_URL = 'http://172.28.2.18:8081/api';

export const registerUser = async (userId, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/user`,
            {
                userId,
                email,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('회원가입 실패:', error);
        throw error;
    }
};


export const login = async (userId, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            userId,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // 서버 응답 오류
            console.error('서버 응답 오류:', error.response.data);
            alert(`서버 오류: ${error.response.data.error || '알 수 없는 오류'}`);
        } else if (error.request) {
            // 서버 응답 없음
            console.error('서버 응답 없음:', error.request);
            alert('서버와 연결할 수 없습니다.');
        } else {
            // 요청 설정 오류
            console.error('요청 설정 오류:', error.message);
            alert(`요청 설정 오류: ${error.message}`);
        }
        throw error;
    }
};

