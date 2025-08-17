import React from 'react';
import '../styles/adminnavbar.css';
import '../styles/dashboard.css';
import { AiOutlineProfile } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImg from "../images/logo.png";

function AdminNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, setUserId } = useUser();

    const handleLogout = () => {
        localStorage.removeItem('userSession');
        setUserId(null);
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    console.log("userId in navbar", userId);

    return (
        <div className="navbar-admin">
            <Link to={'/dashboard'}> <div className="logo" > <img src={logoImg} alt="logo" /> </div> </Link>

            <div className="tabs">
                {userId == 'superadmin' ? (
                    <>
                        <Link to={'/super-admin-dashboard'}>
                            <button className={`tab tab1 ${isActive('/super-admin-dashboard')}`}>
                                System Management
                            </button>
                        </Link>
                        <Link to={'/dashboard'}>
                            <button className={`tab tab1 ${isActive('/dashboard')}`}>
                                My Dashboard
                            </button>
                        </Link>
                    </>
                ) : (
                    <Link to={'/dashboard'}>
                        <button className={`tab tab1 ${isActive('/dashboard')}`}>
                            Dashboard
                        </button>
                    </Link>
                )}
                <Link to={'/revenuemgmt'}>
                    <button className={`tab ${isActive('/revenuemgmt')}`}>
                        Revenue Mgmt
                    </button>
                </Link>
                <Link to={'/customermgmt'}>
                    <button className={`tab ${isActive('/customermgmt')}`}>
                        Customer Mgmt
                    </button>
                </Link>
            </div>
            <div className="user-profile">
                <span> Welcome, {userId}</span>
                <div className="user-menu">
                    <img
                        src="https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"
                        className="user-avatar"
                        alt="User Avatar"
                    />
                    <div className="dropdown-menu">
                        <ul>
                            <Link to={'/admin-profile'}>
                                <li className={isActive('/admin-profile')}>
                                    <AiOutlineProfile /> Profile
                                </li>
                            </Link>
                            <Link to={'/settings'}>
                                <li className={isActive('/settings')}>
                                    <CiSettings /> Settings
                                </li>
                            </Link>
                            <li onClick={handleLogout}>
                                <IoIosLogOut /> Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;