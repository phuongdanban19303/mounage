import React, { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Listprdctx } from "../context/ListprdContext";
import { postApiprd, putApiproduct } from "../funtion/api";

const Popaddprd = ({ Ispopdr, Closepoprd }) => {
  
  // context
  const { setcheck,getPrdnew,Newprd,Setproducts,Products} = useContext(Listprdctx);
  //Update APi
  
  const handleupdate=async()=>{
    
      const data= await putApiproduct(Newprd?._id,{
        "name": Newprd?.name,
        "price": Newprd?.price,
        "img":  Newprd?.img,
        "stock":  Newprd?.stock
        ,
    });
      if (data) {
        setcheck((pre) => !pre);
        Closepoprd();
      }
    }
 
 
  // handelcreatPrd
  const handlecreatPrd = async () => {
    const result = await postApiprd(Newprd);
    console.log(result);
    
    if (result) {
      setcheck(pre =>!pre);
      // Setproducts((prev) => [...prev,Newprd]),
      Closepoprd();
    }
  };
  console.log("ninh",Products);
  
  //
  const handleFileupload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "firt_img_library_phuong");
    data.append("cloud_name", "dylneyz90");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dylneyz90/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadiUrl = await res.json();
      if (uploadiUrl) {
        getPrdnew("img", uploadiUrl.url);
        console.log("Upload successful, URL:", uploadiUrl.url);
      } else {
        console.error("Upload failed:", result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // 
  return (
    <>
      {Ispopdr && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-[800px] h-[500px]  bg-white shadow-lg relative">
            <div className="flex gap-1.5 p-5">
              <IoMdArrowRoundBack onClick={() => Closepoprd()} size={20} />{" "}
              <p className="font-bold">{Newprd.update?"Cập nhật đơn hàng":"Thêm mới đơn hàng"} </p>
              <div className="flex justify-end absolute top-2 right-2.5">
                <button
                  onClick={() => {Newprd.update?handleupdate():handlecreatPrd()}}
                  className="bg-[#F68C20] text-[#ffff] p-[6px] px-4 rounded-sm shadow-2xs mt-[16px]"
                >
                  {Newprd.update?"Cập nhập":"lưu"}
                </button>
              </div>
            </div>
            <div>
              <p className=" pl-10 italic">
                <span className="text-red-700">*</span> Thông tin sản phẩm
              </p>
              <div className="flex justify-around mt-2">
                <div className="grid grid-rows-2 gap-y-2.5 h-[140px]">
                  <div>
                    <p>Tên sản phẩm </p>
                    <input
                      onChange={(e) => getPrdnew("name", e.target.value)}
                      className="w-[249px] border-1 border-gray-300 rounded-sm"
                      type="text"
                      placeholder="Nhập tên sản phẩm "
                      value={Newprd.name}
                    />
                  </div>
                  <div>
                    <p>Đơn giá </p>
                    <input
                      className="w-[249px] border-1 border-gray-300 rounded-sm"
                      type="number"
                      placeholder="Nhập đơn gián sản phẩm "
                      value={Newprd.price}
                      onChange={(e) => getPrdnew("price", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-rows-3 gap-y-2.5">
                  <div>
                    <p>Ảnh sản phẩm </p>
                    <input
                      type="file"
                      onChange={handleFileupload}
                      className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                    />
                    {Newprd.img && (
                      <img
                        src={Newprd.img}
                        alt="Preview"
                        className="mt-2 w-20 h-20 object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p>Số lượng </p>
                    <input
                      className="w-[249px] border-1 border-gray-300 rounded-sm"
                      type="number"
                      placeholder="Nhập số lượng sản phẩm "
                      onChange={(e) => getPrdnew("stock", e.target.value)}
                      value={Newprd.stock}
                    />
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

export default Popaddprd;
