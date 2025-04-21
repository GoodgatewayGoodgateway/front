import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import Notfound from './Pages/Notfound';
import Meeting from './Pages/Meeting';
import LivingSpace from './Pages/LivingSpace';
import Main from './Pages/Main';
import Login from './Pages/Login';
import userData from './Data/UserData';
import LivingSpaceData from './Data/LivingSpaceData';
import MeetingDetail from './Pages/MeetingDetail';
import ChatRoom from './Pages/ChatRoom';
import MyPages from './Pages/MyPages';
import ScrollToTop from './Components/ScrollToTop';
import { useState } from 'react';

const App = () => {
  const [currentUser, setCurrentUser] = useState(userData[0] || { id: 'alvin42' });

  const updateUserData = (newData) => {
    setCurrentUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className='App'>
          <Routes>
            <Route path='/' element={<Main userData={userData} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/meeting' element={<Meeting users={userData} />} />
            <Route path='/meeting/:id' element={<MeetingDetail userData={userData} />} />
            <Route path='/housing' element={<LivingSpace LivingSpaceData={LivingSpaceData} />} />
            <Route path='/chat' element={<ChatRoom userData={userData} />} />
            <Route path='/chat/:roomId' element={<ChatRoom userData={userData} />} />
            <Route
              path='/mypages'
              element={
                <MyPages
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  updateUserData={updateUserData}
                />
              }
            />
            {/* Placeholder for profile page; replace with actual component */}
            <Route path='/mypage/:id' element={<div>Profile Page (Placeholder)</div>} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;