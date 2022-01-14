import React, { useState } from 'react';
import { Notification } from '../../components';
import { updateAdminProfile } from '../../utils/request_helpers';

const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
}

const SettingsForm = () => {
    const [values, setValues] = useState(initialValues);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const onInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const saveData = async (data) => {
        const response = await updateAdminProfile(data);
        if (response.data) {
            setNotify({ isOpen: true, message: "User data saved", type: "success" });
        } else {
            setNotify({ isOpen: true, message: "There was an error saving data", type: "error" });
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            phone: values.phoneNumber,
        }
        await saveData(data);

    }

    return (
        <>
            <div className="bg-frosty-schene py-44 px-8 bg-cover bg-no-repeat w-full h-full flex flex-col justify-center items-center">
                <section className="relative w-full top-0 origin-top max-w-4xl p-6 mx-auto bg-white rounded-md shadow-xl flex justify-center items-center dark:bg-gray-800">
                    <div className="absolute -top-8 flex justify-center items-center px-12 py-4 text-white dark:text-white font-bold shadow-lg bg-error-bg rounded-md">
                        <h2 className="text-lg font-semibold capitalize">
                            Account settings
                        </h2>
                    </div>
                    <form onSubmit={onSubmit} className="px-4 py-12 w-full">
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
                                    First Name
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={values.firstName}
                                    onChange={onInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">
                                    Last Name
                                </label>
                                <input
                                    id="emailAddress"
                                    type="email"
                                    value={values.lastName}
                                    onChange={onInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                                    Phone
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={values.phoneNumber}
                                    onChange={onInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={values.password}
                                    onChange={onInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>


                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">
                                    Password Confirmation
                                </label>
                                <input
                                    id="passwordConfirmation" type="password"
                                    value={values.confirmPassword}
                                    onChange={onInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button onClick={onSubmit} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Save
                            </button>
                        </div>
                    </form>
                </section>
            </div>

            {/* Action Notification */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}

export default SettingsForm;
