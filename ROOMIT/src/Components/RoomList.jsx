// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./css/RoomList.css";

// const RoomList = React.memo(({ userData, myId }) => {
//   const [chatRooms, setChatRooms] = useState([]);

//   useEffect(() => {
//     if (!userData || !Array.isArray(userData)) return; // 조건 추가

//     const savedRooms = userData
//       .filter((user) => user.id !== myId)
//       .map((user) => {
//         const roomId = [myId, user.id].sort().join("-");
//         const messages = JSON.parse(localStorage.getItem(`chat_${roomId}`)) || [];
//         const lastRead = localStorage.getItem(`read_${roomId}_${myId}`);

//         const unread = messages.filter((msg) => {
//           return (
//             msg.senderId !== myId && (!lastRead || new Date(msg.timestamp) > new Date(lastRead))
//           );
//         }).length;

//         const lastMsg = messages[messages.length - 1];

//         return {
//           id: user.id,
//           name: user.name,
//           avatar: user.avatar || "/vite.svg",
//           online: user.online || false,
//           unread,
//           lastMessage: lastMsg?.content || "",
//           readtime: lastMsg?.timestamp || null,
//         };
//       });

//     setChatRooms(savedRooms);
//   }, [userData, myId]);

//   const formatReadTime = (readtime) => {
//     if (!readtime) return "";
//     const now = new Date();
//     const readDate = new Date(readtime);
//     const diff = now - readDate;
//     const diffMinutes = Math.floor(diff / 60000);
//     const diffHours = Math.floor(diff / 3600000);
//     const diffDays = Math.floor(diff / 86400000);

//     if (diffMinutes < 1) return "방금";
//     if (diffMinutes < 60) return `${diffMinutes}분 전`;
//     if (diffHours < 24) return `${diffHours}시간 전`;
//     if (diffDays === 1) return "어제";
//     if (diffDays < 7) return `${diffDays}일 전`;
//     return "오래전";
//   };

//   return (
//     <div className="room-list">
//       {chatRooms.map((room) => (
//         <Link to={`/chat/${myId}-${room.id}`} key={room.id} className="room-item">
//           <div className="room-avatar">
//             <img src={room.avatar} alt={`${room.name} avatar`} className="room-avatar-image" />
//             {room.online && <div className="online-indicator"></div>}
//           </div>
//           <div className="room-content">
//             <div className="room-header">
//               <div className="room-name-container">
//                 <h3 className="room-name">{room.name}</h3>
//               </div>
//               <span className="room-time">{formatReadTime(room.readtime)}</span>
//             </div>
//             <p className="room-last-message">{room.lastMessage}</p>
//           </div>
//           {room.unread > 0 && <div className="unread-badge">{room.unread}</div>}
//         </Link>
//       ))}
//     </div>
//   );
// });

// export default React.memo(RoomList);

// RoomList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/RoomList.css";

const RoomList = React.memo(({ userData, myId }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    if (!myId) return;

    axios
      .get(`/api/chatrooms/${myId}`)
      .then((res) => setChatRooms(res.data))
      .catch((err) => console.error("채팅방 목록 가져오기 실패:", err));
  }, [myId]);

  const formatReadTime = (timestamp) => {
    if (!timestamp) return "";
    const now = new Date();
    const readDate = new Date(timestamp);
    const diff = now - readDate;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "방금";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`;
    return "오래전";
  };

  return (
    <div className="room-list">
      {chatRooms.map((room) => (
        <Link to={`/chat/${myId}-${room.id}`} key={room.id} className="room-item">
          <div className="room-avatar">
            <img
              src={room.avatar || "/vite.svg"}
              alt={`${room.name} avatar`}
              className="room-avatar-image"
            />
            {room.online && <div className="online-indicator"></div>}
          </div>
          <div className="room-content">
            <div className="room-header">
              <div className="room-name-container">
                <h3 className="room-name">{room.name}</h3>
              </div>
              <span className="room-time">{formatReadTime(room.readtime)}</span>
            </div>
            <p className="room-last-message">{room.lastMessage}</p>
          </div>
          {room.unread > 0 && <div className="unread-badge">{room.unread}</div>}
        </Link>
      ))}
    </div>
  );
});

export default RoomList;
