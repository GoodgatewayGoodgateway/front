import React from 'react';
import Header from '../Components/Header';
import HeroBanner from '../Components/HeroBanner';
import FeatureSection from '../Components/FeatureSection';
import RoommateSection from '../Components/RoommateSection';
import HousingSection from '../Components/HousingSection';
import Footer from '../Components/Footer';

const Main = ({ userData, currentUser, setCurrentUser }) => {
    console.log(userData); // userData가 제대로 전달되고 있는지 확인

    return (
        <div>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <HeroBanner />
            <FeatureSection />
            <RoommateSection users={userData} />
            <HousingSection />
            <Footer />
        </div>
    );
};

export default Main;
