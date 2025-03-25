import React, { useContext, useState, useEffect } from "react";
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import { CiGrid41 } from "react-icons/ci";
import { FaPen, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const UserRoles = () => {
  const { Listuser, setListuser, usersuccessful, token } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://ngochieuwedding.io.vn/api/users", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Không thể tải danh sách user");
        const users = await response.json();
        setListuser(users);
      } catch (error) {
        setError(error.message);
        setTimeout(() => setError(""), 3000);
      }
    };
    if (usersuccessful?.role === "admin") fetchUsers();
  }, [usersuccessful, token, setListuser]);

  const handleRoleChange = async (userId, newRole) => {
    console.log("userId:", userId);
    if (!newRole || newRole === "") {
      setError("Vui lòng chọn một quyền hợp lệ!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    try {
      const response = await fetch(`https://ngochieuwedding.io.vn/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", response.status, errorText);
        const errorData = errorText ? JSON.parse(errorText) : {};
        throw new Error(errorData.message || "User not found");
      }

      const updatedUser = await response.json();
      setListuser((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, ...updatedUser } : user))
      );
      setSuccess("Cập nhật quyền thành công!");
      setEditUserId(null);
      setSelectedRole("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.message || "Có lỗi xảy ra khi cập nhật quyền!");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteUser = async (userId) => {
    console.log("userId to delete:", userId);
    try {
      const response = await fetch(`https://ngochieuwedding.io.vn/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", response.status, errorText);
        const errorData = errorText ? JSON.parse(errorText) : {};
        throw new Error(errorData.message || "User not found");
      }

      setListuser((prev) => prev.filter((user) => user._id !== userId));
      setSuccess("Xóa người dùng thành công!");
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.message || "Có lỗi xảy ra khi xóa người dùng!");
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
              <div>
                {Listuser?.map((user, index) => (
                  <div
                    key={user._id}
                    className="grid mt-2.5 grid-cols-6 gap-y-3 border-b-1 border-black/10"
                  >
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
            </div>
          </>
        ) : (
          <p className="p-5">Bạn không có quyền truy cập vào trang này</p>
        )}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
              <p className="mb-4">
                Bạn có chắc chắn muốn xóa người dùng {userToDelete?.fullName}? Hành động này
                không thể hoàn tác.
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