import React, { useCallback, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { Notification } from '../../components';
import { updateAdminProfile, updateAdminProfilePicture } from '../../utils/utils';
import { useRouter } from 'next/router';

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
    const [previewImage, setPreviewImage] = useState();
    const user = useSelector((state) => state.user.user);
    const userId = user?._id;
    const router = useRouter();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1, // max number of files
        maxSize: 1024 * 1024 * 1000, // 1GB
        accept: "image/*", // accept all images and videos
        onDrop: (acceptedFiles) => {
            onDrop(acceptedFiles);
        }, // this is where the files are dropped
        onDropRejected: () => {
            setNotify({
                isOpen: true,
                message: "Some files were rejected. Please try again.",
                type: "error"
            });
        }, // this is where the files are rejected
        onFileDialogCancel: () => {
            setNotify({
                isOpen: true,
                message: "No files were selected.",
                type: "error"
            });
        } // this is where the user cancels the file upload
    });

    // this adds images to local state
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp" || file.type === "image/svg+xml") {
                const reader = new FileReader();
                reader.onload = () => {
                    setPreviewImage(reader.result);
                }
                reader.readAsDataURL(file);
            } else {
                setNotify({
                    isOpen: true,
                    message: "Invalid file type",
                    type: "error"
                });
            }
        });
    }, []);

    const onInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const saveData = async (data) => {
        const response = await updateAdminProfile(userId, data);
        if (response.data) {
            setNotify({ isOpen: true, message: "User data saved", type: "success" });
            router.reload(window.location.pathname);
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

    const onPictureSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp" || file.type === "image/svg+xml") {
                formData.append('profilePicture', file, file.name);
            } else {
                setNotify({
                    isOpen: true,
                    message: "Invalid file type",
                    type: "error"
                });
            }
        });
        const response = await updateAdminProfilePicture(userId, formData);
        if (response.data) {
            setNotify({ isOpen: true, message: "Profile picture updated successfully", type: "success" });
            router.reload(window.location.pathname);
        } else {
            setNotify({ isOpen: true, message: "There was an error saving profile picture", type: "error" });
        }
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
                    <div className="flex flex-col justify-between items-center w-full">
                        <form onSubmit={onSubmit} className="px-4 py-12 w-full">
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
                                        First Name
                                    </label>
                                    <input
                                        name='firstName'
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
                                        type="text"
                                        name='lastName'
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
                                        type="text"
                                        name='phoneNumber'
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
                                        type="password"
                                        name='password'
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
                                        name='confirmPassword'
                                        type="password"
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

                        {/*  add a profile picture */}
                        <form onSubmit={onPictureSubmit} className="px-4 py-12 w-full">
                            <div className="bg-gray-300">
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <div className="text-gray-700 dark:text-gray-200 hover:text-blue-600 flex flex-row justify-between items-center rounded-md px-4 py-2 w-full">
                                        <div className="bg-gray-300 mx-2 rounded-full">
                                            <IconButton>
                                                <AddToPhotosOutlinedIcon className="text-blue-600 dark:text-blue-400" fontSize='medium' />
                                            </IconButton>
                                        </div>
                                        <div className="flex flex-col cursor-pointer justify-center items-center space-y-1 w-full h-full pt-2">
                                            <p className="font-semibold text-lg capitalize">
                                                add profile picture
                                            </p>
                                            <p className="font-light text-sm">
                                                or drag and drop picture
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full justify-center items-center py-4 px-8">
                                {
                                    previewImage &&
                                    <Avatar
                                        sx={{ width: 150, height: 150 }}
                                        src={previewImage}
                                        alt='image'
                                    />
                                }
                            </div>

                            <div className="flex justify-end mt-6">
                                <button onClick={onPictureSubmit} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
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
