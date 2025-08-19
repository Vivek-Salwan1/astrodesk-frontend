import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/adminmanagement.css';
import AdminNavbar from './AdminNavbar';
import Loader from './Loader';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAdmin, setNewAdmin] = useState({ userId: '', password: '' });
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            // Fetch all admins
            const adminsResponse = await axios.get('https://astrobuddy-2wus.onrender.com/get-all-admins');
            const adminsData = adminsResponse.data.admins;

            // Fetch additional data for each admin
            const adminsWithDetails = await Promise.all(
                adminsData.map(async (admin) => {
                    // Get total reports for this admin
                    const reportsResponse = await axios.get('https://astrobuddy-2wus.onrender.com/reports-generated', {
                        params: { userId: admin.userId }
                    });

                    // Get total revenue for this admin
                    const revenueResponse = await axios.get(`https://astrobuddy-2wus.onrender.com/get-total-revenue/${admin.userId}`);

                    return {
                        ...admin,
                        totalReports: reportsResponse.data.totalRecords,
                        totalRevenue: revenueResponse.data.totalRevenue || 0
                    };
                })
            );

            setAdmins(adminsWithDetails);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching admin data:', err);
            setError('Failed to load admin data');
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/super-admin-dashboard');
    };

    const handleDeactivate = async (adminId) => {
        if (window.confirm(`Are you sure you want to suspend admin ${adminId}?`)) {
            try {
                const response = await axios.post('https://astrobuddy-2wus.onrender.com/deactivate-admin', { userId: adminId });
                if (response.data.message === "Admin deactivated successfully") {
                    // Update local state immediately
                    setAdmins(prevAdmins => 
                        prevAdmins.map(admin => 
                            admin.userId === adminId 
                                ? { ...admin, status: 'suspended' }
                                : admin
                        )
                    );
                    // Show success message
                    alert(`Admin ${adminId} has been suspended successfully`);
                } else {
                    setError('Failed to suspend admin');
                }
            } catch (err) {
                console.error('Error deactivating admin:', err);
                setError('Failed to suspend admin: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setFormError('');

        try {
            const response = await axios.post('https://astrobuddy-2wus.onrender.com/create-admin', newAdmin);
            if (response.data.message === "Admin created successfully") {
                setShowAddForm(false);
                setNewAdmin({ userId: '', password: '' });
                fetchAdminData(); // Refresh the admin list
            }
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to create admin');
        }
    };

    if (loading) {
        return (
            <div className="admin-management">
                <AdminNavbar />
                <div className="loading">Loading admin data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-management">
                <AdminNavbar />
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="admin-management">
            <AdminNavbar />
            <div className="management-container">
                <div className="header-section">
                    <h1>Admin Management</h1>
                    <div className="header-buttons">
                        <button className="add-btn" onClick={() => setShowAddForm(true)}>
                            Add New Admin
                        </button>
                        <button className="back-btn" onClick={handleBack}>Back to Dashboard</button>
                    </div>
                </div>

                {showAddForm && (
                    <div className="add-admin-form">
                        <h2>Add New Admin</h2>
                        <form onSubmit={handleAddAdmin}>
                            <div className="form-group">
                                <label htmlFor="userId">Admin ID:</label>
                                <input
                                    type="text"
                                    id="userId"
                                    value={newAdmin.userId}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, userId: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    required
                                />
                            </div>
                            {formError && <p className="error-message">{formError}</p>}
                            <div className="form-buttons">
                                <button type="submit" className="submit-btn">Create Admin</button>
                                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading && <Loader />}
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Admin Name</th>
                                <th>Admin ID</th>
                                <th>Password</th>
                                <th>Total Reports</th>
                                <th>Join Date</th>
                                <th>Total Revenue</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin.userId}>
                                    <td>{admin.userId}</td>
                                    <td>{admin.userId}</td>
                                    <td>{admin.password}</td>
                                    <td>{admin.totalReports}</td>
                                    <td>{new Date(admin.joinDate).toLocaleDateString()}</td>
                                    <td>₹ {admin.totalRevenue.toLocaleString()}</td>
                                    <td>
                                        <span className={`status ${admin.status || 'active'}`}>
                                            {admin.status || 'active'}
                                        </span>
                                    </td>
                                    <td>
                                        {admin.status !== 'suspended' && (
                                            <button 
                                                className="action-btn-small deactivate"
                                                onClick={() => handleDeactivate(admin.userId)}
                                            >
                                                Suspend Admin
                                            </button>
                                        )}
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

export default AdminManagement; 