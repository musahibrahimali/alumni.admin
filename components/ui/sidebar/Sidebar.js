import React, { useState } from 'react';
import SideBarItem from './SideBarItem';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../provider/provider';
import { Notification } from '../../components';
import { useRouter } from 'next/router';
import axios from 'axios';

const Sidebar = () => {
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" }); // notification
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const router = useRouter();

    // handle log out
    const handleLogOut = async () => {
        await axios({
            url: "http://localhost:5000/admin/logout",
            method: "GET",
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }).then(() => {
            dispatch(setUser(null));
            setNotify({ isOpen: true, message: "log out successfull", type: "error" });
            router.reload(window.location.pathname);
        }).catch(error => console.log(error));
    }

    return (
        <>
            <div className="bg-error-bg w-full px-4 h-full py-2 pt-8">
                <ul className="flex flex-col w-full justify-between items-center space-y-4">
                    <SideBarItem
                        url="/admin/dashboard"
                        title="Dashboard"
                        icon={
                            <DashboardOutlinedIcon
                                fontSize='medium'
                            />
                        }
                    />
                    <SideBarItem
                        url="/admin/tables"
                        title="Data Table"
                        icon={
                            <TocOutlinedIcon
                                fontSize='medium'
                            />
                        }
                    />
                    <SideBarItem
                        url="/admin/create"
                        title="Create Data"
                        icon={
                            <CreateNewFolderOutlinedIcon
                                fontSize='medium'
                            />
                        }
                    />
                    <SideBarItem
                        url="/admin/profile"
                        title="Profile"
                        icon={
                            <AccountCircleOutlinedIcon
                                fontSize='medium'
                            />
                        }
                    />
                    <SideBarItem
                        url="/admin/settings"
                        title="Settings"
                        icon={
                            <SettingsOutlinedIcon
                                fontSize='medium'
                            />
                        }
                    />
                    <SideBarItem
                        url="/admin/login"
                        title="Log In"
                        icon={
                            <FingerprintOutlinedIcon
                                fontSize='medium'
                            />
                        }
                    />
                    <SideBarItem
                        url="/admin/register"
                        title="Register"
                        icon={
                            <AppRegistrationOutlinedIcon
                                fontSize='medium'
                            />
                        }
                    />
                    {
                        user &&
                        <div onClick={handleLogOut} className="bg-transparent w-[250px] text-gray-50 border border-gray-100 dark:text-gray-200 font-sans font-bold tracking-widest text-lg md:text-xl py-2 px-8 rounded hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-100 dark:hover:text-gray-700 cursor-pointer">
                            <LogoutIcon fontSize='medium' />
                            <button className="mx-4 font-extrabold tracking-widest">
                                Logout
                            </button>
                        </div>
                    }
                </ul>
                <div className="flex py-44 justify-center items-center place-items-end">
                    <div className="bg-white px-8 py-2 text-gray-700  dark:bg-gray-900 shadow-md dark:text-gray-100">
                        <p className="text-sm">
                            copyright {new Date().getFullYear()} Alumni
                        </p>
                    </div>
                </div>
            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}

export default Sidebar;
