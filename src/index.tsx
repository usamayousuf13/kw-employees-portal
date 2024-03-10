import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import './styles/tailwind.css';

import Listing from './components/Listing';
import UserProfile from './components/UserProfile';
import { APP_NAME } from './constants/constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const UserProfileRoute = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  if (!userId) {
      navigate('/');
      return null;
  }
  return <UserProfile userData={userId} />;
};
root.render(
  <Router>
    <React.StrictMode>
      <ThemeProvider>

        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-500 text-white py-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">{APP_NAME}</h1>
            </div>
          </header>

          <main className="container mx-auto py-8">
            <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/user-profile/:userId" element={<UserProfileRoute />} />
            </Routes>
          </main>

          <footer className="bg-gray-200 py-4 mt-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 {APP_NAME}. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </React.StrictMode>
  </Router>
);

