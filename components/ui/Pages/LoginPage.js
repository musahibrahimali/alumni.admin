import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Notification } from '../../components';
import axios from 'axios';

const initialValues = {
    emailAddress: "",
    password: "",
}

const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" }); // notification
    const router = useRouter();

    // handle input change
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    // handle submit
    const handleLogInRequest = async () => {
        const username = values.emailAddress;
        const password = values.password;
        const response = await axios({
            url: `http://localhost:5000/admin/login`,
            method: "POST",
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            data: JSON.stringify({
                username,
                password,
            }),
        });
        if (response.data.access_token) {
            setNotify({ isOpen: true, message: "Login Successful", type: "success" });
            setIsLoading(false);
            router.replace('/admin/dashboard');
        } else {
            setNotify({ isOpen: true, message: "There was an error loggin in", type: "success" });
            setIsLoading(false);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await handleLogInRequest();
    }

    // show or hide password
    const handleShowPassword = () => {
        setIsVisible(!isVisible);
    }

    return (
        <>
            <div className="bg-snowy-mountain h-full w-full flex flex-col justify-center bg-cover bg-no-repeat items-center py-56">
                <div className="relative origin-top flex w-1/2 justify-center items-center bg-white shadow-md dark:bg-gray-900 py-24 px-4 rounded-md ">
                    <div className="absolute -top-10 bg-error-bg text-white w-80 flex justify-center items-center shadow-lg px-12 py-4 rounded-md">
                        <h1 className="font-bold text-lg md:text-4xl mb-1">
                            Login
                        </h1>
                    </div>
                    <form onSubmit={onSubmit} className="bg-transparent w-full px-8">
                        <div className="flex w-full items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input
                                className="pl-2 bg-transparent outline-none border-none w-full text-gray-700 dark:text-gray-200"
                                type="text"
                                name="emailAddress"
                                id="emailAddress"
                                value={values.emailAddress}
                                onChange={handleChange}
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input
                                className="pl-2 bg-transparent outline-none border-none w-full text-gray-700 dark:text-gray-200"
                                type={isVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            {
                                isVisible ?
                                    <div className="cursor-pointer" onClick={handleShowPassword}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    </div> :
                                    <div className="cursor-pointer" onClick={handleShowPassword} >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                            }
                        </div>
                        {
                            !isLoading ?
                                <button
                                    onClick={onSubmit}
                                    type="submit"
                                    className="block w-full bg-indigo-700 hover:bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
                                    Login
                                </button> :
                                <div className="flex justify-around">
                                    <span className="inline-flex bg-pink-600 mb-2 mt-4 rounded-md shadow-sm">
                                        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing
                                        </button>
                                    </span>
                                </div>
                        }
                        <div className="flex pt-2 justify-between items-center">
                            <Link href="/admin/forgot-password">
                                <a className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                                    Forgot Password ?
                                </a>
                            </Link>
                            <Link href="/admin/register">
                                <a className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                                    Register
                                </a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}

export default LoginPage;
