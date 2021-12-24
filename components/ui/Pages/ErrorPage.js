import React from 'react';
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <>
            <div className="flex h-full w-full bg-error-bg px-4 py-24 flex-col justify-center items-center">
                <div className='w-full h-full bg-transparent flex flex-col items-center justify-center'>
                    <h1 className='error-text font-sans text-white border-gray-400'>
                        404
                    </h1>
                    <p className="text-white font-sans pb-8 md:text-4xl">
                        You seem lost.
                    </p>
                    <Link href="/admin/dashboard">
                        <a className="px-8 py-2 border border-gray-100 font-sans text-white bg-transparent hover:bg-white hover:text-error-bg">
                            Go Back to Dashboard
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;
