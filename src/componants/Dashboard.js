import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Loader from './Loader';

const Dashboard = () => {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [totalReports, setTotalReports] = useState(0);
    const [charges, setCharges] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGenerateReport = () => {
        navigate('/skhfsjfks')
    };
    

    useEffect(() => {
        // Fetch total reports
        axios.get('https://astrobuddy-2wus.onrender.com/reports-generated',
            {
                params: {
                    userId: userId
                }
            }
        )
            .then(resp => {
                setTotalReports(resp.data.totalRecords)
            })
            .catch(err => console.log(err));

        // Fetch admin charges
        axios.get(`https://astrobuddy-2wus.onrender.com/get-admin-charges/${userId}`)
            .then(resp => {
                setCharges(resp.data.charges);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [userId]);

    return (
        <div className="dashboard">
            {/* Navbar */}
            <AdminNavbar/>
           <br />

            {/* Report Generation Section */}
            {loading && <Loader />}
            {(!charges || charges <= 0) && (
                <p className="note">Before generating first report go to setting and set your charges per report, it's imp for revenue mgmt calculations</p>
            )}
            <div className="report-wrapper">
                {/* Generate Report Box */}
                <div className="report-card">
                    <div className="report-title">New Losshu Report</div>
                    <button 
                        className={`generate-btn ${(!charges || charges <= 0) ? 'disabled' : ''}`}
                        onClick={handleGenerateReport}
                        disabled={!charges || charges <= 0}
                    >
                        Generate
                    </button>
                </div>

                {/* Total Reports Box */}
                <div className="report-card">
                    <div className="report-title">Total Reports Generated</div>
                    <div className="report-value">{totalReports}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
