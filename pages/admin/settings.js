import React from 'react';
import { SettingsForm } from '../../components/components';
import Admin from '../../layout/Admin';

const Settings = () => {
    return (
        <>
            <div className="h-screen w-full">
                <SettingsForm />
            </div>
        </>
    );
}

Settings.layout = Admin;

export default Settings;
