import React, { useCallback, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
// import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useDropzone } from 'react-dropzone';
import {
    CopyRight,
    DatePicker,
    InputField,
    Notification,
    PopUp,
    UseForm,
} from "../../../components";
import PreviewMedia from './PreviewMedia';
// import GuestForm from './GuestForm';
import { TimePicker } from '../../../widgets/widgets';
import { createEvent } from '../../../utils/request_helpers';

const initialValues = {
    title: "",
    snippet: "",
    details: "",
    venue: "",
    startDate: new Date(),
    endDate: new Date(),
    time: new Date(),
}

const CreateEventForm = () => {
    const [previewPopUp, setPreviewPopUp] = useState(false);
    // const [guestPopUp, setGuestPopUp] = useState(false);
    const [isImg, setIsImg] = useState(false); // this facilitates the image preview
    const [isVid, setIsVid] = useState(false); // this facilitates the video preview
    const [isMed, setIsMed] = useState(false); // no media available
    const [previewImages, setPreviewImages] = useState([]);
    const [previewVideos, setPreviewVideos] = useState([]);
    // const [guests, setGuest] = useState([]); // add guest to event
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 10, // max number of files
        maxSize: 1024 * 1024 * 1000, // 1GB
        accept: "image/*, video/*", // accept all images and videos
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
        if ('title' in fieldValues) {
            temp.title = fieldValues.title ? "" : "This Field is Required";
        }
        if ('snippet' in fieldValues) {
            temp.snippet = fieldValues.snippet ? "" : "This Field is Required";
        }
        if ('details' in fieldValues) {
            temp.details = fieldValues.details ? "" : "This Field is Required";
        }
        if ('startDate' in fieldValues) {
            temp.startDate = fieldValues.startDate ? "" : "This Field is Required";
        }
        if ('endDate' in fieldValues) {
            temp.endDate = fieldValues.endDate ? "" : "This Field is Required";
        }
        if ('time' in fieldValues) {
            temp.time = fieldValues.time ? "" : "This Field is Required";
        }
        if ('venue' in fieldValues) {
            temp.venue = fieldValues.venue ? "" : "This Field is Required";
        }
        setErrors({
            ...temp
        });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    }

    const {
        values,
        setErrors,
        handleInputChange,
        handleResetForm,
        errors,
        setValues,
    } = UseForm(initialValues, true, validateForm);

    // remove media to post
    const removeMediaToPost = () => {
        setPreviewImages([]);
        setPreviewVideos([]);
    }

    // get random number for image id
    const getRandomNumber = () => {
        return Math.random().toString().substring(2, 8);
    }

    // this adds images to local state
    const onDrop = useCallback((acceptedFiles) => {
        let images = [];
        let videos = [];
        // add to images state
        const addPrevImage = (image) => {
            setPreviewImages(prevImages => [...prevImages, {
                id: getRandomNumber(),
                value: image,
            }]);
        }

        // add to videos state
        const addPrevVideo = (video) => {
            setPreviewVideos(prevVideos => [...prevVideos, {
                id: getRandomNumber(),
                value: video,
            }]);
        }

        acceptedFiles.forEach((file) => {
            if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp" || file.type === "image/svg+xml") {
                images.push(file);
            } else if (file.type === "video/mp4" || file.type === "video/quicktime" || file.type === "video/x-msvideo" || file.type === "video/x-ms-wmv" || file.type === "video/x-flv" || file.type === "video/x-matroska" || file.type === "video/webm" || file.type === "video/ogg") {
                videos.push(file);
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

        videos.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                addPrevVideo(reader.result);
            }
            reader.readAsDataURL(file);
        });
        // console.log(formData.getAll('images'));
    }, []);

    // const addGuest = (data) => {
    //     setGuest(prevGuests => [...prevGuests, {
    //         id: getRandomNumber(),
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         position: data.position,
    //         profile: data.profile,
    //     }]);
    // }

    const onSubmit = async (event) => {
        event.preventDefault();
        // instance of formdata
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("snippet", values.snippet);
        formData.append("details", values.details);
        formData.append("startDate", values.startDate);
        formData.append("endDate", values.endDate);
        formData.append("time", values.time);
        formData.append("venue", values.venue);
        // formData.append("guests", JSON.stringify(guests));
        acceptedFiles.forEach((file) => {
            if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif" || file.type === "image/bmp" || file.type === "image/svg+xml") {
                formData.append('images', file, file.name);
            } else if (file.type === "video/mp4" || file.type === "video/quicktime" || file.type === "video/x-msvideo" || file.type === "video/x-ms-wmv" || file.type === "video/x-flv" || file.type === "video/x-matroska" || file.type === "video/webm" || file.type === "video/ogg") {
                formData.append('videos', file, file.name);
            } else {
                setNotify({
                    isOpen: true,
                    message: "Invalid file type",
                    type: "error"
                });
            }
        });
        // console.log(formData.getAll('images'));
        // make the fetch request
        const response = await createEvent(formData);
        if (response.data) {
            setNotify({
                isOpen: true,
                message: "Event created successfully",
                type: "success"
            });
            resetForm();
        } else {
            setNotify({
                isOpen: true,
                message: "There was an error creating the event",
                type: "error"
            });
        }
    }

    const resetForm = () => {
        // setGuest([]);
        setPreviewImages([]);
        setPreviewVideos([]);
        setValues(initialValues);
        handleResetForm();
    }

    const previewMedia = () => {
        if (previewImages.length > 0) {
            setIsImg(true);
        } else {
            setIsImg(false);
        }
        // check videos lenght
        if (previewVideos.length > 0) {
            setIsVid(true);
        } else {
            setIsVid(false);
        }
    }

    // handle preview popup
    const handlePreview = (event) => {
        event.preventDefault();
        previewMedia();
        setPreviewPopUp(!previewPopUp);
    }

    // const handleGuestPopUp = () => {
    //     setGuestPopUp(!guestPopUp);
    // }

    // update ui when image list changes with useEffect
    useEffect(() => {
        // check there are either images or videos
        if (previewImages.length <= 0 && previewVideos.length <= 0) {
            setIsMed(true);
        } else {
            setIsMed(false);
        }
    }, [previewImages, previewVideos]);

    return (
        <>
            <div className="relative top-0 mt-8 origin-top bg-white dark:bg-gray-200 flex flex-col justify-center items-center w-full h-full px-4 shadow-lg rounded-lg">
                <div className="absolute -top-10 rounded-md bg-error-bg px-8 text-white font-sans font-extrabold py-1">
                    <h1 className="text-6xl">
                        Create Event
                    </h1>
                </div>
                <form className="grid grid-cols-6 w-full h-full px-8 py-12 space-x-4">
                    {/* first column */}
                    <div className="col-span-3 w-full space-y-8">
                        <InputField
                            className="w-full"
                            name="title"
                            value={values.title}
                            onChange={handleInputChange}
                            placeholder="Event Title"
                            error={errors.title}
                        />

                        <div className="flex flex-row space-x-2 justify-between">
                            <DatePicker
                                className="w-full"
                                name="startDate"
                                value={values.startDate}
                                onChange={handleInputChange}
                                error={errors.startDate}
                                label={"Start Date"}
                            />
                            <DatePicker
                                className="w-full"
                                name="endDate"
                                value={values.endDate}
                                onChange={handleInputChange}
                                error={errors.endDate}
                                label={"End Date"}
                            />
                            <TimePicker
                                className="w-full"
                                name="time"
                                value={values.time}
                                onChange={handleInputChange}
                                error={errors.time}
                                label={"time"}
                            />
                        </div>

                        <InputField
                            className="w-full"
                            name="venue"
                            value={values.venue}
                            onChange={handleInputChange}
                            placeholder="Event Venue"
                            error={errors.venue}
                        />
                        <InputField
                            className="w-full"
                            name="snippet"
                            value={values.snippet}
                            onChange={handleInputChange}
                            multiline={true}
                            rows={3}
                            maxRows={10}
                            placeholder="Short Description of Event"
                            error={errors.snippet}
                        />
                    </div>

                    {/* second column */}
                    <div className="col-span-3 w-full space-y-6">
                        <InputField
                            className="w-full"
                            name="details"
                            value={values.details}
                            onChange={handleInputChange}
                            multiline={true}
                            rows={5}
                            maxRows={50}
                            placeholder="Event Description"
                            error={errors.details}
                        />
                        {/* image preview after drag and drop or select */}
                        <div className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-md flex flex-col justify-center items-center cursor-pointer relative py-2 px-2">
                            {/* show the default background and content if no media has been loaded */}
                            {
                                isMed &&
                                <div>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} />
                                        <div className="text-gray-700 dark:text-gray-200 hover:text-blue-600 flex flex-row justify-between items-center rounded-md px-4 py-2 w-full">
                                            <div className="bg-gray-300 mx-2 rounded-full">
                                                <IconButton>
                                                    <AddToPhotosOutlinedIcon className="text-blue-600 dark:text-blue-400" fontSize='medium' />
                                                </IconButton>
                                            </div>
                                            <div className="flex flex-col justify-center items-center space-y-1 w-full h-full pt-2">
                                                <p className="font-semibold text-lg capitalize">
                                                    add photos/videos
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
                        {/* <div className="flex flex-col space-y-2 px-4 justify-center">
                            <h3 className="text-center text-lg text-gray-700 dark:text-gray-200">
                                Guest &amp; Host
                            </h3>
                            <div className="flex flex-row space-x-2 justify-bwteen items-center">
                                {
                                    guests && guests.map((guest, index) => (
                                        <div key={index}>
                                            <Avatar
                                                src={guest.profile}
                                                fontSize="medium"
                                            />
                                        </div>
                                    ))
                                }
                                <div onClick={handleGuestPopUp} className="bg-gray-300 mx-2 rounded-full">
                                    <IconButton>
                                        <AddCircleOutlineOutlinedIcon className="text-blue-600 dark:text-blue-400" fontSize='medium' />
                                    </IconButton>
                                </div>
                            </div>
                        </div> */}
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
                    videos={previewVideos}
                    isImg={isImg}
                    isVid={isVid}
                    removeMediaToPost={removeMediaToPost}
                />
            </PopUp>

            {/* pop up  to preview images */}
            {/* <PopUp
                openPopUp={guestPopUp}
                setOpenPopUp={setGuestPopUp}
                title={"Add Event Guest"}
            >
                <GuestForm
                    addGuest={addGuest}
                    setGuestPopUp={setGuestPopUp}
                />
            </PopUp> */}

            {/* for notifications */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}

export default CreateEventForm;

