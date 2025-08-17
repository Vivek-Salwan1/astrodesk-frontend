import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import App from './App';
import Home from './componants/Home';
import Dashboard from './componants/Dashboard';
import { UserProvider } from './contexts/UserContext';
import CustomerList from './componants/CustomerList';
import Settings from './componants/Settings';
import Revenue from './componants/Revenue';
import AdminProfile from './componants/AdminProfile';
import SuperAdminLogin from './componants/SuperAdminLogin';
import SuperAdminDashboard from './componants/SuperAdminDashboard';
import AdminManagement from './componants/AdminManagement';
import ProtectedRoutes from './ProtectedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/super-admin-login' element={<SuperAdminLogin/>}></Route>

    <Route path='/skhfsjfks' element={ <ProtectedRoutes> <App />  </ProtectedRoutes>  } />
    <Route path='/dashboard' element={ <ProtectedRoutes> <Dashboard />  </ProtectedRoutes>  } />
    <Route path='/super-admin-dashboard' element={ <ProtectedRoutes> <SuperAdminDashboard />  </ProtectedRoutes>  } />
    <Route path='/manage-admins' element={ <ProtectedRoutes> <AdminManagement />  </ProtectedRoutes>  } />
    <Route path='/customermgmt' element={ <ProtectedRoutes> <CustomerList />  </ProtectedRoutes>  } />
    <Route path='/revenuemgmt' element={ <ProtectedRoutes> <Revenue />  </ProtectedRoutes>  } />
    <Route path='/settings' element={ <ProtectedRoutes> <Settings />  </ProtectedRoutes>  } />
    <Route path='/admin-profile' element={ <ProtectedRoutes> <AdminProfile />  </ProtectedRoutes>  } />


    </Routes>
    </BrowserRouter>
    </UserProvider>

  </React.StrictMode>
);
