import React, { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdBookmarkBorder, MdDelete } from "react-icons/md";
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import Popprovideroder, { Popctxoder } from "../context/PopupContext";
import ListOderprovider, { ListOderctx } from "../context/ListOderContext";
import { Listprdctx } from "../context/ListprdContext";
import { IoEye } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { CgSpinner } from "react-icons/cg";

const Inputfind = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex h-[44px] justify-around">
      <input
        type="text"
        className="w-[314px] border-1 border-gray-300 rounded-sm px-1"
        placeholder="Nhập mã đơn hàng hoặc tên khách hàng"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị tìm kiếm
      />
      <select className="w-[249px] border-1 border-gray-300 rounded-sm">
        <option value="">Sản phẩm</option>
      </select>
    </div>
  );
};

const Renderoder = ({ Products, searchQuery }) => {
  const { Opendetail, Openpop, OpendeleteOrder } = useContext(Popctxoder);
  const { orders, loading } = useContext(ListOderctx);
  const { usersuccessful } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="m-4 bg-white p-4 rounded shadow flex items-center justify-center h-[400px]">
        <CgSpinner className="animate-spin text-[#F68C20]" size={50} />
        <span className="ml-2 text-gray-600">Đang tải đơn hàng...</span>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="m-4 bg-white p-4 rounded shadow flex items-center justify-center h-[400px]">
        <span className="text-gray-600">Không có đơn hàng nào</span>
      </div>
    );
  }

  // Lọc đơn hàng theo searchQuery (tên khách hàng hoặc mã đơn hàng)
  const filteredOrders = orders.filter((odr) => {
    const idoder = odr?._id.slice(-6); // Lấy 6 số cuối làm mã đơn
    return (
      odr?.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idoder.includes(searchQuery)
    );
  });

  const disPlayorders = () => {
    return filteredOrders?.map((odr) => {
      const Findprd = Products.find((prd) => prd?._id === odr?.product_id);
      const idoder = odr?._id.slice(-6);
      const date = new Date(odr?.createdAt).toLocaleDateString();
      return (
        <div
          key={odr?._id}
          className="grid mt-2.5 grid-cols-[90px_2fr_140px_1fr_120px_1fr_2fr_1fr_100px] gap-2.5 gap-y-3 border-b-1 border-black/10"
        >
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
          <div>
            <p>{odr?.status}</p>
          </div>
          <div>
            <p>{odr?.address}</p>
          </div>
          <div>
            <p>{date}</p>
          </div>
          <div className="flex justify-center items-center gap-3">
            {usersuccessful.role === "admin" && (
              <>
                <FaPen onClick={() => Openpop(odr)} />
                <MdDelete onClick={() => OpendeleteOrder(odr?._id)} color="red" />
              </>
            )}
            <IoEye onClick={() => Opendetail(odr?._id)} color="blue" />
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="grid grid-cols-[90px_2fr_140px_1fr_120px_1fr_2fr_1fr_100px] gap-2.5 gap-y-2 py-2.5 bg-[#E5E7EB] rounded-sm font-bold">
        <div className="col-span-1 pl-1.5">
          <h1>Mã đơn</h1>
        </div>
        <div>
          <p className="col-span-2">Tên sản phẩm</p>
        </div>
        <div>
          <p>Khách hàng</p>
        </div>
        <div className="text-right">
          <p>Số điện thoại</p>
        </div>
        <div className="text-center">
          <p>Số lượng</p>
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
      </div>
      {disPlayorders()}
    </div>
  );
};

const Orders = () => {
  const { Products } = useContext(Listprdctx);
  const { isAuthenticated } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Popprovideroder>
      <ListOderprovider>
      <div className="w-[1549px] h-[1618px] flex">
        <div className="w-[210px]">
          <Navbarmenu />
        </div>
        <div className="bg-gray-100 w-[1320px] ">
          <Header />
          <div className="bg-gray-50 p-[20px]">
            <div className="flex gap-1 ml-[12px] mb-3.5 items-center">
              <MdBookmarkBorder size={30} />
              <p className="text-[18px] font-bold">Quản lý đơn hàng</p>
            </div>
            <Inputfind searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="m-2.5 bg-white text-[15px] p-5 rounded-sm">
            <Renderoder Products={Products} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      </ListOderprovider>
    </Popprovideroder>
  );
};

export default Orders;
