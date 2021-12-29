import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import BarChart from './BarChart';
import LineSkeleton from './skeleton/LineSkeleton';
import BarSkeleton from './skeleton/BarSkeleton';
import DoughnutSkeleton from './skeleton/DoughnutSkeleton';

// Data generation
const getRandomArray = (numItems) => {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for (var i = 0; i < numItems; i++) {
        data.push({
            label: names[i],
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

const getRandomDateArray = (numItems) => {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2021-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for (var i = 0; i < numItems; i++) {
        data.push({
            time: new Date(baseTime + i * dayMs),
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

const getData = () => {
    let data = [];

    data.push({
        title: 'Visits',
        data: getRandomDateArray(150)
    });

    data.push({
        title: 'Categories',
        data: getRandomArray(20)
    });

    data.push({
        title: 'Categories',
        data: getRandomArray(10)
    });

    data.push({
        title: 'Data 4',
        data: getRandomArray(6)
    });

    return data;
}

const DashboardPage = () => {
    const [data, setData] = useState(getData());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setInterval(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-400 h-full w-full py-12">
            <div className="main chart-wrapper">
                {
                    !isLoading ?
                        <LineChart
                            data={data[0]?.data}
                            title={data[0]?.title}
                            color="#3E517A"
                        /> :
                        <LineSkeleton />
                }
            </div>
            <div className="sub chart-wrapper">
                {
                    !isLoading ?
                        <BarChart
                            data={data[1]?.data}
                            title={data[1]?.title}
                            color="#70CAD1"
                        /> :
                        <BarSkeleton />
                }
            </div>
            <div className="sub chart-wrapper">
                {
                    !isLoading ?
                        <BarChart
                            data={data[2]?.data}
                            title={data[2]?.title}
                            color="#B08EA2"
                        /> :
                        <BarSkeleton />
                }
            </div>
            <div className="sub chart-wrapper">
                {
                    !isLoading ?
                        <DoughnutChart
                            data={data[3]?.data}
                            title={data[3]?.title}
                            colors={['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']}
                        /> : <DoughnutSkeleton />
                }
            </div>
        </div>
    );
}

export default DashboardPage;
