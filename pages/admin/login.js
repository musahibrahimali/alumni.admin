import React from 'react';
import { LoginPage } from '../../components/components';
import Admin from '../../layout/Admin';

const Login = () => {
    return (
        <>
            <LoginPage />
        </>
    )
}

Login.layout = Admin;

export default Login;
