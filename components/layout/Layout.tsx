import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-grow p-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
