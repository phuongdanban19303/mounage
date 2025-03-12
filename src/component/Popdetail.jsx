import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GetapidetailOder } from "../funtion/api";

const InfoField = ({ label, value, bold, boder }) => {
  return (
    <div
      className={`mb-3  flex  justify-between ${
        boder ? "border-b-1 border-gray-300" : ""
      }`}
    >
      <p className="italic">
        <span className="text-red-700">*</span> {label}
      </p>
      <div className={`${bold ? "font-bold" : ""}`}>{value} </div>
    </div>
  );
};

const Popdetail = ({ Ispopdetail, Closedetail }) => {
const [Detail,SetDetail]=useState({}) 
console.log("de",Detail);

  useEffect(()=>{
    const handleApi = async ()=>{
      const data= await GetapidetailOder(Ispopdetail);
      SetDetail(data)
    }
    handleApi();
  },[Ispopdetail])
  const total= Detail?.data?.totalPrice.toLocaleString("Vi-VN")
  const date = new Date(Detail?.data?.createdAt).toLocaleDateString()
  return (
    <>
      {Ispopdetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="">
              <div className="flex items-center gap-1.5">
                <button onClick={Closedetail} className=" hover:text-red-800">
                  <IoMdArrowRoundBack size={24} />
                </button>
                <h2 className="text-xl font-bold ">Thông tin khách hàng</h2>
              </div>
              <div className="mt-2.5 flex ml-2 ">
                <div className="w-[50%]">
                  <InfoField label="Mã đơn hàng" value={Detail?.data?._id.slice(-6)} boder />
                  <InfoField
                    label="Khách hàng"
                    value={Detail?.data?.client_name}
                    boder
                  />
                  <InfoField label="Địa chỉ" value={Detail?.data?.address} boder />
                  <InfoField label="Số điện thoại"  value={Detail?.data?.phone} boder />
                  <InfoField
                    label="Tổng giá trị đơn hàng"
                    value={`${total} đ`}
                  />
                </div>
                <div className="w-[50%] ">
                  <div className="flex justify-end mr-2 ">
                    <div>
                      <p>Ngày đặt hàng </p>
                      <p>{date} </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <img
                      src={Detail?.data?.product?.img}
                      width={"50%"}
                      alt={Detail?.data?._id}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Phần Bảng Hàng Hóa */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Thông tin hàng hóa</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm text-gray-600">
                        Mã sản phẩm
                      </th>
                      <th className="px-4 py-2 text-left text-sm text-gray-600">
                        Sản phẩm
                      </th>
                      <th className="px-4 py-2 text-left text-sm text-gray-600">
                      Số lượng
                      </th>
                      <th className="px-4 py-2 text-left text-sm text-gray-600">
                        Đơn giá 
                      </th>
                      <th className="px-4 py-2 text-left text-sm text-gray-600">
                        Trạng thái 
                      </th>
                      <th className="px-4 py-2 text-left text-sm text-gray-600">
                        Tồn kho
                      </th>
                      <th className="px-4 py-2 text-left text-sm text-gray-600">
                        danh mục 
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 text-sm">{Detail?.data?.product._id.slice(-6)}</td>
                      <td className="px-4 py-2 text-sm">{Detail?.data?.product?.name}</td>
                      <td className="px-4 py-2 text-sm">{Detail?.data?.quantity}</td>
                      <td className="px-4 py-2 text-sm">{Detail?.data?.product?.price}</td>
                      <td className="px-4 py-2 text-sm">{Detail?.data?.status}</td>
                      <td className="px-4 py-2 text-sm">{Detail?.data?.product?.stock}</td>
                      <td className="px-4 py-2 text-sm">Sản phẩm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popdetail;
