import React, { createContext, useEffect, useState } from "react";
import { getApiprd } from "../funtion/api";

export const Listprdctx = createContext();

const Listprdprovider = ({ children }) => {
  const [Products, setProducts] = useState([]);
  const [check, setcheck] = useState(true);
  //
  const [Newprd, setNewprd] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  // getvalue
  const getPrdnew = (name, e) => {
    setNewprd((pre) => ({ ...pre, [name]: e }));
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getApiprd();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [check]);

  return (
    <Listprdctx.Provider
      value={{
        Products,
        setProducts,
        setcheck,
        getPrdnew,
        Newprd,
        setNewprd,
        filteredProducts,
        setFilteredProducts,
        loading,
        setLoading,
      }}
    >
      {children}
    </Listprdctx.Provider>
  );
};

export default Listprdprovider;
