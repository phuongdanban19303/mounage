import React, { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdBookmarkBorder, MdDelete } from "react-icons/md"; // đơn hàng
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import Popprovideroder, { Popctxoder } from "../context/PopupContext";
import { getApioder, postApioder } from "../funtion/api";
import ListOderprovider, { ListOderctx } from "../context/ListOderContext";
import { Listprdctx } from "../context/ListprdContext";
import { IoEye } from "react-icons/io5";

// trường tìm kiếm sản phẩm
const Inputfind = () => {
  const { Openpop } = useContext(Popctxoder);

  
  return (
    <div className="flex h-[44px] justify-around">
      <input
        type="text"
        className="w-[314px] border-1 border-gray-300 rounded-sm px-1"
        placeholder="Nhập mã đơn hàng hoặc tên khách hàng "
      />
      <select className="w-[249px] border-1 border-gray-300 rounded-sm">
        <option value="">Hình thức thanh toán </option>
      </select>
      <select className="w-[249px] border-1 border-gray-300 rounded-sm">
        <option value="">Sản phẩm</option>
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
  const { Openpop} = useContext(Popctxoder);

  return (
    <div className="flex justify-end">
      <button
        onClick={() => Openpop()}
        className="bg-[#F68C20] text-[#ffff] p-[10px] rounded-sm shadow-2xs mt-[16px]"
      >
        Thêm mới
      </button>
    </div>
  );
};

// Render đơn hàng
const Renderoder = ({Products}) => {

  const {Opendetail}=useContext(Popctxoder)
  const { orders } = useContext(ListOderctx);
  // Hàm display đơn hàng
  const disPlayorders = () => {
    return orders?.map((odr) => {
     const Findprd = Products.find((prd)=>prd?._id===odr?.product_id) 
     const idoder= odr?._id.slice(-6);
     const date= new Date(odr?.createdAt).toLocaleDateString()
      return (
        <div
          key={odr?._id}
          className="grid mt-2.5  grid-cols-[90px_2fr_140px_1fr_120px_1fr_2fr_1fr_100px] gap-2.5 gap-y-3 border-b-1 border-black/10"
        >
          <>
            <div className="pl-1.5">
              <p>{idoder} </p>
            </div>
            <div>
              <p>{Findprd?.name}</p>
            </div>
            <div>
              <p>{odr?.client_name}</p>
            </div>
            <div className="text-right">
              <p>{odr?.phone}</p>
            </div>
            <div className="text-center">
              <p>{odr?.quantity}</p>
            </div>
            <div className="">
              <p>{odr?.status}</p>
            </div>
            <div>
              <p>{odr?.address}</p>
            </div>
            <div>
              <p>{date}</p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <FaPen /> <MdDelete color="red" /> <IoEye onClick={()=>Opendetail(odr?._id)} color="blue"/>
            </div>
          </>
        </div>
      );
    });
  };
  return (
    <div className="">
      <div className="grid grid-cols-[90px_2fr_140px_1fr_120px_1fr_2fr_1fr_100px] gap-2.5 gap-y-2 py-2.5 bg-[#E5E7EB] rounded-sm font-bold">
        <div className="col-span-1 pl-1.5">
          <p>Mã đơn </p>
        </div>
        <div>
          <p className="col-span-2">Tên sản phẩm</p>
        </div>
        <div>
          <p>khách hàng</p>
        </div>
        <div className="text-right">
          <p>Số điện thoai</p>
        </div>
        <div className="text-center">
          <p>Số lượng </p>
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
const Orders = () => {
  const{Products}=useContext(Listprdctx)
  return (
    <ListOderprovider>
      <Popprovideroder>
        <div className="w-[1549px] h-[1618px] flex">
          <div className="w-[210px]">
            <Navbarmenu />
          </div>
          <div className="bg-gray-100 w-[1320px] ">
            <Header />
            <div className=" bg-gray-50 p-[20px]">
              <div className="flex gap-1 ml-[12px] mb-3.5 items-center">
                <MdBookmarkBorder size={30} />
                <p className="text-[18px] font-bold">Quản lý đơn hàng </p>
              </div>
              <Inputfind Products={Products} />
              <Btnadd />
            </div>
            <div className="m-2.5 bg-white text-[15px] p-5 rounded-sm">
              <Renderoder Products={Products}/>
            </div>
          </div>
        </div>
      </Popprovideroder>
    </ListOderprovider>
  );
};

export default Orders;
