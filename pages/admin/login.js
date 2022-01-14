import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { LoginPage } from '../../components/components';
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

const Login = (props) => {
    const { cookie } = props;
    const router = useRouter();

    useEffect(() => {
        if (cookie) {
            router.replace('/admin/dashboard');
        }
    });

    return (
        <>
            <LoginPage />
        </>
    )
}

Login.layout = Admin;

export default Login;
