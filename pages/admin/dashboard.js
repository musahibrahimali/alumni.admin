import React from 'react';
import { DashboardPage } from '../../components/components';
import Admin from '../../layout/Admin';

const DashBoard = () => {
    return (
        <>
            <DashboardPage />
        </>
    );
}

DashBoard.layout = Admin;

export default DashBoard;
