import React from 'react';

const Blogs = () => {
    return (
        <div>
            <div className='bg-slate-200 px-10'>
                <h1 className=' text-blue-400 text-center pt-4 text-4xl'>This is Blogs</h1>
                <div class="divider"></div>
                {/* Question-1 Part  */}
                <div className='text-black text-2xl mb-9'> <span className='text-primary'> (1)Questions:-</span>
                    <p>How will you improve the performance of a React Application?</p>
                </div>
                <div className='text-2xl mb-10'><span className='text-success'>Answer:-
                </span>
                    (1) Windowing or list virtualization in React.<br />
                    (2) Render dynamic import as a regular Component.<br />
                    (3) Keeping Component state local where necessary. etc...<br />

                </div>
                <div class="divider"></div>
                {/* Question-2 Part  */}
                <div className='text-black text-2xl mb-9'> <span className='text-primary'> (2)Questions:-</span>
                    <p>What are the different ways to manage a state in a React application?</p>
                </div>
                <div className='text-2xl mb-10'><span className='text-success'>Answer:-</span>
                    (1) Location State<br />
                    (2) Control State<br />
                    (3) Session State<br />
                    (4) Data State <br />
                </div>
                <div class="divider"></div>
                {/* Question-3 Part  */}
                <div className='text-black text-2xl mb-9'> <span className='text-primary'> (3)Questions:-</span>
                    <p>How does prototypical inheritance work?</p>
                </div>
                <div className='text-2xl mb-10'><span className='text-success'>Answer:-</span>
                    Prototypal inheritance হচ্ছে JavaScript এর একটি Feature যেইটা ব্যাবহার করে অবজেক্ট এর মাঝে Methods এবং Properties add করা হয়। <br />
                    এই মেথড এর সাহায্যে একটি Object অন্য একটি Object এর Properties এবং Methods কে inherit করতে পারে।
                </div>
                <div class="divider"></div>
                {/* Question-4 Part  */}
                {/*  <div className='text-black text-2xl mb-9'> <span className='text-primary'> (4)Questions:-</span>
                <p>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</p>
            </div>
            <div className='text-3xl mb-10'><span className='text-success'>Answer:-</span>

            </div> */}
                <div class="divider"></div>
                {/* Question-5 Part  */}
                <div className='text-black text-2xl mb-9'> <span className='text-primary'> (4)Questions:-</span>
                    <p>What is a unit test? Why should write unit tests?</p>
                </div>
                <div className='text-2xl pb-10'><span className='text-success'>Answer:-</span>
                    Unit test :
                    Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation.
                    This testing methodology is done during the development process by the software developers and sometimes QA staff. <br /> <br />
                    Why should we write unit tests :
                    Unit testing ensures that all code meets quality standards before it's deployed. This ensures a reliable engineering environment where quality is paramount. Over the course of the product development life cycle, unit testing saves time and money, and helps developers write better code, more efficiently
                </div>
            </div>
        </div>
    );
};

export default Blogs;