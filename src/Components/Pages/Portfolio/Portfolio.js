import React from 'react';
import './Portfolio.css';
import Typical from 'react-typical';
import myImg from '../../../Images/myImg.jpg';

const Portfolio = () => {
    return (
        <div className='banner-area'>
            <div class="hero min-h-screen bg-white">
                <div class="hero-content flex-col lg:flex-row-reverse banner-img">
                    <img src={myImg} alt="" />
                    <div className='banner-intro'>
                        <h5>Assalamu Alaikum..!</h5>
                        <h1>
                            I'm Md. SafayeTul Islam Sayem.
                        </h1>
                        <h3>
                            I am a{' '} <span>
                                <Typical
                                    steps={[
                                        'Junior Web Developer',
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

                            </span>
                        </h3>
                        <p>
                            I’m currently learning Web Developer. I am working on front end design and development with <span className='text-black'>HTML, CSS, Bootstrap, Tailwind, Daisyui,
                                JavaScript, React JS, Firebase, Express JS, MongoDB.</span> I can make dynamic and responsive website for
                            mobile.
                        </p>
                        <div className="social-link">
                            <a href="https://www.facebook.com/safayet003.admin/" target="_blank">
                                <i class="fab fa-facebook-square"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/https://www.linkedin.com/in/safayet003-admin/"
                                target="_blank"
                            >
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a
                                href="https://github.com/safayet003-admin"
                                target="_blank"
                            >
                                <i class="fab fa-github-square"></i>
                            </a>
                        </div>


                    </div>
                </div>
            </div>
            <div class="divider"></div>
            {/* My Skill Area  */}
            <div className='text-center mb-10'>
                <h1 className='text-6xl mb-8 font-semibold text-blue-400'>My Skill</h1>
                <div className=''>
                    <button className="btn m-2 bg-success">Html5</button>
                    <button className="btn m-2 bg-success">CSS3</button>
                    <button className="btn m-2 bg-success">Bootstrap</button>
                    <button className="btn m-2 bg-success">Tailwind</button>
                    <button className="btn m-2 bg-success">JavaScript</button>
                    <button className="btn m-2 bg-success">React JS</button>
                    <button className="btn m-2 bg-success">Firebase</button>
                    <button className="btn m-2 bg-success">Express JS</button>
                    <button className="btn m-2 bg-success">MongoDB</button>

                </div>
            </div>
            <div class="divider"></div>
            {/* My Best Project link Area  */}
            <div className='mb-10 justify-center'>
                <h1 className='text-6xl mb-8 font-semibold text-blue-400 text-center'>My Best Projects</h1>
                <div className='flex justify-around'>
                    <div class="card w-96 bg-base-100 shadow-xl image-full ">
                        <div class="card-body">
                            <h2 class="card-title">Apple Store!</h2>
                            <p>This is Single page simple web applications.</p>
                            <div class="card-actions">
                                <button class="btn btn-primary text-white"><a target="_blank" href="https://apple-store-abe66.web.app/">Live Site</a></button>
                                <button class="btn btn-success text-white"><a target="_blank" href="https://github.com/ProgrammingHeroWC4/warehouse-management-client-side-safayet003-admin">Client Site</a></button>
                                <button class="btn btn-success text-white"><a target="_blank" href="https://github.com/ProgrammingHeroWC4/warehouse-management-server-side-safayet003-admin">Server Site</a></button>
                            </div>
                        </div>
                    </div>
                    <div class="card w-96 bg-base-100 shadow-xl image-full">
                        <div class="card-body">
                            <h2 class="card-title">DR. Kaneez Fatema!</h2>
                            <p>This is DR. Kaneez Fatema Website. It's a Independent Service Provider Website.</p>
                            <div class="card-actions">
                                <button class="btn btn-primary text-white"><a target="_blank" href="https://independent-service-prov-48603.web.app/">Live Site</a></button>
                                <button class="btn btn-success text-white"><a target="_blank" href="https://github.com/programming-hero-web-course-4/independent-service-provider-safayet003-admin">Client Site</a></button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="divider"></div>

        </div>
    );
};

export default Portfolio;