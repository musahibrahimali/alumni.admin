import React from 'react';
import { ProfilePage } from '../../components/components';
import Admin from '../../layout/Admin';

const Profile = () => {
    return (
        <>
            <ProfilePage />
        </>
    );
}

Profile.layout = Admin;

export default Profile;
