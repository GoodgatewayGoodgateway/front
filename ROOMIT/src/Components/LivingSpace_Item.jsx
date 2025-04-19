import "./css/LivingSpace_Item.css";
import { useState } from "react";

const LivingSpace_item = ({ LivingSpaceData }) => {
  const {
    id,
    name = "이름 없음",
    type = "없음",
    location = "상세위치 없음",
    maxPersons = 0,
    presentPersons = 0,
  } = LivingSpaceData;

  const handleDetailClick = () => {
    if (id) {
      navigate(`/housing/${id}`);
    }
  };

  return (
    <div className="livingSpace-item">
      <div className="image-container">
        <img src="/images/room.jpg" alt="Room" />
      </div>
      <div className="info">
        <b>{name}</b>
        <p>임대 유형: {type}</p>
        <p>위치: {location}</p>
        <p>최대 인원: {maxPersons}</p>
        <p>현재 인원: {presentPersons}</p>
      </div>
      <button className="detail">매물 상세보기</button>
    </div>
  );
};

export default LivingSpace_item;
