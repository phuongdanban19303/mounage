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
  console.log(usersuccessful);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchuser = async () => {
      const user = await GetApiuser();
      Setlistuser(user?.data);
    };
    fetchuser();
  }, []);

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
    console.log("hdassad");
    
    const finduser = Listuser?.find(
      (item) =>
        item.username === value.username && item.password === value.password
    );
    console.log(finduser);

    if (finduser) {
      setIsAuthenticated(finduser._id);
      localStorage.setItem(KEY_USER_successful, JSON.stringify(finduser?._id));
      navigate("/");
    }
  };

  const logout = () => {
    console.log("2112");
    
    setIsAuthenticated(null);
    localStorage.removeItem(KEY_USER_successful);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, usersuccessful }}
    >
      {children}
    </AuthContext.Provider>
  );
};
