import React, { useEffect, useState } from 'react';
import '../styles/revenue.css';
import AdminNavbar from './AdminNavbar';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

const Revenue = () => {
    const {userId} = useUser();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [yearlyRevenue, setYearlyRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [dailyRevenue, setDailyRevenue] = useState(0);

    useEffect(() => {
        if (!userId) return;

        // Fetch total revenue
        axios.get(`https://astrobuddy-2wus.onrender.com/get-total-revenue/${userId}`)
            .then((res) => {
                setTotalRevenue(res.data.totalRevenue || 0);
            })
            .catch((err) => {
                console.error("Error fetching total revenue:", err);
            });

        // Fetch yearly revenue
        axios.get(`https://astrobuddy-2wus.onrender.com/get-yearly-revenue/${userId}`)
            .then((res) => {
                setYearlyRevenue(res.data.yearlyRevenue || 0);
            })
            .catch((err) => {
                console.error("Error fetching yearly revenue:", err);
            });

        // Fetch monthly revenue
        axios.get(`https://astrobuddy-2wus.onrender.com/get-monthly-revenue/${userId}`)
            .then((res) => {
                setMonthlyRevenue(res.data.monthlyRevenue || 0);
            })
            .catch((err) => {
                console.error("Error fetching monthly revenue:", err);
            });

        // Fetch daily revenue
        axios.get(`https://astrobuddy-2wus.onrender.com/get-daily-revenue/${userId}`)
            .then((res) => {
                setDailyRevenue(res.data.dailyRevenue || 0);
            })
            .catch((err) => {
                console.error("Error fetching daily revenue:", err);
            });
    }, [userId]);

    return (
        <div className="revenue-container">
            <AdminNavbar/> <br />
            <h2>Revenue Management</h2>
            <div className="revenue-card">
                <p><strong>Total Revenue Generated:</strong> ₹ {totalRevenue.toLocaleString()}</p>
            </div> <br />

            <div className="revenue-card">
                <p><strong>Total Revenue This Year:</strong> ₹ {yearlyRevenue.toLocaleString()}</p>
            </div><br />

            <div className="revenue-card">
                <p><strong>Total Revenue This Month:</strong> ₹ {monthlyRevenue.toLocaleString()}</p>
            </div><br />

            <div className="revenue-card">
                <p><strong>Total Revenue of Today:</strong> ₹ {dailyRevenue.toLocaleString()}</p>
            </div><br />
        </div>
    );
};

export default Revenue;