import React, { useState, useEffect } from 'react';
import '../styles/settings.css';
import AdminNavbar from './AdminNavbar';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import Loader from './Loader';

const Settings = () => {
  const [charges, setCharges] = useState('');
  const [currentCharges, setCurrentCharges] = useState(null);
  const { userId } = useUser();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch current charges
    axios.get(`https://astrobuddy-2wus.onrender.com/get-admin-charges/${userId}`)
      .then(resp => {
        setCurrentCharges(resp.data.charges);
        if (resp.data.charges > 0) {
          setCharges(resp.data.charges.toString());
        }
      })
      .catch(err => console.log('error fetching charges', err))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Charges:', charges);

    axios.post('https://astrobuddy-2wus.onrender.com/set-charges', { charges, userId })
    .then(resp => {
      if(resp.data.message === 'Charges updated successfully'){
        console.log('charges set successfully');
        setCurrentCharges(Number(charges));
      } else {
        console.log('charges not set');
      }
    })
    .catch(err => console.log('error setting charges', err));
  };

  return (
    <div className="settings-page">
      <AdminNavbar />

      <div className="settings-container">
        {loading && <Loader />}
        <h2>Settings</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="charges">Set Charges per Report</label>
          <input
            type="number"
            id="charges"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            placeholder="Enter amount in ₹"
            required
            disabled={currentCharges > 0}
          />
          {currentCharges > 0 ? (
            <p className="charges-info">Current charges: ₹{currentCharges}</p>
          ) : (
            <button type="submit">Save</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
