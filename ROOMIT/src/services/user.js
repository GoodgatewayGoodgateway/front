import axios from 'axios';

const BASE_URL = 'http://172.28.2.18:8081/api';

export const submitProfile = async (profileData) => {
    try {
        // 데이터가 올바른지 확인
        if (!profileData.name || !profileData.age || !profileData.job) {
            throw new Error("필수 데이터가 누락되었습니다.");
        }

        const response = await axios.post(`${BASE_URL}/profile`, profileData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('✅ 프로필 등록/수정 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ 프로필 등록/수정 실패:', error);
        throw error;
    }
};


export const fetchProfile = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}/full`);
        return response.data;
    } catch (error) {
        console.error('❌ 프로필 데이터를 가져오는 데 실패했습니다:', error);
        throw error;
    }
};

