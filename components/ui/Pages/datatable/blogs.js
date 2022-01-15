import React, { useEffect, useState } from 'react';
import {
    ActionButton,
    ConfirmDialog,
    InputField,
    Notification,
    PopUp,
    UseTable
} from "../../../components";
import {
    InputAdornment,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import BlogForm from './forms/BlogForm';
import { useQuery } from 'react-query';
import { getBlogs } from '../../../utils/request_helpers';
import moment from 'moment';
import { initialData } from './initialData';

const AllBlogsTable = () => {
    const [openPopUp, setOpenPopUp] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" });
    const [recordsForEdit, setRecordsForEdit] = useState(null);
    const [records, setRecords] = useState(initialData);
    const [filterFn, setFilterFn] = useState({
        fn: items => { return items; }
    });

    const { data, isLoading } = useQuery(
        'blogs',
        getBlogs,
        {
            keepPreviousData: true,
        }
    );


    const headCells = [
        { id: "title", label: "Blog Title" },
        { id: "date", label: "Date" },
        { id: "category", label: "Category" },
        { id: "snippet", label: "Short Description" },
        { id: "actions", label: "Actions", disableSorting: true },
    ];


    const {
        TableContainer,
        TableHeader,
        TablePaging,
        RecordsAfterPagingAndSorting,
    } = UseTable(records, headCells, filterFn);

    const handleSearch = (event) => {
        let target = event.target;
        setFilterFn({
            fn: items => {
                if (target.value === "") {
                    return items;
                } else {
                    return items.filter(item => item.title.toLowerCase().includes(target.value));
                }
            }
        });
    }

    // close pop up
    const handleOpenPopUP = (item) => {
        setOpenPopUp(!openPopUp);
        setRecordsForEdit(item);
    }

    const handleUserClick = (item) => {
        // set the item to open in popup
        handleOpenPopUP(item);
    }

    const onDelete = (id) => {
        setConfirmDialog({
            isOpen: true,
            title: "Are you sure you want to delete entry",
            subTitle: "Entry deleted cannot be restored. You cant undo this operation",
            // onConfirm: () => {handleDelete(id)}
        });
    }

    // handle delete operation
    const handleDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        setRecords(null);
        setNotify({
            isOpen: true,
            message: "Deleted Successfully",
            type: "error"
        })
    }

    useEffect(() => {
        if (data) {
            setRecords(data.data);
        }
    }, [data]);

    return (
        <>
            <div className="bg-white dark:bg-gray-200 shadow-xl rounded-lg">
                <div className="mx-4 px-4 pt-14">
                    <div className="flex">
                        <InputField
                            label="Search"
                            className="w-full"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                        />
                    </div>
                    <TableContainer>
                        <TableHeader />
                        <TableBody>
                            {
                                RecordsAfterPagingAndSorting()?.map((item) => {
                                    const { title, date, category, snippet } = item;
                                    // format date with moment js
                                    const dateFormatted = moment(date).format("DD/MM/YY");
                                    // get the first 60 words of the snippet
                                    const snippetText = snippet?.length > 60 ? snippet?.substring(0, 60) + "..." : snippet;
                                    return (
                                        <TableRow key={date}>
                                            <TableCell>{title}</TableCell>
                                            <TableCell>{dateFormatted}</TableCell>
                                            <TableCell>{category}</TableCell>
                                            <TableCell>{snippetText}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-row justify-between items-center space-x-1">
                                                    {/* edit */}
                                                    <ActionButton
                                                        classes="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                                                        onClick={() => {
                                                            handleUserClick(item);
                                                        }}>
                                                        <RecentActorsIcon className="text-white" fontSize="small" />
                                                    </ActionButton>
                                                    {/* delete */}
                                                    <ActionButton
                                                        classes="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                                                        onClick={
                                                            () => { onDelete(item) }
                                                        }>
                                                        <CloseIcon className="text-white" fontSize="small" />
                                                    </ActionButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </TableContainer>
                    <TablePaging />
                </div>

                {/* pop up form */}
                <PopUp
                    openPopUp={openPopUp}
                    setOpenPopUp={setOpenPopUp}
                    title={"Blog Form"}>
                    <BlogForm
                        recordForEdit={recordsForEdit}
                    />
                </PopUp>

                {/* Action Notification */}
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />

                {/* confirm dialog */}
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </div>
        </>
    )
}

export default AllBlogsTable;
