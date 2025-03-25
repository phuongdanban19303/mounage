import React, { createContext, useEffect, useState } from "react";
import { GetApiuser, GetApiuserdetail } from "../funtion/api";
import { useNavigate } from "react-router-dom";
import { KEY_USER_successful } from "../untils/const";
export const AuthContext = createContext();
const issuccessful = () => {
  const successful = localStorage.getItem(KEY_USER_successful);
  return successful ? JSON.parse(successful) : null;
};
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(issuccessful());
  const [Listuser, Setlistuser] = useState([]);
  const [usersuccessful, Setusersuccessful] = useState({});
  const [checklogin,setchecklogin]=useState(true)
  console.log(usersuccessful);
  

  const navigate = useNavigate();
  useEffect(() => {
    const fetchuser = async () => {
      const user = await GetApiuser();
      Setlistuser(user?.data);
    };
    fetchuser();
  }, [checklogin]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchdetail = async () => {
        const userdetail = await GetApiuserdetail(isAuthenticated);
        Setusersuccessful(userdetail.data);
      };
      fetchdetail();
    }
  }, [isAuthenticated]);

  const login = (value) => {
    // Kiểm tra username tồn tại
    const userExists = Listuser?.find(
      (item) => item.username === value.username
    );

    if (!userExists) {
      return { success: false, error: "Tên đăng nhập không tồn tại" };
    }

    // Kiểm tra password nếu username đúng
    const finduser = Listuser?.find(
      (item) =>
        item.username === value.username && item.password === value.password
    );

    if (!finduser) {
      return { success: false, error: "Mật khẩu không chính xác" };
    }

    // Đăng nhập thành công
    setIsAuthenticated(finduser._id);
    localStorage.setItem(KEY_USER_successful, JSON.stringify(finduser?._id));
    return { success: true };
  };
////

  const logout = () => {
    console.log("2112");
    
    setIsAuthenticated(null);
    localStorage.removeItem(KEY_USER_successful);
  };

  return (
    <AuthContext.Provider
      value={{ Listuser,isAuthenticated, login, logout, usersuccessful,setchecklogin}}
    >
      {children}
    </AuthContext.Provider>
  );
};
