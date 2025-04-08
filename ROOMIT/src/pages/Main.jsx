import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import FeatureSection from '../components/FeatureSection';
import RoommateSection from '../components/RoommateSection';
import HousingSection from '../components/HousingSection';
import Footer from '../components/Footer';

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
