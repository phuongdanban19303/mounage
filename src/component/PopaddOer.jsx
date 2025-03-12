import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ListOderctx } from "../context/ListOderContext";
import { postApioder, putApiproduct } from "../funtion/api";
import { Listprdctx } from "../context/ListprdContext";
import Select from "react-select";
const PopaddOer = ({ Ispop, ClosePop }) => {
  const [newOrder, setNewOrder] = useState({});
  console.log(newOrder);

  // context oder
  const {setcheckapi} = useContext(ListOderctx);
  // context product
  const { Products } = useContext(Listprdctx);
  // funtion optinname
  // Get value input nhập vào
  const GetvalueOder = (name, e) => {
    setNewOrder((pre) => ({ ...pre, [name]: e }));
  };
  // add oder
  const handleCreateOrder = async () => {
    const result = await postApioder(newOrder);
    if (result) {
      setcheckapi(pre=>!pre)
      ClosePop();
     }
  };
  
  
  // slect
  const options = Products?.map((prd) => ({
    value: prd?._id,
    label: prd?.name,
  }));
  return (
    <>
      {Ispop && (
        <div className="fixed inset-0  bg-black/50 flex  justify-center z-50">
          <div className="w-[800px] h-[650px] mt-4 bg-white shadow-lg relative">
            <div className="flex gap-1.5 p-5">
              <IoMdArrowRoundBack onClick={() => ClosePop()} size={20} />{" "}
              <p className="font-bold">Thêm mới đơn hàng </p>
              <div className="flex justify-end absolute top-2 right-2.5">
                <button
                  onClick={() => handleCreateOrder()}
                  className="bg-[#F68C20] text-[#ffff] p-[6px] px-4 rounded-sm shadow-2xs mt-[16px]"
                >
                  Lưu
                </button>
              </div>
            </div>
            <div>
              <p className=" pl-10 italic">
                <span className="text-red-700">*</span> Thông tin khách hàng{" "}
              </p>
              <div className="flex justify-around mt-2">
                <div>
                  <div>
                    <p>Khách hàng </p>
                    <input
                      onChange={(e) =>
                        GetvalueOder("client_name", e.target.value)
                      }
                      className="w-[249px] border-1 border-gray-300 rounded-sm"
                      type="text"
                    />
                  </div>
                  <div>
                    <p>Địa chỉ </p>
                    <input
                      className="w-[249px] border-1 border-gray-300 rounded-sm"
                      type="text"
                      onChange={(e) => GetvalueOder("address", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <p>Số điện thoại </p>
                    <input
                      className="w-[249px] border-1 border-gray-300 rounded-sm"
                      type="text"
                      onChange={(e) => GetvalueOder("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <p>Trạng thái đơn hàng </p>
                    <select className="w-[249px] py-1 border-1 border-gray-300 rounded-sm">
                      <option value="">Chưa thanh toán</option>
                    </select>
                  </div>
                </div>
              </div>
              <p className=" pl-10 italic mt-2">
                <span className="text-red-700">*</span> Thông tin đơn hàng
              </p>

              <div className="flex justify-around m-2 mb-12">
                <div className="w-[30%] mr-10">
                  <div>
                    <p>Sản phẩm</p>
                    <Select
                      options={options}
                      placeholder="Chọn sản phẩm..."
                      isSearchable={true} // Kích hoạt ô tìm kiếm
                      styles={{
                        control: (base) => ({
                          ...base,
                          width: "249px",
                          border: "1px solid #d1d5db", // Tương đương border-gray-300 trong Tailwind
                          borderRadius: "0.125rem", // Tương đương rounded-sm
                        }),
                      }}
                      onChange={
                        (selectedOption) =>
                          GetvalueOder("product_id", selectedOption?.value) // Lấy value từ Select
                      }
                    />
                  </div>
                  <div className="mt-2.5">
                    <p>Số lượng</p>
                    <input
                      className="w-[249px] border-1 border-gray-300 rounded-sm"
                      type="number"
                      onChange={(e) => GetvalueOder("quantity", e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[30%] mr-5">
                  <div>
                    <p> Thành tiền: 120000 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopaddOer;
