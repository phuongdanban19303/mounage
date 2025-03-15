import { createContext, useRef } from "react";
import PopaddOer from "../component/PopaddOer";
import React from "react";
import { useState } from "react";
import Popaddprd from "../component/Popaddprd";
import Popdetail from "../component/Popdetail";
import PopDeleteprd from "../component/Popdeleteprd";
import PopDeleteOrder from "../component/PopDeleteOrder";
export const Popctxoder = createContext();

const Popprovideroder = ({ children }) => {
  const [Ispop, SetIspop] = useState(false);
  const [Ispopdr, SetIspoprd] = useState(false);
  const [Ispopdetail, SetIspopdetail] = useState(false);
  const [Ispopdelete, SetIspopdelete] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  
  const Openpop = (order = null) => {
    console.log("Openpop được gọi!");
    setEditingOrder(order);
    SetIspop(true);
  };
  const Closepop = () => {
    setEditingOrder(null);
    SetIspop(false);
  };
  const Openpoprd = () => {
    console.log("Openpop được gọi!");
    SetIspoprd(true);
  };
  const Closepoprd = () => {
    SetIspoprd(false);
  };
  const Opendetail = (id) => {
    console.log("Openpop được gọi!");
    SetIspopdetail(id);
  };
  const Closedetail = () => {
    SetIspopdetail(false);
  };
  ///
  const Opendelete = (id) => {
    console.log("Openpop được gọi!");
    SetIspopdelete(id);
  };
  const Closedelete = () => {
    SetIspopdelete(false);
  };
  
  const OpendeleteOrder = (id) => {
    setDeleteOrderId(id);
  };
  const CloseDeleteOrder = () => {
    setDeleteOrderId(null);
  };

  return (
    <Popctxoder.Provider value={{ 
      Openpop, 
      Openpoprd, 
      Opendetail, 
      Opendelete,
      OpendeleteOrder,
      Ispop,
      Closepop,
      Ispopdr,
      Closepoprd,
      Ispopdetail,
      Closedetail,
      Ispopdelete,
      Closedelete
    }}>
      {children}
      {Ispop && <PopaddOer Ispop={Ispop} ClosePop={Closepop} editOrder={editingOrder} />}
      {Ispopdr && <Popaddprd Ispopdr={Ispopdr} Closepoprd={Closepoprd}  />}
      {Ispopdetail && <Popdetail Ispopdetail={Ispopdetail} Closedetail={Closedetail}/>}
      {Ispopdelete && <PopDeleteprd Ispopdelete={Ispopdelete} Closedelete={Closedelete}/>}
      {deleteOrderId && <PopDeleteOrder Ispopdelete={deleteOrderId} Closedelete={CloseDeleteOrder} />}
    </Popctxoder.Provider>
  );
};

export default Popprovideroder;
