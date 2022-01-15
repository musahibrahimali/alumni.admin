import React from 'react';
import TableItem from './TableItem';
import AllEventsTable from './events';
import AllJobsTable from './jobs';
import AllBlogsTable from './blogs';
import AllNewsTable from './news';

const DataTablePage = () => {
    return (
        <div className="bg-light-blue px-4 flex-grow">
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

            {/* all news */}
            <TableItem
                title="All News"
                table={<AllNewsTable />}
            />
        </div>
    );
}

export default DataTablePage;
