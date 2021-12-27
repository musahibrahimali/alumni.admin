import { Avatar, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import {
    CopyRight,
    DatePicker,
    InputField,
    Notification,
    PopUp,
    UseForm,
} from "../../../components";
import PreviewMedia from './PreviewMedia';
import axios from 'axios';
import Image from 'next/image';

const initialValues = {
    jobTitle: "",
    jobSnippet: "",
    jobDescription: "",
    jobLocation: "",
    companyUrl: "",
    expireDate: new Date(),
}

const CreateJobForm = () => {
    const [previewPopUp, setPreviewPopUp] = useState(false);
    const [isImg, setIsImg] = useState(false); // this facilitates the image preview
    const [isMed, setIsMed] = useState(false); // no media available
    const [previewImages, setPreviewImages] = useState([]);
    const [logo, setLogo] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    // get user id from redux
    const user = useSelector((state) => state.user.user);
    const userId = user?.userId;

    const onLogoChange = (event) => {
        event.preventDefault();
        const fileReader = new FileReader();
        const files = event.target.files;
        const file = files[0];
        fileReader.onload = (event) => {
            // check if file size is greater than 16mb
            if (file.size > 16777216) {
                setNotify({ isOpen: true, message: "File size is too large", type: "error" });
                return;
            }
            setLogo(event.target.result);
        }
        fileReader.readAsDataURL(file);
    }

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 10, // max number of files
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

    // validate the form 
    const validateForm = (fieldValues = values) => {
        let temp = { ...errors };
        if ('jobTitle' in fieldValues) {
            temp.jobTitle = fieldValues.jobTitle ? "" : "This Field is Required";
        }
        if ('jobSnippet' in fieldValues) {
            temp.jobSnippet = fieldValues.jobSnippet ? "" : "This Field is Required";
        }
        if ('jobDescription' in fieldValues) {
            temp.jobDescription = fieldValues.jobDescription ? "" : "This Field is Required";
        }
        if ('comapnyUrl' in fieldValues) {
            temp.comapnyUrl = fieldValues.comapnyUrl ? "" : "This Field is Required";
        }
        if ('expireDate' in fieldValues) {
            temp.expireDate = fieldValues.expireDate ? "" : "This Field is Required";
        }
        if ('jobLocation' in fieldValues) {
            temp.jobLocation = fieldValues.jobLocation ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            // instance of formdata
            const formData = new FormData();
            formData.append('jobTitle', values.jobTitle);
            formData.append('jobSnippet', values.jobSnippet);
            formData.append('jobDescription', values.jobDescription);
            formData.append('jobLocation', values.jobLocation);
            formData.append('expireDate', values.expireDate);
            formData.append('companyUrl', values.companyUrl);
            formData.append('companyLogo', logo);
            acceptedFiles.forEach((file) => {
                if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp" || file.type === "image/svg+xml") {
                    formData.append('images', file, file.name);
                } else {
                    setNotify({
                        isOpen: true,
                        message: "Invalid file type",
                        type: "error"
                    });
                }
            });
            // make api request with axios
            const url = "http://localhost:5000/jobs/create";
            const response = await axios({
                method: "POST",
                url: url,
                data: formData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setNotify({
                    isOpen: true,
                    message: "Job Created Successfully",
                    type: "success"
                });
            } else {
                setNotify({
                    isOpen: true,
                    message: "Error Creating Job",
                    type: "error"
                });
            }
        }
    }

    const resetForm = () => {
        removeContentToPost();
        handleResetForm();
    }

    const previewMedia = () => {
        if (previewImages.length > 0) {
            setIsImg(true);
        } else {
            setIsImg(false);
        }
    }

    // handle preview popup
    const handlePreview = () => {
        previewMedia();
        setPreviewPopUp(!previewPopUp);
    }

    // remove the selected image
    const removeContentToPost = () => {
        setPreviewImages([]);
        setValues(initialValues);
        setLogo(null);
    }

    // remove media to post
    const removeMediaToPost = () => {
        setPreviewImages([]);
    }

    // get random number for image id
    const getRandomNumber = () => {
        return Math.random().toString().substring(2, 8);
    }

    // this adds images to local state
    const onDrop = useCallback((acceptedFiles) => {
        let images = [];
        // add to images state
        const addPrevImage = (image) => {
            setPreviewImages(prevImages => [...prevImages, {
                id: getRandomNumber(),
                value: image,
            }]);
        }

        acceptedFiles.forEach((file) => {
            if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp" || file.type === "image/svg+xml") {
                images.push(file);
            } else {
                setNotify({
                    isOpen: true,
                    message: "Invalid file type",
                    type: "error"
                });
            }
        });

        images.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                addPrevImage(reader.result);
            }
            reader.readAsDataURL(file);
        });
        // console.log(formData.getAll('images'));
    }, []);

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
        setValues,
    } = UseForm(initialValues, true, validateForm);

    // update ui when image list changes with useEffect
    useEffect(() => {
        // check there are either images or videos
        if (previewImages.length <= 0) {
            setIsMed(true);
        } else {
            setIsMed(false);
        }
    }, [previewImages]);

    return (
        <>
            <div className="relative top-0 mt-10 origin-top bg-white dark:bg-gray-50 flex flex-col justify-center items-center w-full h-full px-4 shadow-lg rounded-lg">
                <div className="absolute -top-12 rounded-md bg-error-bg px-8 text-white font-sans font-extrabold py-2">
                    <h1 className="text-6xl">
                        Create Job
                    </h1>
                </div>
                <form onSubmit={onSubmit} className="grid grid-cols-6 w-full h-full px-8 py-12 space-x-4">
                    {/* first column */}
                    <div className="col-span-3 w-full space-y-8">
                        <InputField
                            className="w-full"
                            name="jobTitle"
                            placeholder="Job Title"
                            value={values.jobTitle}
                            onChange={handleInputChange}
                            error={errors.jobTitle}
                        />

                        <InputField
                            className="w-full"
                            name="jobLocation"
                            placeholder="Location"
                            value={values.jobLocation}
                            onChange={handleInputChange}
                            error={errors.jobLocation}
                        />

                        <InputField
                            className="w-full"
                            name="companyUrl"
                            placeholder="Company website url"
                            value={values.companyUrl}
                            onChange={handleInputChange}
                            error={errors.companyUrl}
                        />

                        <InputField
                            className="w-full"
                            name="jobSnippet"
                            multiline={true}
                            rows={3}
                            maxRows={10}
                            placeholder="Short Description of Job"
                            value={values.jobSnippet}
                            onChange={handleInputChange}
                            error={errors.jobSnippet}
                        />
                    </div>

                    {/* second column */}
                    <div className="col-span-3 w-full space-y-6">
                        <InputField
                            className="w-full"
                            name="jobDescription"
                            multiline={true}
                            rows={5}
                            maxRows={50}
                            placeholder="Job Description"
                            value={values.jobDescription}
                            onChange={handleInputChange}
                            error={errors.jobDescription}
                        />

                        <DatePicker
                            className="w-full"
                            name="expireDate"
                            placeholder="Expire Date"
                            onChange={handleInputChange}
                            error={errors.expireDate}
                        />

                        {/* image preview after drag and drop or select */}
                        <div className="bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-md flex flex-col justify-center items-center cursor-pointer relative py-2 px-2">
                            {/* show the default background and content if no media has been loaded */}
                            {
                                isMed &&
                                <div>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} />
                                        <div className="text-black hover:text-blue-600 flex flex-row justify-between items-center rounded-md px-4 py-2 w-full">
                                            <div className="bg-gray-300 mx-2 rounded-full">
                                                <IconButton>
                                                    <AddToPhotosOutlinedIcon className="text-blue-600 dark:text-blue-400" fontSize='medium' />
                                                </IconButton>
                                            </div>
                                            <div className="flex flex-col justify-center items-center space-y-1 w-full h-full pt-2">
                                                <p className="font-semibold text-lg capitalize">
                                                    add photos
                                                </p>
                                                <p className="font-light text-sm">
                                                    or drag and drop
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/* show preview images button */}
                            {
                                !isMed &&
                                <div className="flex justify-center items-center pt-4 pb-4">
                                    <button onClick={handlePreview} className="bg-deep-yellow hover:bg-yellow-500 text-white transfrom transition-all ease-in-out duration-500 px-8 py-2">
                                        Preview Media
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col space-y-2 px-4 justify-center items-center text-gray-700 dark:text-gray-200">
                            <h3 className="text-center text-lg">
                                Company Logo
                            </h3>
                            <div className="flex flex-row justify-center items-center">
                                {
                                    logo && <Image
                                        className="w-full h-full rounded-full border border-gray-200 dark:border-gray-700"
                                        src={logo}
                                        height={80}
                                        width={80}
                                        objectFit='cover'
                                        alt="company logo"
                                    />
                                }
                                {
                                    !logo && <InputField
                                        className="w-full"
                                        name="companyLogo"
                                        placeholder="Company Logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={onLogoChange}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </form>
                <div className="flex flex-row justify-center items-center text-white dark:text-gray-200 space-x-4 pb-4">
                    <button onClick={onSubmit} className="w-44 bg-error-bg hover:bg-light-blue px-8 py-2 hover:shadow-md transform transition-all duration-500 ease-in-out">
                        submit event
                    </button>
                    <button onClick={resetForm} className="bg-red-700 hover:bg-red-600 px-8 py-2 w-44 hover:shadow-md transform transition-all duration-500 ease-in-out">
                        reset form
                    </button>
                </div>
                <div className="flex justify-center items-center py-2 px-4">
                    <CopyRight />
                </div>
            </div>

            {/* pop up  to preview images */}
            <PopUp
                openPopUp={previewPopUp}
                setOpenPopUp={setPreviewPopUp}
                title={"Preview Images and Videos"}
            >
                <PreviewMedia
                    images={previewImages}
                    isImg={isImg}
                    removeMediaToPost={removeMediaToPost}
                />
            </PopUp>

            {/* for notifications */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}

export default CreateJobForm;

