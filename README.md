# 🏠 ROOMIT Frontend

<p align="center">
  <b>룸메이트 매칭 + 주거 공간 탐색 서비스</b><br/>
  나와 맞는 사람, 나에게 맞는 공간을 함께 찾다
</p>

---

## 📌 프로젝트 소개

ROOMIT은 1인 가구가 겪는 문제를 해결하기 위해 만들어진 서비스입니다.

- 💸 높은 주거 비용  
- ⚡ 생활 패턴 불일치  
- 🧍 사회적 고립  

👉 단순 방 찾기를 넘어  
<b>"사람 + 공간"</b>을 함께 매칭합니다.

---

## 🚀 주요 기능

### 🏘 주거 공간 탐색
<ul>
  <li>주거 공간 리스트 조회</li>
  <li>카드 UI 기반 정보 제공</li>
  <li>필터 검색 (지역 / 가격 / 면적)</li>
</ul>

### 👥 룸메이트 매칭
<ul>
  <li>프로필 기반 사용자 탐색</li>
  <li>성향 기반 매칭</li>
</ul>

### 💬 채팅
<ul>
  <li>사용자 간 커뮤니케이션</li>
</ul>

### 🔐 인증 & 라우팅 제어
<ul>
  <li>AuthGuard / GuestGuard</li>
  <li>로그인 상태 기반 접근 제한</li>
</ul>

---

## 🧱 프로젝트 구조

<pre>
src/
├── Auth/
│   ├── AuthGuard.jsx
│   └── GuestGuard.jsx
│
├── Components/
│   ├── Chat.jsx
│   ├── FilterPanel.jsx
│   ├── HousingCard.jsx
│   ├── RoommateCard.jsx
│   └── ...
│
├── App.jsx
└── main.jsx
</pre>

---

## ⚙️ 기술 스택

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript"/>
  <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3"/>
</p>

---

## 🛠 실행 방법

```bash
npm install
npm run dev
```

---

## 🔧 개선 예정

- 🔄 백엔드 API 연동
- 🧠 추천 알고리즘 고도화
- 💬 실시간 채팅 (WebSocket)
- 📱 반응형 UI
- ⚡ 전역 상태 관리 (Redux / Zustand)

---

## 🎯 개발 포인트

✔ 컴포넌트 기반 설계  
✔ 인증 로직과 UI 분리  
✔ 확장 가능한 구조 설계  

---

## 👨‍💻 About

이 프로젝트는 단순 UI 구현이 아닌  
<b>서비스 구조 설계 능력</b>을 보여주기 위해 개발되었습니다.
