import React from "react";
import logo from "../assets/logo2.png";
import { Objectmenu } from "../untils/const";
import { Link } from "react-router-dom";

// Render nav
const Navbarmenu = () => {
  const RenderNavbar = () => {
    return Objectmenu.map((item, index) => {
      return (
        <div  key={index} className="flex items-center space-x-3 mt-[24px]">
          {item.icon}
          <p className="hover:text-amber-600 cursor-pointer">
            <Link to={item.linkto} className="nav-link">
              {item.title}
            </Link>
          </p>
        </div>
      );
    });
  };

  return (
    <div className=" fixed w-[210px] h-[1351px] p-[24px] rounded-[4px] shadow-2xs bg-white">
      <img src={logo} alt="Logo" /> {/* Thêm alt cho hình ảnh */}
      {RenderNavbar()}
    </div>
  );
};

export default Navbarmenu;
