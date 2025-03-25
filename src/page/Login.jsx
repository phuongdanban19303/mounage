import React, { useState, useContext, useRef } from "react";
import { FaUser, FaEdit, FaSignOutAlt, FaUserCircle, FaCalendarAlt, FaUserTag, FaInfoCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbarmenu from "../component/Navbar";
import Header from "../component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgSpinner } from "react-icons/cg";
import { MdCloudUpload } from "react-icons/md";
import { putApiuser } from "../funtion/api";

const Login = () => {
  const { login, isAuthenticated, usersuccessful, logout, loading, initialLoading } = useContext(AuthContext);
  
  const [loginData, setLoginData] = useState({
    username: "user007",
    password: "123456",
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: usersuccessful?.fullName || "",
    avatar: usersuccessful?.avatar || ""
  });
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleLogin = () => {
    const result = login(loginData);
    if (!result.success) {
      toast.error(`❌ ${result.error}`);
    }
  };

  const handleEdit = () => {
    setEditData({
      fullName: usersuccessful?.fullName,
      avatar: usersuccessful?.avatar
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      fullName: usersuccessful?.fullName,
      avatar: usersuccessful?.avatar
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      if (!editData.fullName.trim()) {
        toast.error("Vui lòng nhập họ và tên!");
        setIsSaving(false);
        return;
      }

      const updateData = {
        fullName: editData.fullName,
        avatar: editData.avatar
      };

      const response = await putApiuser(usersuccessful._id, updateData);

      if (response) {
        toast.success("✅ Cập nhật thông tin thành công!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsEditing(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("❌ Có lỗi xảy ra khi cập nhật thông tin!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      toast.error("❌ Có lỗi xảy ra khi cập nhật thông tin!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "firt_img_library_phuong");
      data.append("cloud_name", "dylneyz90");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dylneyz90/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadResult = await res.json();
      
      if (uploadResult.url) {
        setEditData(prev => ({
          ...prev,
          avatar: uploadResult.url
        }));
      } else {
        toast.error("Không thể tải ảnh lên. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      toast.error("Có lỗi xảy ra khi tải ảnh lên!");
    }
  };

  console.log('initialLoading:', initialLoading);

  if (initialLoading) {
    return (
      <div className="flex w-[1549px] h-[1618px]">
        <div className="w-[210px]">
          <Navbarmenu />
        </div>
        <div className="flex-1 bg-[#F9FAFB]">
          <div className="w-[1320px]">
            <Header />
          </div>
          <main className="p-8 flex items-center justify-center">
            <div className="max-w-md mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center h-[300px]">
                <CgSpinner className="animate-spin text-blue-600" size={40} />
                <span className="mt-4 text-gray-600">Đang kiểm tra thông tin đăng nhập...</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-[1549px] h-[1618px]">
      <div className="w-[210px]">
        <Navbarmenu />
      </div>
      <div className="flex-1 bg-[#F9FAFB]">
        <div className="w-[1320px]">
          <Header />
          <ToastContainer />

        </div>
        <main className="p-8">
          {isAuthenticated ? (
            loading ? (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <CgSpinner className="animate-spin text-blue-600" size={50} />
                    <span className="mt-4 text-gray-600">Đang tải thông tin tài khoản...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Header Section */}
                  <div className="bg-blue-600 p-6 text-white">
                    <div className="flex items-center space-x-4">
                      <div className=" flex items-center justify-center">
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
                          
                          <div className="space-y-4">
                            {/* Avatar */}
                            <div className="flex flex-col items-center space-y-2">
                              <div className="relative">
                                <img 
                                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                                  src={isEditing ? editData.avatar : (usersuccessful?.avatar || "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png")}
                                  alt="Avatar"
                                />
                                {isEditing && (
                                  <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                  >
                                    <MdCloudUpload size={20} />
                                  </button>
                                )}
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </div>
                            </div>

                            {/* Username */}
                            <div>
                              <label className="text-sm text-gray-600">Tên đăng nhập</label>
                              <p className="text-gray-800 font-medium">{usersuccessful?.username}</p>
                            </div>

                            {/* Full Name */}
                            <div>
                              <label className="text-sm text-gray-600">Họ và tên</label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editData.fullName}
                                  onChange={(e) => setEditData(prev => ({...prev, fullName: e.target.value}))}
                                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              ) : (
                                <p className="text-gray-800 font-medium">{usersuccessful?.fullName}</p>
                              )}
                            </div>
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
                            <FaUserTag className="text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Vai trò</h2>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Loại tài khoản</label>
                            <p className="text-gray-800 font-medium">{usersuccessful?.role}</p>
                          </div>
                        </div>
                        {/* <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3 mb-4">
                            <FaInfoCircle className="text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Mô tả</h2>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Thông tin bổ sung</label>
                            <p className="text-gray-800 font-medium">{usersuccessful?.description}</p>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleCancel}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <span>Hủy</span>
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                              isSaving ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                          >
                            {isSaving ? (
                              <>
                                <CgSpinner className="animate-spin mr-2" size={20} />
                                <span>Đang lưu thay đổi...</span>
                              </>
                            ) : (
                              <>
                                <FaEdit className="mr-2" />
                                <span>Lưu thay đổi</span>
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleEdit}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <FaEdit />
                            <span>Chỉnh sửa</span>
                          </button>
                          <button 
                            onClick={handleLogout}
                            disabled={loading}
                            className={`flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors
                              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {loading ? (
                              <>
                                <CgSpinner className="animate-spin" size={16} />
                                <span>Đang xử lý...</span>
                              </>
                            ) : (
                              <>
                                <FaSignOutAlt />
                                <span>Đăng xuất</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            loading ? (
              <div className="max-w-md mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center h-[300px]">
                  <CgSpinner className="animate-spin text-blue-600" size={40} />
                  <span className="mt-4 text-gray-600">Đang xử lý đăng nhập...</span>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Đăng nhập
                  </h1>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        placeholder="Tên đăng nhập"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                 : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}`}
                        required
                      />
                    </div>

                    <div className="relative">
                      <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Mật khẩu"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                 : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}`}
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                      </label>
                      {/* <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                        Quên mật khẩu?
                      </a> */}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 
                        transition-colors flex items-center justify-center
                        ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      onClick={handleLogin}
                    >
                      {loading ? (
                        <>
                          <CgSpinner className="animate-spin mr-2" size={20} />
                          <span>Đang đăng nhập...</span>
                        </>
                      ) : (
                        "Đăng nhập"
                      )}
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
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default Login;
