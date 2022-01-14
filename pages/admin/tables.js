import React, { useEffect } from 'react';
import Admin from '../../layout/Admin';
import { AdminNavbar, DataTablePage } from '../../components/components';
import { useRouter } from 'next/router';

export const getServerSideProps = async ({ req }) => {
    let user = false;
    const cookie = req.cookies['access_token'];
    if (cookie !== undefined) {
        user = true;
    }
    return {
        props: { cookie: user },
    }
}

const AllDataTables = (props) => {

    const { cookie } = props;
    const router = useRouter();

    useEffect(() => {
        if (!cookie) {
            router.replace('/admin/login');
        }
    });

    return (
        <>
            <AdminNavbar cookie={cookie} />
            <DataTablePage />
        </>
    );
}

AllDataTables.layout = Admin;

export default AllDataTables;
