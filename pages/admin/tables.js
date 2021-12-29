import React from 'react';
import Admin from '../../layout/Admin';
import { DataTablePage } from '../../components/components';

const AllDataTables = () => {

    return (
        <>
            <DataTablePage />
        </>
    );
}

AllDataTables.layout = Admin;

export default AllDataTables;
