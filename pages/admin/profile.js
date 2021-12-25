import React from 'react';
import { ProfilePage } from '../../components/components';
import Admin from '../../layout/Admin';

const Profile = () => {
    return (
        <>
            <div className="w-full h-screen">
                <ProfilePage />
            </div>
        </>
    );
}

Profile.layout = Admin;

export default Profile;
