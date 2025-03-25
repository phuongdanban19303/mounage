import React, { useContext, useState } from "react";
import { CiGrid41 } from "react-icons/ci"; // Import các icon từ react-icons/ci
import { FaPen } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg"; // Thêm import spinner
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import ListOderprovider, { ListOderctx } from "../context/ListOderContext";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Chuyển thành một biến thông thường thay vì function component
  const Inputfind = (
    <div className="flex h-[44px]">
      <input
        type="text"
        className="w-[314px] border-1 border-gray-300 rounded-sm px-1"
        placeholder="Nhập tên khách hàng cần tìm kiếm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );

  // Render đơn hàng
  const Renderoder = () => {
    const { orders, loading } = useContext(ListOderctx);
    
    // Thêm loading state
    if (loading) {
      return (
        <div className="m-4 bg-white p-4 rounded shadow flex items-center justify-center h-[400px]">
          <CgSpinner className="animate-spin text-[#F68C20]" size={50} />
          <span className="ml-2 text-gray-600">Đang tải danh sách khách hàng...</span>
        </div>
      );
    }

    // Thêm trường hợp không có khách hàng
    if (!orders?.length) {
      return (
        <div className="m-4 bg-white p-4 rounded shadow flex items-center justify-center h-[400px]">
          <span className="text-gray-600">Không có khách hàng nào</span>
        </div>
      );
    }
    
    // Hàm display đơn hàng
    const disPlayorders = () => {
      if (!orders) return null;
      
      const filteredOrders = orders.filter(order => 
        order?.client_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredOrders.length === 0) {
        return (
          <div className="text-center py-4 text-gray-600">
            Không tìm thấy khách hàng phù hợp
          </div>
        );
      }
      
      return filteredOrders.map((odr, index) => {
        const date = new Date(odr?.createdAt).toLocaleDateString();
        return (
          <div key={odr._id} className="grid mt-2.5 grid-cols-6 gap-y-3 border-b-1 border-black/10">
            <div className="pl-1.5">
              <p>{index + 1}</p>
            </div>
            <div>
              <p>{odr?.client_name}</p>
            </div>
            <div>
              <p>{odr?.phone}</p>
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
              {/* <FaPen /> */}
            </div>
          </div>
        );
      });
    };

    return (
      <div className="">
        <div className="grid grid-cols-6 gap-y-2 py-2.5 bg-[#E5E7EB] rounded-sm font-bold">
          <div className="col-span-1 pl-1.5">
            <p>STT</p>
          </div>
          <div>
            <p>Khách hàng</p>
          </div>
          <div>
            <p>Số điện thoại</p>
          </div>
          <div>
            <p>Thanh toán</p>
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
        {disPlayorders()}
      </div>
    );
  };

  return (
    <ListOderprovider>
      <div className="w-[1549px] h-[1618px] flex">
        <div className="w-[210px]">
          <Navbarmenu />
        </div>
        <div className="bg-gray-100 w-[1320px]">
          <Header />
          <div className="bg-gray-50 p-[20px]">
            <div className="flex gap-1 ml-[12px] mb-3.5 items-center">
              <CiGrid41 size={30} />
              <p className="text-[18px] font-bold">Thông tin Khách hàng</p>
            </div>
            {Inputfind}
          </div>
          <div className="m-2.5 bg-white text-[15px] p-5 rounded-sm">
            <Renderoder />
          </div>
        </div>
      </div>
    </ListOderprovider>
  );
};

export default Customers;