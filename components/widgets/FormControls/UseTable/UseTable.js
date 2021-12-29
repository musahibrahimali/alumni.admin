import React, { useState } from 'react';
// import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { UseTableStyles } from './UseTableStyles';

const UseTable = (records, headCells, filterFn) => {

    const styles = UseTableStyles();

    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const handleSortRequest = (cellId) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId);
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const TablePaging = () => {
        return (
            <TablePagination
                component='div'
                count={records.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={pages}
            />
        );
    }

    const TableContainer = (props) => (
        <Table className={styles.table}>
            {props.children}
        </Table>
    );

    const TableHeader = () => {
        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map((headCell) => (
                            <TableCell key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}>
                                {
                                    headCell["disableSorting"]
                                        ? headCell.label :
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={
                                                orderBy === headCell.id ? order : 'asc'
                                            }
                                            onClick={
                                                () => { handleSortRequest(headCell.id) }
                                            }>
                                            {headCell.label}
                                        </TableSortLabel>
                                }
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        );
    };

    const StableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    // records after all sorting and paging is done
    const RecordsAfterPagingAndSorting = () => {
        return StableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }


    return {
        TableContainer,
        TableHeader,
        TablePaging,
        RecordsAfterPagingAndSorting,
    }
}

export default UseTable;
