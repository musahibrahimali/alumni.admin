import React from 'react';
import { SettingsForm } from '../../components/components';
import Admin from '../../layout/Admin';

const Settings = () => {
    return (
        <>
            <SettingsForm />
        </>
    );
}

Settings.layout = Admin;

export default Settings;
