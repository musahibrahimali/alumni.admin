import React from 'react';
import Link from 'next/link';

const SideBarItem = (props) => {
    const { url, icon, title } = props;
    return (
        <div>
            <li className="bg-transparent w-[250px] text-gray-50 border border-gray-100 dark:text-gray-200 font-sans font-bold tracking-widest text-lg md:text-xl py-2 px-8 rounded hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-gray-700">
                <Link href={url}>
                    <a className="flex items-center space-x-2">
                        {icon}
                        <h2>{title}</h2>
                    </a>
                </Link>
            </li>
        </div>
    );
}

export default SideBarItem;
