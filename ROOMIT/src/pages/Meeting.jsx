import React, { useState, useEffect } from "react";
import { fetchProfile } from "../services/user"; // API 호출 함수 import
import ProfileCard from "../Components/User_Profile_Card";
import Header from "../Components/Header";
import FilterBar from "../Components/Filter";
import "../Pages/css/Meeting.css";

const Meeting = () => {
  const [users, setUsers] = useState([]); // 사용자 데이터를 저장할 상태
  const [filteredUsers, setFilteredUsers] = useState([]); // 필터링된 사용자 목록

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("📌 [Meeting.jsx] userId:", userId);

    fetchProfile(userId)
      .then((data) => {
        console.log("✅ 서버에서 받은 프로필 데이터:", data);
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error("❌ 데이터를 가져오는 데 실패했습니다:", error);
      });
  }, []);

  return (
    <div className="roommates-list">
      <Header />
      <h1>룸메이트 매칭</h1>
      <h2>룸메이트를 찾아보세요!</h2>
      <FilterBar users={users} onFilterChange={setFilteredUsers} /> {/* 필터링된 결과를 받아옴 */}
      <div className="roommate-list">
        {filteredUsers
          .filter((user) => user && user.id) // 존재하고 id가 있는 유저만 통과
          .map((user, index) => (
            <ProfileCard key={`${user.id}-${index}`} userData={user} />
          ))}
      </div>
    </div>
  );
};

export default Meeting;
