import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { PlanRoutePage } from './pages/PlanRoutePage';
import { SafetyInsightsPage } from './pages/SafetyInsightsPage';
import { RiskHistoryPage } from './pages/RiskHistoryPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col selection:bg-cyber-cyan/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/plan-route" element={<PlanRoutePage />} />
            <Route path="/insights" element={<SafetyInsightsPage />} />
            <Route path="/history" element={<RiskHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
