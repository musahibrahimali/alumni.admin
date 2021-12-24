import React from 'react';
import AllBloggersTable from './bloggers';
import TableItem from './TableItem';
import AllEventsTable from './events';
import AllJobsTable from './jobs';
import AllBlogsTable from './blogs';

const DataTablePage = () => {
    return (
        <div className="bg-light-blue px-4 flex-grow">
            {/* all bloggers */}
            <TableItem
                title="All Bloggers"
                table={<AllBloggersTable />}
            />
            {/* all blogs */}
            <TableItem
                title="All Blogs"
                table={<AllBlogsTable />}
            />
            {/* all events */}
            <TableItem
                title="All Events"
                table={<AllEventsTable />}
            />
            {/* all jobs */}
            <TableItem
                title="All Jobs"
                table={<AllJobsTable />}
            />
        </div>
    );
}

export default DataTablePage;
