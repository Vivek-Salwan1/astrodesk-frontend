import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import '../styles/superadmindashboard.css';
import AdminNavbar from './AdminNavbar';
import Loader from './Loader';

const SuperAdminDashboard = () => {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [totalReports, setTotalReports] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [recentAdmins, setRecentAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch total reports
        axios.get('https://astrobuddy-2wus.onrender.com/reports-generated', {
            params: { userId: 'all' } // Get all reports for super admin
        })
            .then(resp => {
                setTotalReports(resp.data.totalRecords);
            })
            .catch(err => console.log(err));

        // Fetch total admins
        axios.get('https://astrobuddy-2wus.onrender.com/get-total-admins')
            .then(resp => {
                setTotalAdmins(resp.data.totalAdmins);
                setRecentAdmins(resp.data.recentAdmins);
            })
            .catch(err => console.log(err));

        // Fetch total revenue
        axios.get('https://astrobuddy-2wus.onrender.com/get-total-revenue/all')
            .then(resp => {
                setTotalRevenue(resp.data.totalRevenue || 0);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);



    const handleManageAdmins = () => {
        navigate('/manage-admins');
    };



    return (
        <div className="super-admin-dashboard">
            <AdminNavbar />
            <br />

            <div className="dashboard-header">
                <h1>Super Admin Dashboard</h1>
                <p className="welcome-message">Welcome, Super Admin</p>
            </div>


            {loading && <Loader />}
            <div className="dashboard-grid">
                {/* Report Generation Section */}

                {/* Total Admins Card */}

                <div className="dashboard-card dashboard-card-b">
                    <div className="card-content">
                        <div className="card-title">Total Admins</div>
                        <div className="card-value">{totalAdmins}</div>
                    </div>
                    <button className="action-btn" style={{ marginTop: '1rem', width: '100%' }} onClick={handleManageAdmins}>
                        Manage Admins
                    </button>

                </div>
                {/* Total Reports Card */}
                <div className="dashboard-card">
                    <div className="card-title">Total Reports Generated</div>
                    <div className="card-value">{totalReports}</div>
                </div>

                {/* Total Revenue Card */}
                <div className="dashboard-card">
                    <div className="card-title">Total System Revenue</div>
                    <div className="card-value">₹ {totalRevenue.toLocaleString()}</div>
                </div>
                {/* Total Revenue Card */}
                {/* <div className="dashboard-card">
                    
                </div> */}




                {/* System Settings Card */}

            </div>

            {/* Recent Admins Section */}
            <div className="recent-admins-section">
                <h2>Recent Admins</h2>
                <div className="admins-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Admin ID</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAdmins.map((admin, index) => (
                                <tr key={index}>
                                    <td>{admin.userId}</td>
                                    <td>{new Date(admin.joinDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status ${admin.status}`}>
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn" style={{ width: '50%' }} onClick={handleManageAdmins}>
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard; 