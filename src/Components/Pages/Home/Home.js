import React from 'react';
import Banner from './Banner/Banner';
import BusinessSumary from './BusinessSumary/BusinessSumary';
import CustomerReview from './CustomerReview/CustomerReview';
import Services from './Services/Services';
import ServiceTools from './ServiceTools/ServiceTools';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServiceTools />
            <Services />
            <BusinessSumary />
            <CustomerReview />
        </div>
    );
};

export default Home;