import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import Notfound from "./Pages/Notfound";
import Meeting from "./Pages/Meeting";
import LivingSpace from "./Pages/LivingSpace";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import userData from "./Data/UserData"; // 유저 데이터 import
import LivingSpaceData from "./Data/LivingSpaceData"; // 주거공간 데이터 import
import MeetingDetail from "./Pages/MeetingDetail";
import ChatRoom from "./Pages/ChatRoom";
import MyPages from "./Pages/MyPages";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Routes>
            <Route path="/" element={<Main userData={userData} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/meeting" element={<Meeting users={userData} />} />
            <Route path="/meeting/:id" element={<MeetingDetail userData={userData} />} />
            <Route path="/housing" element={<LivingSpace LivingSpaceData={LivingSpaceData} />} />
            <Route path="/chat" element={<ChatRoom userData={userData} />} />
            <Route path="/chat/:roomId" element={<ChatRoom userData={userData} />} />
            <Route path="/mypages" element={<MyPages />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
