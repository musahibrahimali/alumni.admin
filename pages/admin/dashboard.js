import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DashboardPage } from '../../components/components';
import Admin from '../../layout/Admin';

const DashBoard = () => {
    const user = useSelector((state) => state.user.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/admin/login');
        }
    });

    return (
        <>
            <DashboardPage />
        </>
    );
}

DashBoard.layout = Admin;

export default DashBoard;
