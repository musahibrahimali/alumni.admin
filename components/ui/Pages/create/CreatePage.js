import React, { useState } from 'react';
import CreateEventForm from './CreateEvent';
import CreateMenuItem from './MenuItem';
import CreateJobForm from './CreateJob';
import RegisterBlogger from './RegisterBlogger';

const CreatePage = () => {
    const [isEventActive, setIsEventActive] = useState(true);
    const [isJobActive, setIsJobActive] = useState(false);
    const [isBloggerActive, setIsBloggerActive] = useState(false);

    // event is active
    const handleEventActive = () => {
        setIsEventActive(true);
        setIsJobActive(false);
        setIsBloggerActive(false);
    }
    // job is active
    const handleJobActive = () => {
        setIsEventActive(false);
        setIsJobActive(true);
        setIsBloggerActive(false);
    }
    // event is active
    const handleBloggerActive = () => {
        setIsEventActive(false);
        setIsJobActive(false);
        setIsBloggerActive(true);
    }

    return (
        <>
            <div className="flex justify-center items-center border-b border-gray-200 dark:border-gray-700">
                {/* event */}
                <div onClick={handleEventActive}>
                    <CreateMenuItem
                        isActive={isEventActive}
                        title={"Event"}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                        }
                    />
                </div>

                {/* Job */}
                <div onClick={handleJobActive}>
                    <CreateMenuItem
                        isActive={isJobActive}
                        title={"Job"}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        }
                    />
                </div>

                {/* Blogger */}
                <div onClick={handleBloggerActive}>
                    <CreateMenuItem
                        isActive={isBloggerActive}
                        title={"Blogger"}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        }
                    />
                </div>
            </div>

            {/* body */}
            <div className="bg-snowy-mountain h-full w-full flex justify-center items-center px-8 py-8">
                {
                    isEventActive &&
                    <div>
                        <CreateEventForm />
                    </div>
                }
                {
                    isJobActive &&
                    <div>
                        <CreateJobForm />
                    </div>
                }
                {
                    isBloggerActive &&
                    <div>
                        <RegisterBlogger />
                    </div>
                }
            </div>
        </>
    );
}

export default CreatePage;
