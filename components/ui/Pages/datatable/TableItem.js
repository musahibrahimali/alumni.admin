import React from 'react';

const TableItem = (props) => {
    const { table, title } = props;
    return (
        <div>
            <div className="relative flex justify-center items-center origin-top top-0 py-16">
                <div className="absolute w-[600px] max-w-[900px] top-6 rounded-md bg-deep-yellow flex justify-center items-center px-8 py-4 shadow-md text-white font-bold uppercase tracking-widest">
                    <h1 className="text-lg md:text-4xl">
                        {title}
                    </h1>
                </div>
                {table}
            </div>
        </div>
    )
}

export default TableItem;
