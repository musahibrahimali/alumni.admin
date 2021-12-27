import React, { useState } from 'react';
import { InputField } from '../../../components';

const initialValues = {
    firstName: "",
    lastName: "",
    position: ""
}

const GuestForm = (props) => {
    const { addGuest, setGuestPopUp } = props;
    const [values, setValues] = useState(initialValues);
    const [profile, setProfile] = useState(null);
    const [errors, setErrors] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();
        if (values !== initialValues) {
            const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                position: values.position,
                profile: profile
            }
            addGuest(data);
            setValues(initialValues);
            setProfile(null);
            setGuestPopUp(false);
        } else {
            validateForm();
        }
    }

    const validateForm = () => {
        let errors = {};
        if (!values.firstName) {
            errors.firstName = "First Name is required";
        }
        if (!values.lastName) {
            errors.lastName = "Last Name is required";
        }
        if (!values.position) {
            errors.position = "Position is required";
        }
        setErrors(errors);
    }

    const handleChange = (event) => {
        event.preventDefault();
        setErrors({});
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const selectImage = (event) => {
        event.preventDefault();
        // get the file object
        const fileReader = new FileReader();
        const files = event.target.files;
        const file = files[0];
        fileReader.onload = (event) => {
            // check filesize is greater than 16mb
            if (file.size > 16777216) {
                setErrors({
                    ...errors,
                    profile: "Profile image must be less than 16mb"
                });
                return;
            }
            setProfile(event.target.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="bg-transparent w-full px-8">
                <div className="flex flex-col mb-4 justify-between items-center">
                    <div className="flex w-full items-center border-2 border-gray-200 dark:border-gray-700 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                            className="pl-2 bg-transparent outline-none border-none w-full text-gray-700 dark:text-gray-200"
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                    </div>
                    <p className="text-red-600">{errors.firstName}</p>
                </div>
                <div className="flex flex-col mb-4 justify-between items-center">
                    <div className="flex w-full items-center border-2 border-gray-200 dark:border-gray-700 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none bg-transparent w-full text-gray-700 dark:text-gray-200"
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                    </div>
                    <p className="text-red-600">{errors.lastName}</p>
                </div>
                <div className="flex flex-col justify-between mb-4 items-center">
                    <div className="flex w-full items-center border-2 border-gray-200 dark:border-gray-700 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input
                            className="pl-2 outline-none border-none bg-transparent w-full text-gray-700 dark:text-gray-200"
                            type="text"
                            name="position"
                            id="position"
                            value={values.position}
                            onChange={handleChange}
                            placeholder="Position / Profession"
                        />
                    </div>
                    <p className="text-red-600">{errors.position}</p>
                </div>
                <div className="flex w-full items-center px-3 rounded-2xl mb-4">
                    <InputField
                        className="w-full"
                        name="profile"
                        type="file"
                        accept='image/*'
                        onChange={selectImage}
                        placeholder="Profile Picture"
                    />
                    <p className="text-red-600">{errors.profile}</p>
                </div>
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="block w-full bg-indigo-700 hover:bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 dark:bg-white dark:text-gray-700 dark:hover:bg-gray-200">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default GuestForm;
