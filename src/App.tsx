import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import AlumniListPage from './pages/AlumniListPage';
import AlumniDetailPage from './pages/AlumniDetailPage';
import ConnectionsPage from './pages/ConnectionsPage';
import EventsPage from './pages/EventsPage';
import AdminPage from './pages/AdminPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import MockCredentialsPage from './pages/MockCredentialsPage';
import CompanyProcessesPage from './pages/CompanyProcessesPage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const { checkSession } = useAuthStore();
  
  useEffect(() => {
    // Check for existing session on app load
    checkSession();
  }, [checkSession]);
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mock-login" element={<MockCredentialsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile-setup" element={<ProfileSetupPage />} />
            <Route path="/alumni" element={<AlumniListPage />} />
            <Route path="/alumni/:id" element={<AlumniDetailPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/company-processes" element={<CompanyProcessesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;