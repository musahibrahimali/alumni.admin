import React from 'react';
import Admin from '../../layout/Admin';
import { DataTablePage } from '../../components/components';

const AllDataTables = () => {
    return (
        <div>
            <DataTablePage />
        </div>
    );
}

AllDataTables.layout = Admin;

export default AllDataTables;
