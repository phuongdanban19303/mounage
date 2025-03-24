import React, { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiPackageThin } from "react-icons/pi"; // sản phẩm
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import ListOderprovider from "../context/ListOderContext";
import Listprdprovider, { Listprdctx } from "../context/ListprdContext";
import Popprovideroder, { Popctxoder } from "../context/PopupContext";
import { AuthContext } from "../context/AuthContext";

// trường tìm kiếm sản phẩm
const Inputfind = () => {
  const { Openpoprd } = useContext(Popctxoder);
  const { Products, setNewprd, setFilteredProducts } = useContext(Listprdctx);
  const { usersuccessful } = useContext(AuthContext);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      setFilteredProducts(null);
      return;
    }
    const filtered = Products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product._id.slice(-6).toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <div className="flex h-[44px] justify-around">
        <input
          type="text"
          className="w-[294px] border-1 border-gray-300 rounded-sm"
          placeholder="Nhập mã hoặc tên sản phẩm"
          onChange={handleSearch}
        />
        <select className="w-[249px] border-1 border-gray-300 rounded-sm">
          <option value="">Danh mục sản phẩm</option>
        </select>
        <select className="w-[249px] border-1 border-gray-300 rounded-sm">
          <option value="">Lọc theo giá trị</option>
        </select>
        <div className="w-[320px] flex items-center border-1 border-gray-300 rounded-sm pl-2.5">
          <input className="w-[40%] text-black/50" type="date" />
          <p className="px-1.5">đến</p>
          <input className="w-[40%] text-black/50" type="date" />
        </div>
      </div>
      <div className="flex justify-end">
        {usersuccessful?.role === "admin" && (
          <button
            onClick={() => {
              Openpoprd();
              setNewprd({});
            }}
            className="bg-[#F68C20] text-[#ffff] p-[10px] rounded-sm shadow-2xs mt-[16px]"
          >
            Thêm mới
          </button>
        )}
      </div>
    </>
  );
};
//=> cmpnent list sản phẩm
const Renderlist = () => {
  const { Products, setNewprd, filteredProducts } = useContext(Listprdctx);
  const { Openpoprd, Opendelete } = useContext(Popctxoder);
  const { usersuccessful } = useContext(AuthContext);

  const renderListprd = () => {
    const productsToRender = filteredProducts || Products;
    return productsToRender?.map((prd) => {
      const idprd = prd?._id.slice(-6);
      const date = new Date(prd?.createdAt).toLocaleDateString(); // ngày

      return (
        <tr key={idprd} className="border-b border-gray-200">
          <td className="px-4 py-2 text-center">{idprd}</td>
          <td className="px-4 py-2 text-center">
            <img
              className="w-[60px] h-auto mx-auto rounded-xl"
              src={prd?.img}
              alt={prd?.name}
            />
          </td>
          <td className="px-4 py-2 text-left">{prd?.name}</td>
          <td className="px-4 py-2 text-left">Sản phẩm trong kho</td>
          <td className="px-4 py-2 text-right">
            {prd?.price.toLocaleString("Vi-VN")}đ
          </td>
          <td className="px-4 py-2 text-center">{prd?.stock}</td>
          <td className="px-4 py-2 text-center">{date}</td>
          <td className="px-4 py-7 text-center flex justify-center items-center gap-3">
            {usersuccessful?.role === "admin" && (
              <>
                <FaPen
                  onClick={() => {
                    Openpoprd();
                    setNewprd({ ...prd, update: true });
                  }}
                />
                <MdDelete onClick={() => Opendelete(prd?._id)} color="red" />
              </>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="m-4 bg-white p-4 rounded shadow">
      <table className="w-full ">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-center">Mã sản phẩm</th>
            <th className="px-4 py-2 text-center">Ảnh Sản phẩm</th>
            <th className="px-4 py-2 text-left">Tên Sản phẩm</th>
            <th className="px-4 py-2 text-left">Danh mục</th>
            <th className="px-4 py-2 text-right">Giá tiền</th>
            <th className="px-4 py-2 text-right">Số lượng</th>
            <th className="px-4 py-2 text-center">Ngày tạo</th>
            <th className="px-4 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody>{renderListprd()}</tbody>
      </table>
    </div>
  );
};

const Products = () => {
  return (
    <Listprdprovider>
      <ListOderprovider>
      <Popprovideroder>
        <div className="w-[1549px] h-[1618px] flex">
          <div className="w-[210px]">
            <Navbarmenu />
          </div>
          <div className="bg-gray-100 w-[1319px] ">
            <Header />
            <div className=" bg-gray-50 p-[20px]">
              <div className="flex gap-1 ml-[12px] mb-3.5 items-center">
                <PiPackageThin size={30} />
                <p className="text-[18px] font-bold">Quản lý sản phẩm </p>
              </div>
              <Inputfind />
            </div>
            <div>
              <Renderlist />
            </div>
          </div>
        </div>
      </Popprovideroder>
      </ListOderprovider>
    </Listprdprovider>
  );
};

export default Products;
