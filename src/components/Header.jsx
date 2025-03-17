import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = ({ isAuthenticated, userData }) => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">
              {isAuthenticated ? `Xin chào, ${userData?.fullName || 'Người dùng'}` : 'Chào mừng đến với Mounage'}
            </h1>
            <p className="text-blue-100 mt-1">
              {isAuthenticated ? 'Quản lý thông tin tài khoản của bạn' : 'Đăng nhập để trải nghiệm đầy đủ tính năng'}
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-100" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 