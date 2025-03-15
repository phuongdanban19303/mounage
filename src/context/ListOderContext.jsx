import React, { Children, useEffect, useState } from "react";
import { createContext } from "react";
import { getApioder, postApioder } from "../funtion/api";
export const ListOderctx = createContext();
const ListOderprovider = ({ children }) => {
  const [orders, setOrders] = useState([]); ///usesate
  const [Checkapi,setcheckapi]=useState(false)
  ///xử lý API
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getApioder();
      setOrders(data.data);
    };
    fetchOrders();
  }, [Checkapi]);
  return (
    <ListOderctx.Provider value={{ orders, setOrders,setcheckapi }}>
      {children}
    </ListOderctx.Provider>
  );
};

export default ListOderprovider;
