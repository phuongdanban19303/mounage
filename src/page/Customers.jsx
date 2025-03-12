import React, { useContext } from "react";
import { MdBookmarkBorder } from "react-icons/md"; // đơn hàng
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import { ListOder } from "../untils/const";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiBoxList, CiGrid41 } from "react-icons/ci"; // Import các icon từ react-icons/ci
import ListOderprovider, { ListOderctx } from "../context/ListOderContext";

const Customers = () => {
  const Inputfind = () => {
      return (
        <div className="flex h-[44px] justify-around">
          <input
            type="text"
            className="w-[314px] border-1 border-gray-300 rounded-sm px-1"
            placeholder=" Nhập tên khách hàng cần tìm kiếm "
          />
          <select className="w-[249px] border-1 border-gray-300 rounded-sm">
            <option value="">Trạng thái thanh toán</option>
          </select>
      
          <div className="w-[320px] flex items-center border-1 border-gray-300 rounded-sm pl-2.5">
            <input className="w-[40%] text-black/50" type="date" />
            <p className="px-1.5"> đến </p>
            <input className="w-[40%]  text-black/50" type="date" />
          </div>
        </div>
      );
    };
    // button them mới
    const Btnadd = () => {
      return (
        <div className="flex justify-end">
          <button className="bg-[#F68C20] text-[#ffff] p-[10px] rounded-sm shadow-2xs mt-[16px]">
            Thêm mới
          </button>
        </div>
      );
    };
    // Render đơn hàng
    const Renderoder = () => {
      // Hàm display đơn hàng
      const disPlayorders = () => {
        const {orders}=useContext(ListOderctx)
        return orders?.map((odr,index) => {
          const date= new Date(odr?.createdAt).toLocaleDateString()
          return (
            <div className="grid mt-2.5   grid-cols-7   gap-y-3 border-b-1 border-black/10">
              <>
                <div className="pl-1.5">
                  <p>{index+=1} </p>
                </div>
                <div>
                  <p>{odr.client_name}</p>
                </div>
                <div >
                  <p>{odr.phone}</p>
                </div>
                <div className="">
                  <p>{odr?.status}</p>
                </div>
                <div>
                  <p>{odr.address}</p>
                </div>
                <div>
                  <p>{date}</p>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <FaPen /> <MdDelete color="red" />
                </div>
              </>
            </div>
          );
        });
      };
      return (
        <div className="">
          <div className="grid grid-cols-7 gap-y-2 py-2.5 bg-[#E5E7EB] rounded-sm font-bold">
            <div className="col-span-1 pl-1.5">
              <p>STT </p>
            </div>
            <div>
              <p>khách hàng</p>
            </div>
            <div>
              <p>Số điện thoại</p>
            </div>
            <div>
              <p> Thanh toán</p>
            </div>
            <div>
              <p>Địa chỉ nhận hàng</p>
            </div>
            <div>
              <p>Ngày tạo đơn</p>
            </div>
            <div>
              <p></p>
            </div>
          </div>
          {/* <div className="grid mt-2.5  grid-cols-[90px_2fr_1fr_1fr_90px_1fr_1fr_2fr_1fr_60px] gap-2.5 gap-y-3"> */}
          {disPlayorders()}
          {/* </div> */}
        </div>
      );
    };
  return (
    <ListOderprovider>
    <div className="w-[1549px] h-[1618px] flex">
    <div className="w-[210px]">
      <Navbarmenu />
    </div>
    <div className="bg-gray-100 w-[1320px] ">
      <Header />
      <div className=" bg-gray-50 p-[20px]">
        <div className="flex gap-1 ml-[12px] mb-3.5 items-center">
          <CiGrid41 size={30} />
          <p className="text-[18px] font-bold">Thông tin Khách hàng </p>
        </div>
        <Inputfind />
        <Btnadd />
      </div>
      <div className="m-2.5 bg-white text-[15px] p-5 rounded-sm">
        <Renderoder />
      </div>
    </div>
  </div>
  </ListOderprovider>
);
};

export default Customers