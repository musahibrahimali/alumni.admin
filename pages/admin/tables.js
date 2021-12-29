import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Admin from '../../layout/Admin';
import { DataTablePage } from '../../components/components';
import { useSelector } from 'react-redux';

const AllDataTables = () => {
    const user = useSelector((state) => state.user.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/admin/login');
        }
    });

    return (
        <>
            <DataTablePage />
        </>
    );
}

AllDataTables.layout = Admin;

export default AllDataTables;
