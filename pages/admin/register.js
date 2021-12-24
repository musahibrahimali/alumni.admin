import React from 'react';
import { RegisterPage } from '../../components/components';
import Admin from '../../layout/Admin';

const Register = () => {
    return (
        <>
            <RegisterPage />
        </>
    )
}

Register.layout = Admin;

export default Register;
