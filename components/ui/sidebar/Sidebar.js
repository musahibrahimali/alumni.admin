import React from 'react';
import SideBarItem from './SideBarItem';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

const Sidebar = () => {

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
                </ul>
                <div className="flex py-56 justify-center items-center place-items-end">
                    <div className="bg-white px-8 py-2 text-gray-700  dark:bg-gray-900 shadow-md dark:text-gray-100">
                        <p className="text-sm">
                            copyright {new Date().getFullYear()} Alumni
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
