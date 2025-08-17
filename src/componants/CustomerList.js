import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/customerlist.css'
import AdminNavbar from './AdminNavbar';
import { useUser } from '../contexts/UserContext';


const CustomerList = () => {
    const { userId } = useUser(); // Get userId from context
    const [customers, setCustomers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        axios.get('https://astrobuddy-2wus.onrender.com/customers', {
            params: { userId },
        })
            .then(res => {
                setCustomers(res.data);
                setFiltered(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching customers:', err);
                setLoading(false);
            });
    }, [userId]);



    useEffect(() => {
        let temp = [...customers];

        if (search) {
            temp = temp.filter(cust =>
                cust.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filter) {
            temp = temp.filter(cust => cust.dob.startsWith(filter)); // You can change to filter by year/month
        }

        setFiltered(temp);
    }, [search, filter, customers]);

    return (
        <div className="customerlist">
            <AdminNavbar />
      <br />
            <div className="top-bar">
                <h2>Total Customers: {filtered.length}</h2>
                <input
                    type="text"
                    placeholder="Search customer by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="">All Dates</option>
                    <option value="2025-05">May 2025</option>
                    <option value="2025-04">April 2025</option>
                    {/* Add more as needed */}
                </select>
            </div>

            <div className="table-wrapper">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Sr</th>
                                <th>Customer Name</th>
                                <th>DOB</th>
                                <th>Mobile No</th>
                                <th>Amt.</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((cust, idx) => (
                                <tr key={cust._id}>
                                    <td>{idx + 1}</td>
                                    <td>{cust.name}</td>
                                    <td>{cust.dob}</td>
                                    <td>{cust.mobileno || '-'}</td>
                                    <td>{cust.amount || '-'}</td>
                                    <td>{new Date(cust.date).toISOString().split('T')[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CustomerList;
