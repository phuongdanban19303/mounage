import React, { useContext } from "react";
import { deleteApiorder } from "../funtion/api";
import { ListOderctx } from "../context/ListOderContext";

const PopDeleteOrder = ({ Ispopdelete, Closedelete }) => {
  const { setcheckapi } = useContext(ListOderctx);

  const handleDelete = async () => {
    const result = await deleteApiorder(Ispopdelete);
    if (result) {
      setcheckapi(pre => !pre);
      Closedelete();
    }
  };

  if (!Ispopdelete) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Xác nhận
        </h2>
        <p className="text-gray-700">
          Bạn có chắc chắn muốn xóa đơn hàng này không?
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
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopDeleteOrder; 