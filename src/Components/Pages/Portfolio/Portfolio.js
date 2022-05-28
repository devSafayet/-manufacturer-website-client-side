import React from 'react';
import Typical from 'react-typical';

const Portfolio = () => {
    return (
        <div className='banner-area'>
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://api.lorem.space/image/movie?w=260&h=400" class="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h5>Assalamu Alaikum..!</h5>
                        <h1>
                            I'm Md. SafayeTul Islam Sayem.
                        </h1>
                        <h3>
                            I am a{' '} <span>
                                <Typical
                                    steps={[
                                        'I’m currently learning Web Developer',
                                        1000,
                                        'Frontend Developer',
                                        1000,
                                        'React Developer',
                                        1000,
                                        'Competitive Programmer',
                                        1000
                                    ]}
                                    loop={Infinity}
                                    wrapper="b"
                                />
                                {/*  <Typical
                                    loop={Infinity}
                                    wrapper="b"
                                    steps={[
                                        'I’m currently learning Web Developer',
                                        1000,
                                        'Frontend Developer',
                                        1000,
                                        'React Developer',
                                        1000,
                                        'Competitive Programmer',
                                        1000
                                    ]} */}

                            </span>
                        </h3>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Portfolio;