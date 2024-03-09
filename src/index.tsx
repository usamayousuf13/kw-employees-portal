import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";

import './styles/tailwind.css';
import Listing from './components/Listing';
import { APP_NAME } from './constants/constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-500 text-white py-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">{APP_NAME}</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-8">
          <Listing />
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 py-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 {APP_NAME}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);

