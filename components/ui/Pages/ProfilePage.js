import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
}

const ProfilePage = () => {
    const [values, setValues] = useState(initialValues);
    const user = useSelector((state) => state.user.user);


    const onInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    useEffect(() => {
        if (user) {
            values.firstName = user?.firstName;
            values.lastName = user?.lastName;
            values.emailAddress = user?.username;
            values.phoneNumber = user?.phone;
        }
    }, [user, values]);

    return (
        <>
            <div className="bg-frosty-schene py-52 px-8 bg-cover bg-no-repeat w-full h-full flex flex-col justify-center items-center">
                <section className="relative w-full top-0 origin-top max-w-4xl p-6 mx-auto bg-white rounded-md shadow-xl flex justify-center items-center dark:bg-gray-800">
                    <div className="absolute -top-20 flex justify-center items-center shadow-lg rounded-full border-2 border-error-bg mb-4">
                        <Avatar
                            sx={{ width: 150, height: 150 }}
                            src={user?.image}
                            alt="profile image"
                        />
                    </div>
                    <form className="px-4 py-24 w-full">
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
                                    First Name
                                </label>
                                <input
                                    disabled
                                    id="username"
                                    type="text"
                                    value={values.firstName}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">
                                    Last Name
                                </label>
                                <input
                                    disabled
                                    id="emailAddress"
                                    type="email"
                                    value={values.lastName}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                                    Phone
                                </label>
                                <input
                                    disabled
                                    id="phone"
                                    type="text"
                                    value={values.phoneNumber}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                                    Email Address
                                </label>
                                <input
                                    disabled
                                    id="emailAddress"
                                    type="text"
                                    value={values.emailAddress}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}

export default ProfilePage;
