import React from 'react';

const BarSkeleton = () => {
    return (
        <>
            <div className="border border-gray-200 shadow-md p-4 max-w-6xl w-full mx-auto space-y-2">
                <div className="animate-pulse flex space-x-4 w-full">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse flex space-x-4 w-full">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse flex space-x-4 w-full">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BarSkeleton;
