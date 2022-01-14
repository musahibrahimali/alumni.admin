import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { RegisterPage } from '../../components/components';
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

const Register = (props) => {
    const { cookie } = props;
    const router = useRouter();

    useEffect(() => {
        if (cookie) {
            router.replace('/admin/dashboard');
        }
    });

    return (
        <>
            <RegisterPage />
        </>
    )
}

Register.layout = Admin;

export default Register;
