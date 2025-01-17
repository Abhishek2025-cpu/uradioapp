// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequestsDashboard from './pages/RequestsDashboard';
import ApprovedRequestsDashboard from './pages/ApprovedRequestsDashboard';

const App = () => {
  return (
   
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Dashboard/>}
            
          />
            <Route
            path="/RequestsDashboard"
            element={<RequestsDashboard/>}
            
          />
          <Route path='/ApprovedRequestsDashboard' element={<ApprovedRequestsDashboard/>}/>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    
  );
};

export default App;
