import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ListOderctx } from "../context/ListOderContext";
import { postApioder, putApiorder } from "../funtion/api";
import { Listprdctx } from "../context/ListprdContext";
import Select from "react-select";
import { CgSpinner } from "react-icons/cg";

const PopaddOer = ({ Ispop: check, ClosePop, editOrder = null }) => {
  const [newOrder, setNewOrder] = useState({
    client_name: "",
    address: "",
    phone: "",
    status: "Chưa thanh toán",
    product_id: "",
    quantity: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // context oder
  const { setcheckapi } = useContext(ListOderctx);
  // context product
  const { Products } = useContext(Listprdctx);

  useEffect(() => {
    if (editOrder) {
      setNewOrder({
        client_name: editOrder.client_name || "",
        address: editOrder.address || "",
        phone: editOrder.phone || "",
        status: editOrder.status || "Chưa thanh toán",
        product_id: editOrder.product_id || "",
        quantity: editOrder.quantity || "",
      });
    }
  }, [editOrder]);

  // Get value input nhập vào
  const GetvalueOder = (name, e) => {
    setError("");
    setNewOrder((pre) => ({ ...pre, [name]: e }));
  };

  // Validate form
  const validateForm = () => {
    if (!newOrder.client_name) {
      setError("Vui lòng nhập tên khách hàng");
      return false;
    }
    if (!newOrder.phone) {
      setError("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!newOrder.address) {
      setError("Vui lòng nhập địa chỉ");
      return false;
    }
    if (!newOrder.product_id) {
      setError("Vui lòng chọn sản phẩm");
      return false;
    }
    if (!newOrder.quantity || newOrder.quantity <= 0) {
      setError("Vui lòng nhập số lượng hợp lệ");
      return false;
    }
    return true;
  };

  // handle save order (create or update)
  const handleSaveOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      let result;
      if (editOrder) {
        result = await putApiorder(editOrder._id, newOrder);
      } else {
        result = await postApioder(newOrder);
      }

      if (result) {
        setcheckapi((pre) => !pre);
        ClosePop();
      } else {
        setError("Có lỗi xảy ra khi lưu đơn hàng");
      }
    } catch (err) {
      setError("Có lỗi xảy ra: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // select options
  const options = Products?.map((prd) => ({
    value: prd?._id,
    label: prd?.name,
  }));

  const selectedProduct = Products?.find(
    (prd) => prd._id === newOrder.product_id
  );

  return (
    <>
      {check && (
        <div className="fixed inset-0 bg-black/50 flex justify-center z-50">
          <div className="w-[800px] h-[650px] mt-4 bg-white shadow-lg relative">
            <div className="flex gap-1.5 p-5">
              <IoMdArrowRoundBack onClick={() => ClosePop()} size={20} />
              <p className="font-bold">
                {editOrder ? "Cập nhật đơn hàng" : "Thêm mới đơn hàng"}
              </p>
            </div>

            <form onSubmit={handleSaveOrder}>
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}
              <div className="flex justify-end mr-6.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-blue-600 flex items-center
                      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <CgSpinner className="animate-spin mr-2" size={20} />
                    {editOrder ? "Đang cập nhật..." : "Đang lưu..."}
                  </>
                ) : editOrder ? (
                  "Cập nhật"
                ) : (
                  "Lưu"
                )}
              </button>
              </div>
              <div>
                <p className="pl-10 italic">
                  <span className="text-red-700">*</span> Thông tin khách hàng
                </p>
                <div className="flex justify-around mt-2">
                  <div>
                    <div>
                      <p>
                        Khách hàng <span className="text-red-500">*</span>
                      </p>
                      <input
                        onChange={(e) =>
                          GetvalueOder("client_name", e.target.value)
                        }
                        value={newOrder.client_name}
                        className="w-[249px] border-1 border-gray-300 rounded-sm p-1"
                        type="text"
                      />
                    </div>
                    <div className="mt-4">
                      <p>
                        Địa chỉ <span className="text-red-500">*</span>
                      </p>
                      <input
                        className="w-[249px] border-1 border-gray-300 rounded-sm p-1"
                        type="text"
                        value={newOrder.address}
                        onChange={(e) =>
                          GetvalueOder("address", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>
                        Số điện thoại <span className="text-red-500">*</span>
                      </p>
                      <input
                        className="w-[249px] border-1 border-gray-300 rounded-sm p-1"
                        type="text"
                        value={newOrder.phone}
                        onChange={(e) => GetvalueOder("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <p className="pl-10 italic mt-6">
                  <span className="text-red-700">*</span> Thông tin đơn hàng
                </p>

                <div className="flex justify-around m-2 mb-12">
                  <div className="w-[30%] mr-10">
                    <div>
                      <p>
                        Sản phẩm <span className="text-red-500">*</span>
                      </p>
                      <Select
                        options={options}
                        placeholder="Chọn sản phẩm..."
                        isSearchable={true}
                        value={options.find(
                          (opt) => opt.value === newOrder.product_id
                        )}
                        styles={{
                          control: (base) => ({
                            ...base,
                            width: "249px",
                            border: "1px solid #d1d5db",
                            borderRadius: "0.125rem",
                          }),
                        }}
                        onChange={(selectedOption) =>
                          GetvalueOder("product_id", selectedOption?.value)
                        }
                      />
                    </div>
                    <div className="mt-4">
                      <p>
                        Số lượng <span className="text-red-500">*</span>
                      </p>
                      <input
                        className="w-[249px] border-1 border-gray-300 rounded-sm p-1"
                        type="number"
                        min="1"
                        value={newOrder.quantity}
                        onChange={(e) =>
                          GetvalueOder("quantity", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="w-[30%] mr-5">
                    <div>
                      <p className="font-semibold">Thành tiền:</p>
                      <p className="text-xl text-blue-600 font-bold mt-2">
                        {selectedProduct
                          ? (
                              selectedProduct.price * (newOrder.quantity || 0)
                            ).toLocaleString("vi-VN")
                          : 0}{" "}
                        đ
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4"></div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopaddOer;
