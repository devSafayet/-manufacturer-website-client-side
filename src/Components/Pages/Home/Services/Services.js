import React from 'react';
import service from "../../../../Images/all-parts.jpg";
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <i className="fas fa-car-battery"></i>,
            description:
                "Bike Repair & Services 3 Days Service Warranty. On Time Work Completion Skilled & Reliable.",
        },
        {
            id: 2,
            name: "Cooling System",
            icon: <i class="fas fa-motorcycle"></i>,
            description:
                "Bike Repair & Services 3 Days Service Warranty. On Time Work Completion Skilled & Reliable.",
        },
        {
            id: 3,
            name: "Engine Valves",
            icon: <i className="fas fa-bolt"></i>,
            description:
                "Bike Repair & Services 3 Days Service Warranty. On Time Work Completion Skilled & Reliable.",
        },
    ];
    return (
        <div className='bg-base-200 sm:grid text-center pt-20 '>
            <h2 className="text-3xl text-blue-400">Our Services</h2>
            <div class="hero ">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <img src={service} class="max-w-sm rounded-lg shadow-2xl" alt='' />

                    <div className='text-center lg:flex-row-reverse'>

                        <div className="service-intro pb-10">
                            <p className='m-auto px-5'>
                                Find Moto World Service In World. Unlimited Access. 100% Secure. Always
                                Facts. Privacy Friendly. The Best Resources.
                            </p>
                        </div>
                        <div className='justify-center px-10 details pb-10 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:px-12'>
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