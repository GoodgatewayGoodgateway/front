import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import FeatureSection from '../components/FeatureSection';
import RoommateSection from '../components/RoommateSection';
import HousingSection from '../components/HousingSection';
import Footer from '../components/Footer';

const Main = ({ currentUser, setCurrentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <HeroBanner />
            <FeatureSection />
            <RoommateSection />
            <HousingSection />
            <Footer />
        </div>
    );
};

export default Main;
