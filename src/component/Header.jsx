import React from "react";
import { FaUserCheck } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { usersuccessful } = useContext(AuthContext);
  console.log(usersuccessful);

  const twoLastWords = usersuccessful?.fullName
    ? usersuccessful.fullName.split(" ").slice(-2).join(" ")
    : "";
  return (
    <div className="w-[1299px] h-[56px] flex justify-end border-b-1 border-black/10">
      <p className="text-center mr-72 text-red-600" >
        APi có thể bị chậm nên hoặc có thể gặp lỗi khi gọi, Vui lòng reload lại trang để gọi
        lại API
      </p>

      <div className="flex justify-between items-center w-[161px] gap-2.5 mr-4 ">
        <FaRegBell />
        <FaUserCheck />
        {usersuccessful && <p>{twoLastWords}</p>}
      </div>
    </div>
  );
};

export default Header;
