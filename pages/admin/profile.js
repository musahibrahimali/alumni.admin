import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AdminNavbar, ProfilePage } from '../../components/components';
import Admin from '../../layout/Admin';

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

const Profile = (props) => {
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
            <ProfilePage />
        </>
    );
}

Profile.layout = Admin;

export default Profile;
