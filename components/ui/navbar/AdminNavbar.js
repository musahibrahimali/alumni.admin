import React, { useEffect } from 'react';
import Link from "next/link";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from '../../../provider/provider';


const AdminNavbar = () => {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [isAuth, setIsAuth] = useState(Cookies.get("user"));
    const dispatch = useDispatch();

    const onSearchChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        const fetchInitialAdmin = async () => {
            const url = "http://localhost:5000/admin/initial";
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                }
            });
            const admin = await response.json();
            if (response.status === 200) {
                dispatch(setUser(admin.admin));
            }
        }
        const handleShowSearch = () => {
            if (search.length > 0) {
                setShowSearch(true);
            } else {
                setShowSearch(false);
            }
        }
        handleShowSearch();
        if (isAuth) {
            fetchInitialAdmin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, isAuth]);

    return (
        <header className="bg-white header navbar_t z-50 dark:bg-gray-900 sticky top-0 w-full py-2 px-4">
            <div className="flex flex-row justify-between items-center">
                <Link href="/admin/dashboard">
                    <a className="text-gray-700 dark:text-gray-200 font-extrabold text-xl md:text-2xl cursor-pointer">
                        Alumni
                    </a>
                </Link>
                <ul className="flex flex-row justify-between space-x-2">
                    <li>
                        <form onSubmit={onSubmit} className="flex items-center max-w-md mx-auto bg-gray-200 rounded-full">
                            <div className="w-full">
                                <input
                                    type="search"
                                    className="w-full bg-transparent px-4 py-1 text-gray-700 rounded-full focus:outline-none"
                                    placeholder="Search"
                                    value={search}
                                    onChange={onSearchChange}
                                />
                            </div>
                            <div>
                                <button
                                    onSubmit={onSubmit}
                                    type="submit"
                                    className={
                                        showSearch ? "flex items-center bg-error-bg justify-center w-12 h-12 text-gray-100 rounded-full" :
                                            "flex items-center bg-gray-800 justify-center w-12 h-12 text-gray-100 rounded-full cursor-not-allowed"
                                    }>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </li>
                    {
                        user &&
                        <li className="bg-transparent hover:bg-gray-200 rounded-full dark:text-gray-200 dark:hover:text-gray-700 px-2 py-1">
                            <Link href="/admin/dashboard">
                                <a className="flex space-x-2 justify-center items-center">
                                    <p>{user?.displayName}</p>
                                    <Avatar
                                        src={user?.image}
                                        fontSize="small"
                                    />
                                </a>
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        </header>
    );
}

export default AdminNavbar;
