import React, { useContext } from 'react';
import '../styles/adminprofile.css';
import { useUser } from '../contexts/UserContext';
import AdminNavbar from './AdminNavbar';

const AdminProfile = () => {
    const { userId } = useUser();

    // Example hardcoded admin data (you can fetch this from the backend using userId)
    const adminData = {
        name: 'Abhishek jangam',
        address: 'Satara, Maharashtra',
        phone: '+91 9637519217',
        username: 'abhishek17',
    };

    return (
        <div className='admin-profile-main'>
            <AdminNavbar />
            <h2>Admin Profile</h2>
            <div className="admin-profile-container">
                
                <div className="admin-info">
                    <div><strong>Name:</strong> {adminData.name}</div>
                    <div><strong>Address:</strong> {adminData.address}</div>
                    <div><strong>Phone:</strong> {adminData.phone}</div>
                    <div><strong>Username:</strong> {adminData.username}</div>
                    <div><strong>Password:</strong> {adminData.password}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
