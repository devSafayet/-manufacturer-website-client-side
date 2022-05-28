import React from 'react';
import Banner from '../Banner/Banner';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import CustomersReview from '../CustomersReview/CustomersReview';
import Services from '../Services/Services';
import ServicesTools from '../Servicetools/ServicesTools';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesTools />
            <Services />
            <BusinessSummary />
            <CustomersReview />
        </div>
    );
};

export default Home;