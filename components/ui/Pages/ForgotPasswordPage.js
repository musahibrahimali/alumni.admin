import Link from 'next/link';
import React from 'react';

const ForgotPasswordPage = () => {
    return (
        <div className="font-sans bg-frosty-schene flex justify-center items-center bg-cover bg-no-repeat h-full py-40 w-full">
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full h-auto bg-forgot-password hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
                        </div>
                        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 p-5 rounded-lg lg:rounded-l-none">
                            <div className="px-8 mb-4 text-center">
                                <h3 className="pt-4 mb-2 text-2xl text-gray-700 dark:text-gray-100">
                                    Forgot Your Password?
                                </h3>
                                <p className="mb-4 text-sm text-gray-700 dark:text-gray-200">
                                    We get it, stuff happens. Just enter your email address below and we&apos;ll send you a
                                    link to reset your password!
                                </p>
                            </div>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-900 rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-transparent"
                                        id="email"
                                        type="email"
                                        placeholder="Enter Email Address..."
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                                <hr className="mb-6 border-t border-gray-200 dark:border-gray-700" />
                                <div className="text-center">
                                    <Link href="/admin/register">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        >
                                            Create an Account!
                                        </a>
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link href="/admin/login">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        >
                                            Already have an account? Login!
                                        </a>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;
