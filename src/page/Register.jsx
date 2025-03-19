import React, { useContext, useState } from "react";
import {
  FaLock,
  FaUser,
  FaUserCircle
} from "react-icons/fa";
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import { Postapiuser } from "../funtion/api";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    fullName: "",
    comfrimpassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const {setchecklogin} = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset error messages when user types
    setSubmitError("");
    setSubmitSuccess("");

    // Kiểm tra mật khẩu xác nhận khi người dùng nhập
    if (name === "comfrimpassword") {
      if (value !== registerData.password) {
        setPasswordError("Mật khẩu xác nhận không khớp!");
      } else {
        setPasswordError("");
      }
    }
    
    // Kiểm tra lại mật khẩu xác nhận khi mật khẩu chính thay đổi
    if (name === "password" && registerData.comfrimpassword) {
      if (value !== registerData.comfrimpassword) {
        setPasswordError("Mật khẩu xác nhận không khớp!");
      } else {
        setPasswordError("");
      }
    }
  };
    
  const postapiuser = async () => {
    if (registerData.password !== registerData.comfrimpassword) {
      setSubmitError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const repct = await Postapiuser(registerData);
      if (repct) {
        setSubmitSuccess("Đăng ký thành công! Đang chuyển hướng...");
        setTimeout(() => {
          setchecklogin(pre => !pre);
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setSubmitError("Có lỗi xảy ra khi đăng ký!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postapiuser();
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
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Đăng ký tài khoản
              </h1>

              {submitError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {submitSuccess}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="relative">
                  <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleChange}
                    placeholder="Họ và tên"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                {/* Username */}
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleChange}
                    placeholder="Tên đăng nhập"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="comfrimpassword"
                    value={registerData.comfrimpassword}
                    onChange={handleChange}
                    placeholder="Xác nhận lại mật khẩu"
                    className={`w-full pl-10 pr-4 py-2 border ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:border-blue-500`}
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Đăng ký
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-gray-600">Đã có tài khoản? </span>
                <a href="/login" className="text-blue-500 hover:text-blue-600">
                  Đăng nhập ngay
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
