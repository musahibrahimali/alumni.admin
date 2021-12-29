import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { SettingsForm } from '../../components/components';
import Admin from '../../layout/Admin';

const Settings = () => {
    const user = useSelector((state) => state.user.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/admin/login');
        }
    });
    return (
        <>
            <SettingsForm />
        </>
    );
}

Settings.layout = Admin;

export default Settings;
