import React, { useContext } from "react";
import { DeleteApiproduct } from "../funtion/api";
import { Listprdctx } from "../context/ListprdContext";
import { ListOderctx } from "../context/ListOderContext";

const PopDeleteprd = ({ Ispopdelete, Closedelete }) => {
  const { setcheck } = useContext(Listprdctx);
  const { orders } = useContext(ListOderctx);
  console.log(orders);
  const findoder = orders?.find((ord) => ord.product_id === Ispopdelete);
  console.log(findoder);

  const handleDelete = async () => {
    if (findoder) {
      alert("ban k the xoa ");
      return;
    }
    const relust = await DeleteApiproduct(Ispopdelete);
    if (relust) {
      setcheck((pre) => !pre);
      Closedelete();
    }
  };
  if (!Ispopdelete) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Xác nhận xóa
        </h2>
        <p className="text-gray-700">
          Bạn có chắc chắn muốn xóa đơn hàng <strong>123</strong> không?
        </p>
        <div className="flex justify-end gap-3 mt-5">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={() => Closedelete()}
          >
            Hủy
          </button>
          <button
            onClick={() => handleDelete()}
            className="bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopDeleteprd;
