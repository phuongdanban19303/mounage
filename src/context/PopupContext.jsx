import { createContext } from "react";
import PopaddOer from "../component/PopaddOer";
import React from "react";
import { useState } from "react";
import Popaddprd from "../component/Popaddprd";
import Popdetail from "../component/Popdetail";
import PopDeleteprd from "../component/Popdeleteprd";
export const Popctxoder = createContext();

const Popprovideroder = ({ children }) => {
  const [Ispop, SetIspop] = useState(false);
  const [Ispopdr, SetIspoprd] = useState(false);
  const [Ispopdetail, SetIspopdetail] = useState(false);
  const [Ispopdelete, SetIspopdelete] = useState(false);
  const Openpop = () => {
    console.log("Openpop được gọi!");
    SetIspop(true);
  };
  const Closepop = () => {
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


  return (
    <Popctxoder.Provider value={{ Openpop,Openpoprd,Opendetail,Opendelete}}>
      {children}
      {Ispop && <PopaddOer Ispop={Ispop} ClosePop={Closepop} />}
      {Ispopdr && <Popaddprd Ispopdr={Ispopdr} Closepoprd={Closepoprd}  />}
      {Ispopdetail && <Popdetail Ispopdetail={Ispopdetail} Closedetail={Closedetail}/>}
      {Ispopdelete&& <PopDeleteprd Ispopdelete={Ispopdelete} Closedelete={Closedelete}/>}
    </Popctxoder.Provider>
  );
};

export default Popprovideroder;
