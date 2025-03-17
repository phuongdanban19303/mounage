import React, { useState, useContext } from "react";
import { FaUser, FaEdit, FaSignOutAlt, FaUserCircle, FaCalendarAlt, FaUserTag, FaInfoCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbarmenu from "../component/Navbar";
import Header from "../component/Header";

const Login = () => {
  const { login, isAuthenticated, usersuccessful, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "admin",
    password: "123456",
  });

  const handleLogout = () => {
    logout();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-[1549px] h-[1618px]">
      <div className="w-[210px]">
        <Navbarmenu />
      </div>
      <div className="flex-1 bg-[#F9FAFB]">
        <div className="w-[1320px]">
          <Header />
        </div>
        <main className="p-8">
          {isAuthenticated ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-blue-600 p-6 text-white">
                  <div className="flex items-center space-x-4">
                    <div className=" flex items-center justify-center object-cover">
                    <img className="w-20 h-20 rounded-full" src={usersuccessful?.avatar ? usersuccessful?.avatar:"https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"} alt={`anh${usersuccessful?._id}`} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{usersuccessful?.fullName}</h1>
                      <p className="text-blue-100">{usersuccessful?.username}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <FaUser className="text-blue-600" />
                          <h2 className="text-lg font-semibold text-gray-800">Thông tin cá nhân</h2>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-600">Tên đăng nhập</label>
                            <p className="text-gray-800 font-medium">{usersuccessful?.username}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Họ và tên</label>
                            <p className="text-gray-800 font-medium">{usersuccessful?.fullName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <FaUserTag className="text-blue-600" />
                          <h2 className="text-lg font-semibold text-gray-800">Vai trò</h2>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Loại tài khoản</label>
                          <p className="text-gray-800 font-medium">{usersuccessful?.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <FaCalendarAlt className="text-blue-600" />
                          <h2 className="text-lg font-semibold text-gray-800">Thông tin tài khoản</h2>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-600">Ngày tạo</label>
                            <p className="text-gray-800 font-medium">
                              {new Date(usersuccessful?.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <FaInfoCircle className="text-blue-600" />
                          <h2 className="text-lg font-semibold text-gray-800">Mô tả</h2>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Thông tin bổ sung</label>
                          <p className="text-gray-800 font-medium">{usersuccessful?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      <FaEdit />
                      <span>Chỉnh sửa</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <FaSignOutAlt />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  Đăng nhập
                </h1>

                <div className="space-y-6">
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={"admin"}
                      onChange={handleChange}
                      placeholder="Tên đăng nhập"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="relative">
                    <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={"123456"}
                      onChange={handleChange}
                      placeholder="Mật khẩu"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                    </label>
                    <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                      Quên mật khẩu?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => login(loginData)}
                  >
                    Đăng nhập
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-gray-600">Chưa có tài khoản? </span>
                  <a href="/register" className="text-blue-500 hover:text-blue-600">
                    Đăng ký ngay
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Login;
