import React from 'react';
import '../Pages/css/ChatRoom.css';
import Header from '../Components/Header';
import Chat from '../Components/Chat';
import RoomList from '../Components/RoomList.jsx';

const ChatRoom = () => {
    return (
        <div>
            <Header />
            <div className="">
                <div className="room-list">
                    <RoomList />
                </div>
                <div className="chat-room-container">
                    <div className="chat-window">
                        <Chat />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChatRoom;