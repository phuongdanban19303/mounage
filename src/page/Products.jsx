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
import { CgSpinner } from "react-icons/cg"; // Thêm vào phần import

// trường tìm kiếm sản phẩm
const Inputfind = () => {
  const { Openpoprd } = useContext(Popctxoder);
  const { Products, setNewprd, setFilteredProducts, filteredProducts } = useContext(Listprdctx);
  const { usersuccessful } = useContext(AuthContext);
  const [sortType, setSortType] = useState("date-desc"); // Mặc định sắp xếp theo ngày mới nhất

  // Sắp xếp mặc định khi component mount
  React.useEffect(() => {
    if (Products?.length) {
      const sortedByDate = [...Products].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilteredProducts(sortedByDate);
    }
  }, [Products]);

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

  const handleSort = (e) => {
    const value = e.target.value;
    setSortType(value);
    
    let productsToSort = [...Products];
    
    switch(value) {
      case "date-desc":
        productsToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-asc":
        productsToSort.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "price-desc":
        productsToSort.sort((a, b) => b.price - a.price);
        break;
      case "price-asc":
        productsToSort.sort((a, b) => a.price - b.price);
        break;
      case "stock-desc":
        productsToSort.sort((a, b) => b.stock - a.stock);
        break;
      case "stock-asc":
        productsToSort.sort((a, b) => a.stock - b.stock);
        break;
      default:
        setFilteredProducts(null);
        return;
    }
    
    setFilteredProducts(productsToSort);
  };

  return (
    <>
      <div className="flex h-[44px] justify-around">
        <input
          type="text"
          className="w-[294px] border-1 border-gray-300 rounded-sm px-2"
          placeholder="Nhập mã hoặc tên sản phẩm"
          onChange={handleSearch}
        />
        <select 
          className="w-[249px] border-1 border-gray-300 rounded-sm px-2"
          value={sortType}
          onChange={handleSort}
        >
          <option value="date-desc">Ngày tạo mới nhất ↓</option>
          <option value="date-asc">Ngày tạo cũ nhất ↑</option>
          <option value="price-desc">Giá từ cao đến thấp ↓</option>
          <option value="price-asc">Giá từ thấp đến cao ↑</option>
          <option value="stock-desc">Số lượng từ nhiều đến ít ↓</option>
          <option value="stock-asc">Số lượng từ ít đến nhiều ↑</option>
        </select>
        {/* <div className="w-[320px] flex items-center border-1 border-gray-300 rounded-sm pl-2.5">
          <input className="w-[40%] text-black/50" type="date" />
          <p className="px-1.5">đến</p>
          <input className="w-[40%] text-black/50" type="date" />
        </div> */}
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
  const { Products, setNewprd, filteredProducts, loading } = useContext(Listprdctx);
  const { Openpoprd, Opendelete } = useContext(Popctxoder);
  const { usersuccessful } = useContext(AuthContext);

  // Thêm component loading
  if (loading) {
    return (
      <div className="m-4 bg-white p-4 rounded shadow flex items-center justify-center h-[400px]">
        <CgSpinner className="animate-spin text-[#F68C20]" size={50} />
        <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );
  }

  // Thêm trường hợp không có sản phẩm
  if (!Products?.length) {
    return (
      <div className="m-4 bg-white p-4 rounded shadow flex items-center justify-center h-[400px]">
        <span className="text-gray-600">Không có sản phẩm nào</span>
      </div>
    );
  }

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
