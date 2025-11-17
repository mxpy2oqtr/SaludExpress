import React from 'react';
import Header from './Header';

const MainLayout = ({ children }) => (
  <div className="bg-gray-100 min-h-screen">
    <Header />
    <main className="container mx-auto px-6 py-8">
      {children}
    </main>
  </div>
);

export default MainLayout;
