const userData = [
    {
        id: 1,
        name: "이서연",
        age: 23,
        job: "마케팅 디자이너",
        introduction: "창의적이고 활발한 성격의 직장인입니다.",
        location: "서울시 강남구",
        mbti: "ENFP",
        interests: ["여행", "영화감상", "요리", "전시회"],
        idealRoommate: "서로 존중하고 배려하는 룸메이트를 원해요.",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 7시",
            sleepTime: "오후 11시",
            cleanLevel: "중간",
            noise: "보통"
        }
    },
    {
        id: 2,
        name: "김민서",
        age: 18,
        job: "프론트엔드 개발자",
        introduction: "활발하고 적극적인 성격, 새로운 기술을 배우는 것을 좋아함.",
        location: "서울시 송파구",
        mbti: "ESTP",
        interests: ["프로그래밍", "운동", "게임", "음악"],
        idealRoommate: "서로 배우고 성장할 수 있는 룸메이트를 찾고 있어요.",
        smoking: "비흡연",
        drinking: "음주",
        lifestyle: {
            wakeUpTime: "오전 8시",
            sleepTime: "오전 12시",
            cleanLevel: "상",
            noise: "보통"
        }
    },
    {
        id: 3,
        name: "이준혁",
        age: 21,
        job: "백엔드 개발자",
        introduction: "논리적이고 분석적인 사고로 문제 해결에 강함.",
        location: "서울시 마포구",
        mbti: "INTJ",
        interests: ["알고리즘", "독서", "여행", "드라마 시청"],
        idealRoommate: "깔끔하고 안정적인 생활 패턴을 가진 룸메이트를 원해요.",
        smoking: "비흡연",
        drinking: "음주",
        lifestyle: {
            wakeUpTime: "오전 6시 30분",
            sleepTime: "오후 10시",
            cleanLevel: "상",
            noise: "낮음"
        }
    },
    {
        id: 4,
        name: "박지수",
        age: 20,
        job: "UX/UI 디자이너",
        introduction: "창의적인 아이디어로 사용자 경험을 향상시키는 데 집중.",
        location: "서울시 용산구",
        mbti: "INFP",
        interests: ["아트", "디자인", "영화", "요리"],
        idealRoommate: "서로의 공간과 시간을 존중해주는 룸메이트를 찾고 있어요.",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 7시 30분",
            sleepTime: "오전 12시",
            cleanLevel: "중간",
            noise: "보통"
        }
    },
    {
        id: 5,
        name: "정우진",
        age: 22,
        job: "데이터 분석가",
        introduction: "데이터 기반 의사결정을 좋아합니다.",
        location: "서울시 강서구",
        mbti: "ISTJ",
        interests: ["데이터 사이언스", "주식", "등산", "독서"],
        idealRoommate: "체계적이고 규칙적인 생활을 하는 사람을 선호해요.",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 6시",
            sleepTime: "오후 10시 30분",
            cleanLevel: "상",
            noise: "낮음"
        }
    },
    {
        id: 6,
        name: "최서현",
        age: 24,
        job: "기획자",
        introduction: "계획을 잘 세우고 조직적인 걸 좋아해요.",
        location: "서울시 서초구",
        mbti: "ENTJ",
        interests: ["일기쓰기", "독서", "넷플릭스", "산책"],
        idealRoommate: "책임감 있고 대화가 잘 통하는 사람",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 7시 30분",
            sleepTime: "오후 11시 30분",
            cleanLevel: "상",
            noise: "보통"
        }
    },
    {
        id: 7,
        name: "윤아람",
        age: 20,
        job: "패션디자인 전공",
        introduction: "자유롭고 감각적인 스타일을 좋아해요.",
        location: "서울시 동작구",
        mbti: "ISFP",
        interests: ["쇼핑", "사진", "브이로그 촬영", "음악"],
        idealRoommate: "조용하지만 가끔 수다도 나눌 수 있는 친구면 좋아요.",
        smoking: "비흡연",
        drinking: "금주",
        lifestyle: {
            wakeUpTime: "오전 10시",
            sleepTime: "오전 1시",
            cleanLevel: "중간",
            noise: "보통"
        }
    },
    {
        id: 8,
        name: "강하준",
        age: 25,
        job: "모션그래픽 디자이너",
        introduction: "밤에 집중력이 올라가서 야행성입니다.",
        location: "서울시 노원구",
        mbti: "ISTP",
        interests: ["영화편집", "그림 그리기", "음악 감상", "유튜브"],
        idealRoommate: "야행성을 이해해주는 룸메이트를 선호해요.",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 11시",
            sleepTime: "새벽 2시",
            cleanLevel: "중간",
            noise: "보통"
        }
    },
    {
        id: 9,
        name: "조민규",
        age: 26,
        job: "헬스트레이너",
        introduction: "규칙적인 생활, 건강한 습관을 중시합니다.",
        location: "서울시 성북구",
        mbti: "ESTJ",
        interests: ["헬스", "식단관리", "러닝", "자기계발서"],
        idealRoommate: "규칙적인 루틴을 공유할 수 있는 사람",
        smoking: "비흡연",
        drinking: "금주",
        lifestyle: {
            wakeUpTime: "오전 5시 30분",
            sleepTime: "오후 9시 30분",
            cleanLevel: "상",
            noise: "낮음"
        }
    },
    {
        id: 10,
        name: "한지후",
        age: 19,
        job: "대학생",
        introduction: "게임과 기술에 관심 많은 공대생입니다.",
        location: "서울시 종로구",
        mbti: "INTP",
        interests: ["게임", "코딩", "디스코드", "유튜브 시청"],
        idealRoommate: "게임 같이 해줄 사람 환영",
        smoking: "흡연",
        drinking: "음주주",
        lifestyle: {
            wakeUpTime: "오전 10시",
            sleepTime: "새벽 2시",
            cleanLevel: "하",
            noise: "보통"
        }
    },
    // 이어서 계속...
    {
        id: 11,
        name: "김수빈",
        age: 22,
        job: "간호학과 학생",
        introduction: "사람을 잘 챙기고 공감 능력이 뛰어난 편입니다.",
        location: "서울시 관악구",
        mbti: "ESFJ",
        interests: ["카페투어", "그림", "봉사활동", "요리"],
        idealRoommate: "따뜻하고 배려심 있는 룸메이트가 좋아요.",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 7시",
            sleepTime: "오전 12시",
            cleanLevel: "상",
            noise: "낮음"
        }
    },
    {
        id: 12,
        name: "오현우",
        age: 27,
        job: "영상 프로듀서",
        introduction: "다큐멘터리와 여행 영상을 제작합니다.",
        location: "서울시 은평구",
        mbti: "ENFP",
        interests: ["촬영", "여행", "등산", "글쓰기"],
        idealRoommate: "유쾌하고 편한 분위기를 만들 수 있는 사람",
        smoking: "흡연",
        drinking: "가끔끔 음주",
        lifestyle: {
            wakeUpTime: "오전 9시",
            sleepTime: "새벽 1시",
            cleanLevel: "중간",
            noise: "보통"
        }
    },
    {
        id: 13,
        name: "배윤아",
        age: 19,
        job: "미디어학과 학생",
        introduction: "말수가 적지만 친해지면 정 많아요!",
        location: "서울시 중랑구",
        mbti: "INFJ",
        interests: ["드라마", "웹툰", "산책", "독서"],
        idealRoommate: "조용한 환경을 좋아하는 분이면 좋아요.",
        smoking: "흡연",
        drinking: "금주주",
        lifestyle: {
            wakeUpTime: "오전 8시",
            sleepTime: "오전 12시",
            cleanLevel: "중간",
            noise: "낮음"
        }
    },
    {
        id: 14,
        name: "서정훈",
        age: 23,
        job: "개발자",
        introduction: "혼자 있는 걸 좋아하지만 소통도 중요하게 생각해요.",
        location: "서울시 동대문구",
        mbti: "ISTP",
        interests: ["코딩", "자전거", "넷플릭스", "전자기기"],
        idealRoommate: "서로 간섭하지 않고 자유로운 사람",
        smoking: "흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 9시",
            sleepTime: "오전 1시",
            cleanLevel: "중간",
            noise: "보통"
        }
    },
    {
        id: 15,
        name: "이하린",
        age: 21,
        job: "애니메이션 학생",
        introduction: "그림 그리고 애니 감상하는 게 일상입니다.",
        location: "서울시 성동구",
        mbti: "INFP",
        interests: ["일러스트", "애니", "혼밥", "게임"],
        idealRoommate: "취미 공유 가능한 사람!",
        smoking: "비흡연",
        drinking: "가끔 음주 ",
        lifestyle: {
            wakeUpTime: "오전 10시",
            sleepTime: "새벽 2시",
            cleanLevel: "하",
            noise: "보통"
        }
    },
    {
        id: 16,
        name: "정시우",
        age: 28,
        job: "세무사",
        introduction: "정리정돈과 청결에 매우 신경 씁니다.",
        location: "서울시 강동구",
        mbti: "ISTJ",
        interests: ["청소", "산책", "재테크", "뉴스보기"],
        idealRoommate: "청결한 공간을 함께 유지할 수 있는 분",
        smoking: "비흡연",
        drinking: "금주",
        lifestyle: {
            wakeUpTime: "오전 6시",
            sleepTime: "오후 10시",
            cleanLevel: "상",
            noise: "낮음"
        }
    },
    {
        id: 17,
        name: "문하늘",
        age: 24,
        job: "대학원생",
        introduction: "공부와 연구가 일상이지만 여유도 중요하게 생각해요.",
        location: "서울시 중구",
        mbti: "INTP",
        interests: ["논문읽기", "명상", "티타임", "퍼즐"],
        idealRoommate: "조용한 환경을 유지해줄 수 있는 사람",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 8시",
            sleepTime: "오전 1시",
            cleanLevel: "상",
            noise: "낮음"
        }
    },
    {
        id: 18,
        name: "이태영",
        age: 26,
        job: "영업 사원",
        introduction: "에너지가 넘치고 사람 만나는 걸 좋아합니다.",
        location: "서울시 서대문구",
        mbti: "ESFP",
        interests: ["사교모임", "피트니스", "카페", "여행"],
        idealRoommate: "친근하고 외향적인 분과 잘 지낼 수 있어요.",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 7시",
            sleepTime: "오전 12시",
            cleanLevel: "중간",
            noise: "보통"
        }
    },
    {
        id: 19,
        name: "강서영",
        age: 22,
        job: "문예창작학과 학생",
        introduction: "글 쓰는 걸 좋아하고 감성적인 편이에요.",
        location: "서울시 금천구",
        mbti: "INFJ",
        interests: ["에세이쓰기", "독서", "커피", "산책"],
        idealRoommate: "감정 공유가 잘 되는 룸메이트면 좋겠어요.",
        smoking: "비흡연",
        drinking: "가끔 음주",
        lifestyle: {
            wakeUpTime: "오전 9시",
            sleepTime: "오전 1시",
            cleanLevel: "중간",
            noise: "낮음"
        }
    },
    {
        id: 20,
        name: "노지훈",
        age: 34,
        job: "사진 작가",
        introduction: "거리 풍경과 사람을 담는 걸 좋아합니다.",
        location: "서울시 양천구",
        mbti: "ISFP",
        interests: ["사진", "전시회", "자전거", "카페"],
        idealRoommate: "감성적이고 조용한 분위기를 좋아하는 분",
        smoking: "흡연",
        drinking: "음주",
        lifestyle: {
            wakeUpTime: "오전 8시",
            sleepTime: "오전 12시",
            cleanLevel: "중간",
            noise: "보통"
        }
    }
];

export default userData;