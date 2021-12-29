import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CreatePage } from '../../components/components';
import Admin from '../../layout/Admin';

const Create = () => {
    const user = useSelector((state) => state.user.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/admin/login');
        }
    });

    return (
        <>
            <CreatePage />
        </>
    );
}

Create.layout = Admin;

export default Create;
