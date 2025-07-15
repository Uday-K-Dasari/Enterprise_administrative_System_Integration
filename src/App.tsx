import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/auth/Login';
import { Dashboard } from './components/dashboard/Dashboard';
import { HRModule } from './components/modules/HRModule';
import { FinanceModule } from './components/modules/FinanceModule';
import { StudentModule } from './components/modules/StudentModule';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/hr" element={
              <ProtectedRoute allowedRoles={['admin', 'hr_manager']}>
                <Layout>
                  <HRModule />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/finance" element={
              <ProtectedRoute allowedRoles={['admin', 'finance_manager']}>
                <Layout>
                  <FinanceModule />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/students" element={
              <ProtectedRoute allowedRoles={['admin', 'academic_manager']}>
                <Layout>
                  <StudentModule />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;