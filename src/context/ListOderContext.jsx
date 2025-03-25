import React, { Children, useEffect, useState } from "react";
import { createContext } from "react";
import { getApioder, postApioder } from "../funtion/api";
import { CgSpinner } from "react-icons/cg";

export const ListOderctx = createContext();

const ListOderprovider = ({ children }) => {
  const [orders, setOrders] = useState([]); ///usesate
  const [Checkapi,setcheckapi]=useState(false);
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  ///xử lý API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getApioder();
        setOrders(data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [Checkapi]);

  return (
    <ListOderctx.Provider value={{ 
      orders, 
      setOrders, 
      setcheckapi,
      filteredOrders,
      setFilteredOrders,
      loading,
      setLoading
    }}>
      {children}
    </ListOderctx.Provider>
  );
};

export default ListOderprovider;
