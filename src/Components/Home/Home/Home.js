import React from 'react';
import Banner from '../Banner/Banner';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import ServicesTools from '../Servicetools/ServicesTools';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesTools />
            <BusinessSummary />
        </div>
    );
};

export default Home;