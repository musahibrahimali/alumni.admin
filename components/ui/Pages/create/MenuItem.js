import React, { useState } from 'react';

const CreateMenuItem = (props) => {
    const { title, icon, isActive } = props;
    return (
        <>
            <button
                className={
                    isActive ?
                        "flex items-center h-10 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none transform transition-all ease-in-out duration-500 outline-none" :
                        "flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 transform transition-all ease-in-out duration-500 outline-none"
                }>
                {icon}
                <span className="mx-1 text-sm sm:text-base">
                    {title}
                </span>
            </button>
        </>
    )
}

export default CreateMenuItem;
