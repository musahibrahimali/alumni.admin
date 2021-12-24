import React from 'react';
import Admin from '../../layout/Admin';
import { ErrorPage } from '../../components/components';

const PageNotFound = () => {

    return (
        <>
            <ErrorPage />
        </>
    )
}

PageNotFound.layout = Admin;

export default PageNotFound;
