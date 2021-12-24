import React from 'react';
import Admin from '../../layout/Admin';
import { ForgotPasswordPage } from '../../components/components';

const ForgotPassword = () => {
    return (
        <>
            <ForgotPasswordPage />
        </>
    );
}

ForgotPassword.layout = Admin;

export default ForgotPassword;
