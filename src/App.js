import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import SignupComponent from './components/SignupComponent';
import {useState} from "react";

function App() {
    const [role, setRole] = useState(null);
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <div className= "container">
                    <Routes>
                        <Route path="/login" element={<LoginComponent setRole={setRole} />} />
                        <Route path="/signup" element={<SignupComponent />} />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/user-dashboard" element={<UserDashboard />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;