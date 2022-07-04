import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact m-10">
            <div className="container">
                <div className="title text-blue-400 text-4xl">
                    <h1 className='text-blue-400'>Contact us form</h1>
                </div>
                <div className="contact-form">
                    <div className="input-fields">
                        <input type="text" className="input" placeholder="Name" />
                        <input type="text" className="input" placeholder="Email Address" />
                        <input type="text" className="input" placeholder="Phone" />
                        <input type="text" className="input" placeholder="Subject" />
                    </div>
                    <div className="msg">
                        <textarea placeholder="Message" />
                        <button className="btn bg-blue-400">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;