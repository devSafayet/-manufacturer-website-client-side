import React from 'react';

const Blog = () => {
    return (
        <div className='pt-10 pb-10 bg-slate-200 px-10'>
            <h1 className='text-blue-400 text-center text-4xl'>This is Blogs</h1>
            <div class="divider"></div>
            {/* Question-1 Part  */}
            <div className='text-black text-3xl mb-9 flex'> <span className='text-primary'> (1)Questions:-</span>
                <p>How will you improve the performance of a React Application?</p>
            </div>
            <div className='text-3xl mb-10'><span className='text-success'>Answer:-</span>

            </div>
            <div class="divider"></div>
            {/* Question-2 Part  */}
            <div className='text-black text-3xl mb-9 flex'> <span className='text-primary'> (2)Questions:-</span>
                <p>What are the different ways to manage a state in a React application?</p>
            </div>
            <div className='text-3xl mb-10'><span className='text-success'>Answer:-</span>

            </div>
            <div class="divider"></div>
            {/* Question-3 Part  */}
            <div className='text-black text-3xl mb-9 flex'> <span className='text-primary'> (3)Questions:-</span>
                <p>How does prototypical inheritance work?</p>
            </div>
            <div className='text-3xl mb-10'><span className='text-success'>Answer:-</span>

            </div>
            <div class="divider"></div>
            {/* Question-4 Part  */}
            <div className='text-black text-3xl mb-9 flex'> <span className='text-primary'> (4)Questions:-</span>
                <p>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</p>
            </div>
            <div className='text-3xl mb-10'><span className='text-success'>Answer:-</span>

            </div>
            <div class="divider"></div>
            {/* Question-5 Part  */}
            <div className='text-black text-3xl mb-9 flex'> <span className='text-primary'> (5)Questions:-</span>
                <p>What is a unit test? Why should write unit tests?</p>
            </div>
            <div className='text-3xl mb-10'><span className='text-success'>Answer:-</span>

            </div>
        </div>
    );
};

export default Blog;