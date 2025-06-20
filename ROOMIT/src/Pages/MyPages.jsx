import React, { useState } from "react";
import {
  MapPin,
  Briefcase,
  Calendar,
  Star,
  Coffee,
  Home,
  Volume2,
  MessageCircle,
  Heart,
  Utensils,
  Moon,
  Sun,
  Cat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../Pages/css/MyPages.css";
import Header from "../Components/Header";

const MyEditPage = ({ currentUser, setCurrentUser, updateUserData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...currentUser });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLifestyleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [name]: value,
      },
    }));
  };

  // Handle nested habit changes
  const handleHabitChange = (category, subcategory, field, value) => {
    setFormData((prev) => ({
      ...prev,
      habits: {
        ...(prev.habits || {}),
        [category]: {
          ...(prev.habits?.[category] || {}),
          [subcategory]: {
            ...(prev.habits?.[category]?.[subcategory] || {}),
            [field]: value,
          },
        },
      },
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // 저장 작업 시뮬레이션
    setTimeout(() => {
      updateUserData(formData);
      setIsSaving(false);
      navigate(`/mypage/${formData.id}`);
    }, 500);
  };

  const handleToggleMatching = () => {
    // 디버깅을 위한 로그 추가
    console.log("토글 전 상태:", formData.matching);

    const updatedFormData = {
      ...formData,
      matching: !formData.matching,
    };

    // 즉시 상태 업데이트
    setFormData(updatedFormData);

    // updateUserData 호출 (이 함수가 제대로 구현되었는지 확인)
    updateUserData(updatedFormData);

    // 토글 후 상태 확인
    console.log("토글 후 상태:", updatedFormData.matching);

    // 시각적 피드백 제공
    alert(
      updatedFormData.matching
        ? "미팅 페이지에 공개되었습니다!"
        : "미팅 페이지에서 비공개되었습니다!"
    );
  };

  // Define lifestyle categories for rendering
  const lifestyleCategories = [
    {
      title: "🍽️ 식생활 & 주방 관련",
      category: "food",
      items: [
        {
          label: "식사 시간",
          field: "mealTime",
          type: "select",
          options: ["불규칙적", "아침형", "저녁형", "밤형"],
        },
        {
          label: "주방 사용",
          field: "kitchenUse",
          type: "select",
          options: ["거의 안함", "가끔", "자주", "매일"],
        },
        {
          label: "요리 빈도",
          field: "cookingFrequency",
          type: "select",
          options: ["거의 안함", "가끔", "자주", "매일"],
        },
      ],
      icon: <Utensils size={40} />,
    },
    {
      title: "🧹 청결 및 정리 습관",
      category: "cleaning",
      items: [
        {
          label: "청결 수준",
          field: "cleanLevel",
          type: "select",
          options: ["낮음", "보통", "높음", "매우 높음"],
        },
        {
          label: "청소 주기",
          field: "cleaningFrequency",
          type: "select",
          options: ["필요할 때만", "주 1회", "주 2-3회", "매일"],
        },
        {
          label: "공용공간 관리",
          field: "sharedSpaceManagement",
          type: "select",
          options: ["개인공간만 관리", "가끔 정리", "공용공간 정리 참여", "적극적으로 관리"],
        },
      ],
      icon: <Home size={40} />,
    },
    {
      title: "🔊 소음 민감도",
      category: "noiseSensitivity",
      items: [
        {
          label: "소음 민감도",
          field: "sensitivityLevel",
          type: "select",
          options: ["둔감", "보통", "민감", "매우 민감"],
        },
        {
          label: "취침시 소음",
          field: "sleepNoisePreference",
          type: "select",
          options: ["조용해야 함", "백색소음 선호", "약간의 소음 허용", "소음에 둔감"],
        },
        {
          label: "음악/TV 볼륨",
          field: "musicTVVolume",
          type: "select",
          options: ["낮은 볼륨", "중간 볼륨", "높은 볼륨", "헤드폰 사용"],
        },
      ],
      icon: <Volume2 size={40} />,
    },
    {
      title: "🐶 애완동물",
      category: "petPreferences",
      items: [
        {
          label: "반려동물 허용 여부",
          field: "allowed",
          type: "select",
          options: ["허용 안함", "일부 허용", "대부분 허용", "모두 허용"],
        },
        { label: "반려동물 종류", field: "petType", type: "text" },
        {
          label: "반려동물 알레르기",
          field: "allergy",
          type: "select",
          options: ["없음", "경미함", "중간", "심함"],
        },
      ],
      icon: <Cat size={40} />,
    },
  ];

  // Helper function to safely get nested value
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((prev, curr) => {
      return prev ? prev[curr] : undefined;
    }, obj);
  };

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <div className="meeting-user-detail">
        <div className="profile-header">
          <div className="profile-image-large"></div>
          <div className="profile-basic-info">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
              className="input-field"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="나이"
              className="input-field"
            />
            <div className="profile-job-location">
              <div className="profile-job">
                <Briefcase size={40} />
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  placeholder="직업"
                  className="input-field"
                />
              </div>
              <div className="profile-location">
                <MapPin size={40} />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="지역"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="meetprofile-section">
          <h2>자기소개</h2>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="textarea-field"
            rows={4}
            placeholder="자기소개를 입력하세요"
          />
        </section>

        <section className="meetprofile-section">
          <h2>관심사</h2>
          <input
            type="text"
            name="interests"
            value={formData.interests?.join(", ") || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                interests: e.target.value.split(",").map((item) => item.trim()),
              })
            }
            className="input-field"
            placeholder="관심사를 쉼표(,)로 구분해 입력하세요"
          />
        </section>

        <section className="meetprofile-section">
          <h2>이상적인 룸메이트</h2>
          <textarea
            name="idealRoommate"
            value={formData.idealRoommate}
            onChange={handleChange}
            className="textarea-field"
            rows={3}
            placeholder="이상적인 룸메이트를 입력하세요"
          />
        </section>

        <section className="meetprofile-section lifestyle-details">
          <h2>기본 정보</h2>
          <div className="lifestyle-grid">
            <div className="lifestyle-item">
              <Star size={40} />
              <span>MBTI</span>
              <select
                name="mbti"
                value={formData.mbti}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">선택해주세요</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ISFJ">ISFJ</option>
                <option value="INFJ">INFJ</option>
                <option value="INTJ">INTJ</option>
                <option value="ISTP">ISTP</option>
                <option value="ISFP">ISFP</option>
                <option value="INFP">INFP</option>
                <option value="INTP">INTP</option>
                <option value="ESTP">ESTP</option>
                <option value="ESFP">ESFP</option>
                <option value="ENFP">ENFP</option>
                <option value="ENTP">ENTP</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENTJ">ENTJ</option>
              </select>
            </div>

            <div className="lifestyle-item">
              <Sun size={40} />
              <span>기상 시간</span>
              <input
                type="time"
                name="wakeUpTime"
                value={formData.lifestyle?.wakeUpTime || ""}
                onChange={handleLifestyleChange}
                className="input-field"
              />
            </div>
            <div className="lifestyle-item">
              <Moon size={40} />
              <span>취침 시간</span>
              <input
                type="time"
                name="sleepTime"
                value={formData.lifestyle?.sleepTime || ""}
                onChange={handleLifestyleChange}
                className="input-field"
              />
            </div>
            <div className="lifestyle-item">
              <Calendar size={40} />
              <span>밤낮 성향</span>
              <select
                name="dayNightPreference"
                value={formData.lifestyle?.dayNightPreference || ""}
                onChange={handleLifestyleChange}
                className="input-field"
              >
                <option value="낮">낮</option>
                <option value="밤">밤</option>
              </select>
            </div>
            <div className="lifestyle-item">
              <Coffee size={40} />
              <span>흡연 여부</span>
              <select
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                className="input-field"
              >
                <option value="안 함">안 함</option>
                <option value="가끔">가끔</option>
                <option value="자주">자주</option>
              </select>
            </div>
            <div className="lifestyle-item">
              <Coffee size={40} />
              <span>음주</span>
              <select
                name="drinking"
                value={formData.drinking}
                onChange={handleChange}
                className="input-field"
              >
                <option value="안 함">안 함</option>
                <option value="가끔">가끔</option>
                <option value="자주">자주</option>
              </select>
            </div>
          </div>
        </section>

        {/* 추가된 라이프스타일 카테고리 섹션들 */}
        {lifestyleCategories.map((category, idx) => (
          <section key={idx} className="meetprofile-section lifestyle-details">
            <h2>{category.title}</h2>
            <div className="lifestyle-grid">
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="lifestyle-item">
                  {itemIdx === 0 && category.icon}
                  <span>{item.label}</span>
                  {item.type === "select" ? (
                    <select
                      value={
                        getNestedValue(formData, `habits.${category.category}.${item.field}`) || ""
                      }
                      onChange={(e) =>
                        handleHabitChange(category.category, item.field, e.target.value)
                      }
                      className="input-field"
                    >
                      <option value="">선택해주세요</option>
                      {item.options.map((option, optIdx) => (
                        <option key={optIdx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={
                        getNestedValue(formData, `habits.${category.category}.${item.field}`) || ""
                      }
                      onChange={(e) =>
                        handleHabitChange(category.category, item.field, e.target.value)
                      }
                      className="input-field"
                      placeholder={`${item.label}을 입력하세요`}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="action-buttons">
          <button
            className={`primary-button ${isSaving ? "saving" : ""}`}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "저장 중..." : "프로필 저장"}
          </button>

          {/* 토글 스위치로 변경한 미팅 페이지 등록 버튼 */}
          <div className="toggle-container">
            <span className="toggle-label">미팅 페이지 공개</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={Boolean(formData.matching)}
                onChange={handleToggleMatching}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEditPage;
