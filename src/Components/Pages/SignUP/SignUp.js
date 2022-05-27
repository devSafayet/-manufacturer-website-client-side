import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../Firebase.init';
import Loading from '../Loading/Loading';
import google from '../../../Images/google.png';

const SignUp = () => {
    const [signInWithGoogle, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [showpass, setShowpass] = useState(false);

    const navigate = useNavigate();


    const [
        createUserWithEmailAndPassword,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);




    if (gLoading || loading || updating) {
        return <Loading></Loading>
    }

    let signInerror;

    if (gError || error || updateError) {
        signInerror = <p className="text-red-500"><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }



    const onSubmit = async data => {

        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });
        navigate('/')
    }

    return (
        <div className='flex h-screen justify-center items-center p-20 mt-20'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl text-blue-400">SignUp</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>


                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-base font-semibold">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Your name"
                                className="input input-bordered w-full max-w-xs"

                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-base font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered w-full max-w-xs"

                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Please provide a valid email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-base font-semibold">Password</span>
                            </label>
                            <input
                                type={showpass ? "text" : "password"}
                                placeholder="Enter Your Password"
                                className="input input-bordered w-full max-w-xs"

                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <input type="checkbox" name="" id="" onClick={() => setShowpass(!showpass)} /> <span>See Password</span>

                        {signInerror}

                        <div className="flex flex-col w-full border-opacity-50 mt-3">
                            <input type="submit" value="SignUp" className="grid btn btn-primary rounded-box place-items-center input input-bordered w-full max-w-xs" />

                            <p className='m-3'>Already have an account?
                                <span><Link to="/signin" className='text-primary text-bold-700 cursor-pointer'>SignIn</Link></span></p>

                        </div>
                    </form>

                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className='btn text-black bg-white'><span><img src={google} alt="" /></span> CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;