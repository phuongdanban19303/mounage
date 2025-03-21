import React, { useContext, useState } from "react";
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import { CiGrid41 } from "react-icons/ci";
import { FaPen, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const UserRoles = () => {
  const { Listuser, usersuccessful } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // TODO: Implement API call to update user role
      setSuccess("Cập nhật quyền thành công!");
      setEditUserId(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Có lỗi xảy ra khi cập nhật quyền!");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // TODO: Implement API call to delete user
      setSuccess("Xóa người dùng thành công!");
      setShowDeleteConfirm(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Có lỗi xảy ra khi xóa người dùng!");
      setTimeout(() => setError(""), 3000);
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const Inputfind = () => {
    return (
      <div className="flex h-[44px] justify-around">
        <input
          type="text"
          className="w-[314px] border-1 border-gray-300 rounded-sm px-1"
          placeholder="Nhập tên người dùng cần tìm kiếm"
        />
        <select className="w-[249px] border-1 border-gray-300 rounded-sm">
          <option value="">Tất cả quyền</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="staff">Staff</option>
        </select>
      </div>
    );
  };

  const RenderUsers = () => {
    return (
      <div>
        <div className="grid grid-cols-6 gap-y-2 py-2.5 bg-[#E5E7EB] rounded-sm font-bold">
          <div className="col-span-1 pl-1.5">
            <p>STT</p>
          </div>
          <div>
            <p>Họ và tên</p>
          </div>
          <div>
            <p>Tên đăng nhập</p>
          </div>
          <div>
            <p>Email</p>
          </div>
          <div>
            <p>Quyền</p>
          </div>
          <div>
            <p>Thao tác</p>
          </div>
        </div>

        {Listuser?.map((user, index) => (
          <div key={user._id} className="grid mt-2.5 grid-cols-6 gap-y-3 border-b-1 border-black/10">
            <div className="pl-1.5">
              <p>{index + 1}</p>
            </div>
            <div>
              <p>{user.fullName}</p>
            </div>
            <div>
              <p>{user.username}</p>
            </div>
            <div>
              <p>{user.email}</p>
            </div>
            <div>
              {editUserId === user._id ? (
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="border border-gray-300 rounded-sm px-1"
                >
                  <option value="">Chọn quyền</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                </select>
              ) : (
                <p className="capitalize">{user.role || "user"}</p>
              )}
            </div>
            <div className="flex justify-center items-center gap-3">
              {editUserId === user._id ? (
                <>
                  <button
                    onClick={() => handleRoleChange(user._id, selectedRole)}
                    className="text-green-600 hover:text-green-700"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => {
                      setEditUserId(null);
                      setSelectedRole("");
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditUserId(user._id);
                      setSelectedRole(user.role || "user");
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => confirmDelete(user)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-[1549px] h-[1618px] flex">
      <div className="w-[210px]">
        <Navbarmenu />
      </div>
      <div className="bg-gray-100 w-[1320px]">
        <Header />
        {usersuccessful?.role === "admin" ? (
          <>
            <div className="bg-gray-50 p-[20px]">
              <div className="flex gap-1 ml-[12px] mb-3.5 items-center">
                <CiGrid41 size={30} />
                <p className="text-[18px] font-bold">Quản lý người dùng</p>
              </div>
              <Inputfind />
            </div>
            <div className="m-2.5 bg-white text-[15px] p-5 rounded-sm">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}
              <RenderUsers />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <p className="text-xl text-red-600">Bạn không có quyền truy cập vào trang này</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
              <p className="mb-4">
                Bạn có chắc chắn muốn xóa người dùng {userToDelete?.fullName}?
                Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDeleteUser(userToDelete._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRoles;