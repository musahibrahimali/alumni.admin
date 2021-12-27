import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from 'next/image';
const PreviewMedia = (data) => {
    const { images, videos, isImg, isVid, removeMediaToPost } = data;
    const [isMedia, setIsMedia] = useState(false);

    useEffect(() => {
        if (images?.length <= 0 || videos?.length <= 0) {
            setIsMedia(false);
        } else {
            setIsMedia(true);
        }
    }, [images, videos]);

    return (
        <div>
            {/* image preview after drag and drop or select */}
            <div className="bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-md flex flex-col justify-center items-center w-full h-full max-h-[800px] cursor-pointer relative py-2 px-2">
                <div className="absolute top-1 origin-top-right right-1 bg-gray-200 rounded-full z-40">
                    <IconButton onClick={removeMediaToPost}>
                        <CloseOutlinedIcon className="text-gray-700" fontSize='medium' />
                    </IconButton>
                </div>

                <div className=" px-8 py-12 flex justify-center items-center text-gray-700 dark:text-gray-200">
                    <h2>
                        {!isMedia ? "" : ""}
                    </h2>
                </div>

                {/* show image or images */}
                {
                    isImg &&
                    <div>
                        <div className="">
                            {
                                isImg && images.length === 1 ?
                                    <Image
                                        className='h-auto max-w-[800px] w-full'
                                        src={images[0].value}
                                        height={500}
                                        width={500}
                                        objectFit="contain"
                                        alt='image'
                                    /> :
                                    <div className="grid grid-cols-2 gap-2">
                                        {
                                            isImg && images.map((image) => {
                                                return (
                                                    <div key={image.id} className="w-full h-full">
                                                        <Image
                                                            className='h-auto max-w-[800px] w-full' alt='image'
                                                            src={image.value}
                                                            height={500}
                                                            width={500}
                                                            objectFit="contain"
                                                        />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                }

                {/* show video or videos */}
                {
                    isVid && videos.length === 1 ?
                        <video
                            className='h-auto max-w-[800px] w-full'
                            src={videos[0].value}
                            controls
                        /> :
                        <div className="grid grid-cols-2 gap-2">
                            {
                                isVid && videos.map((video) => {
                                    return (
                                        <div key={video.value} className="w-full h-full">
                                            <video
                                                className='h-auto max-w-[800px] w-full' alt='video'
                                                src={video.value}
                                                controls
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default PreviewMedia;