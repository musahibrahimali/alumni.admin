import { Avatar, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import {
    CopyRight,
    InputField,
    Notification,
    PopUp,
} from "../../../components";
import PreviewMedia from './PreviewMedia';
import GuestForm from './GuestForm';

const initialValues = {
    eventTitle: "",
    eventSnippet: "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
}

const CreateJobForm = () => {
    const [previewPopUp, setPreviewPopUp] = useState(false);
    const [guestPopUp, setGuestPopUp] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [isImg, setIsImg] = useState(false); // this facilitates the image preview
    const [isVid, setIsVid] = useState(false); // this facilitates the video preview
    const [isMed, setIsMed] = useState(false); // no media available
    const [previewImages, setPreviewImages] = useState([]);
    const [previewVideos, setPreviewVideos] = useState([]);
    const [guests, setGuest] = useState([]); // add guest to event
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    // get theme from redux with useSelector
    const theme = useSelector((state) => state.theme.theme);
    // get user id from redux
    const user = useSelector((state) => state.user.user);
    const userId = user?.userId;

    // instance of formdata
    // const formData = new FormData();

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

    // notify user of successful log in or log out
    const notifyUser = () => {
        setNotify({
            isOpen: true,
            message: "Sign up Successful",
            type: "success"
        });
    }

    // remove the selected image
    const removeContentToPost = () => {
        setPreviewImages([]);
        setPreviewVideos([]);
        setValues(initialValues);
        // // remove files from form data
        // formData.delete("images");
        // formData.delete("videos");
        // formData.delete("values");
    }

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

    const addGuest = (data) => {
        setGuest(prevGuests => [...prevGuests, {
            id: getRandomNumber(),
            firstName: data.firstName,
            lastName: data.lastName,
            position: data.position,
            profile: data.profile,
        }]);
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const resetForm = (event) => {
        event.preventDefault();
        removeContentToPost();
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
    const handlePreview = () => {
        previewMedia();
        setPreviewPopUp(!previewPopUp);
    }

    const handleGuestPopUp = () => {
        console.log(guestPopUp);
        setGuestPopUp(!guestPopUp);
    }

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
            <div className="relative top-0 mt-10 origin-top bg-white dark:bg-gray-900 flex flex-col justify-center items-center w-full h-full px-4 shadow-lg rounded-lg">
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
                            name="eventTitle"
                            placeholder="Event Title"
                        />
                        <InputField
                            className="w-full"
                            name="eventTitle"
                            placeholder="Event Date"
                        />
                        <InputField
                            className="w-full"
                            name="eventTitle"
                            placeholder="Event Time"
                        />
                        <InputField
                            className="w-full"
                            name="eventTitle"
                            placeholder="Event Venue"
                        />
                        <InputField
                            className="w-full"
                            name="eventTitle"
                            multiline={true}
                            rows={3}
                            maxRows={10}
                            placeholder="Short Description of Event"
                        />
                    </div>

                    {/* second column */}
                    <div className="col-span-3 w-full space-y-6">
                        <InputField
                            className="w-full"
                            name="eventTitle"
                            multiline={true}
                            rows={5}
                            maxRows={50}
                            placeholder="Event Description"
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
                        <div className="flex flex-col space-y-2 px-4 justify-center">
                            <h3 className="text-center text-lg">
                                Guest &amp; Host
                            </h3>
                            <div className="flex flex-row justify-bwteen items-center">
                                <Avatar fontSize="medium" />
                                <div onClick={handleGuestPopUp} className="bg-gray-300 mx-2 rounded-full">
                                    <IconButton>
                                        <AddCircleOutlineOutlinedIcon className="text-blue-600 dark:text-blue-400" fontSize='medium' />
                                    </IconButton>
                                </div>
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
                    videos={previewVideos}
                    isImg={isImg}
                    isVid={isVid}
                    removeMediaToPost={removeMediaToPost}
                />
            </PopUp>

            {/* pop up  to preview images */}
            <PopUp
                openPopUp={guestPopUp}
                setOpenPopUp={setGuestPopUp}
                title={"Add Event Guest"}
            >
                <GuestForm
                    addGuest={addGuest}
                    setGuestPopUp={setGuestPopUp}
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

