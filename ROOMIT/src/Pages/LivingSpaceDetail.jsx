import "./css/LivingSpaceDetail.css";
import Header from "../Components/Header";
import LivingSpaceData from "../Data/LivingSpaceData";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LivingSpaceDetail = () => {
  const { id } = useParams();
  const livingSpace = LivingSpaceData.find((it) => String(it.id) === id);
  const navigate = useNavigate();
  const currentLivingSpaceId = 99;

  if (!livingSpace) {
    return <div>해당 매물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="livingSpaceDetail">
      <Header />

      <div className="livingSpaceDetail-content">
        <div className="card livingSpaceDetail-item">
          <div className="image-container">
            <img src="/images/room.jpg" alt="Room" />
          </div>

          <div className="info">
            <b>{livingSpace.name}</b>
            <p>임대 유형: {livingSpace.type}</p>
            <p>임대료: {livingSpace.price}</p>
            <p>위치: {livingSpace.location}</p>
            <p>최대 인원: {livingSpace.maxPersons}</p>
            <p>현재 인원: {livingSpace.presentPersons}</p>
            <p>전용면적: {livingSpace.netLeasableArea}평</p>
            <p>등록일: {livingSpace.registrationTime}</p>
          </div>
        </div>

        <div className="card location-map">지도</div>

        <div className="card livingSpace-feature">특징(주변 편의시설, 역세권 등등)</div>
      </div>
    </div>
  );
};
export default LivingSpaceDetail;
