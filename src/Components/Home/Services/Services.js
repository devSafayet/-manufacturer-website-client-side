import React from 'react';
import './Services.css';
import service from '../../../Images/services.png';

const Services = () => {
    const services = [
        {
            id: 1,
            name: "Transmission",
            icon: <i className="fas fa-car-battery"></i>,
            description:
                "Car Repair & Services 7 Days Service Warranty. On Time Work Completion Skilled & Reliable.",
        },
        {
            id: 2,
            name: "Oil Change",
            icon: <i class="fas fa-motorcycle"></i>,
            description:
                "Car Repair & Services 7 Days Service Warranty. On Time Work Completion Skilled & Reliable.",
        },
        {
            id: 3,
            name: "Air Conditioning",
            icon: <i className="fas fa-fan"></i>,
            description:
                "Car Repair & Services 7 Days Service Warranty. On Time Work Completion Skilled & Reliable.",
        },
        {
            id: 4,
            name: "Auto Electric",
            icon: <i className="fas fa-bolt"></i>,
            description:
                "Car Repair & Services · 7 Days Service Warranty · On Time Work Completion Skilled & Reliable.",
        },
    ];
    return (
        <div>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <img src={service} class="max-w-sm rounded-lg shadow-2xl" />

                    <div className='text-center'>

                        <div className="service-intro">
                            <h2 className="text-3xl text-blue-400">Our Services</h2>
                            <p className='m-auto'>
                                Find Car Service In Usa. Unlimited Access. 100% Secure. Always
                                Facts. Privacy Friendly. The Best Resources.
                            </p>
                        </div>
                        <div className='flex align-items-center px-2'>
                            {services.map((service) => (
                                <div key={service.id}>
                                    <div className="service-card">
                                        <div style={{ fontSize: "33px", color: "#60A5FA" }}>
                                            {service.icon}
                                        </div>
                                        <div>
                                            <h5 style={{ color: "#34495e", fontWeight: "bold" }}>
                                                {service.name}
                                            </h5>
                                            <p className="text-muted">{service.description}</p>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;