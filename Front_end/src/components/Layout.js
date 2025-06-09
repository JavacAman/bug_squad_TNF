import React from 'react';
import { Link } from 'react-router-dom'; 
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-44 bg-blue-500 shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold">Taylor & Francis Group</h1>
          <hr></hr>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <Link to="/" className="text-black font-bold text-base hover:text-black-800 ml-[40px]">Licenses</Link> 
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
