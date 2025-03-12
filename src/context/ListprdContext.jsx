import React, { createContext, useEffect, useState } from "react";
import { getApiprd } from "../funtion/api";
export const Listprdctx = createContext();
const Listprdprovider = ({children}) => {
  const[Products,Setproducts]=useState([]);
  const[check,setcheck]=useState(true);
  //
  const [Newprd, setNewprd] = useState({});
  
  // getvalue
  const getPrdnew = (name, e) => {
   setNewprd((pre) => ({ ...pre, [name]: e }));
 };
  useEffect(()=>{
     const fetchprodcut = async()=>{
      const data= await getApiprd();
        Setproducts(data.data)
     }
     fetchprodcut();
  },[check])
  return <Listprdctx.Provider value={{Products,Setproducts,setcheck,getPrdnew,Newprd,setNewprd}}>
     {children}
  </Listprdctx.Provider>;
};

export default Listprdprovider;
