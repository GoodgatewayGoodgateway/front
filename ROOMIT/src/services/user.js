import axios from 'axios';

const api = axios.create({
    baseURL: '/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchAllProfiles = async () => {
    const response = await axios.get('/api/user/all/full');
    return response.data;
};

export const submitProfile = async (profileData) => {
    try {
        if (!profileData.name || !profileData.age || !profileData.job) {
            throw new Error('필수 데이터가 누락되었습니다.');
        }

        const response = await api.post('/profile', profileData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('✅ 프로필 등록/수정 성공:', response.data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response
            ? `서버 에러: ${error.response.status} - ${error.response.data.message || '알 수 없는 에러'}`
            : error.message || '네트워크 에러가 발생했습니다.';
        console.error('❌ 프로필 등록/수정 실패:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const fetchProfile = async (userId) => {
    try {
        const response = await api.get(`/user/${userId}/full`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response
            ? `서버 에러: ${error.response.status} - ${error.response.data.message || '알 수 없는 에러'}`
            : error.message || '네트워크 에러가 발생했습니다.';
        console.error('❌ 프로필 데이터를 가져오는 데 실패했습니다:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const updateMatching = async (userId, matching) => {
    try {
        const response = await api.patch(`/profile/${userId}/matching`, { matching });
        console.log('✅ 매칭 상태 업데이트 성공:', response.data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response
            ? `서버 에러: ${error.response.status} - ${error.response.data.message || '알 수 없는 에러'}`
            : error.message || '네트워크 에러가 발생했습니다.';
        console.error('❌ 매칭 상태 업데이트 실패:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const uploadAvatar = async (file) => {
    try {
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('✅ 아바타 업로드 성공:', response.data);
        return response.data.url; // 서버에서 반환된 URL
    } catch (error) {
        const errorMessage = error.response
            ? `서버 에러: ${error.response.status} - ${error.response.data.message || '알 수 없는 에러'}`
            : error.message || '네트워크 에러가 발생했습니다.';
        console.error('❌ 아바타 업로드 실패:', errorMessage);
        throw new Error(errorMessage);
    }
};