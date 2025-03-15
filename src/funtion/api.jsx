const API_ODER = "https://ngochieuwedding.io.vn/api/order";
const API_PRODUCT = "https://ngochieuwedding.io.vn/api/phuong/product";
export const getApioder = async () => {
  try {
    const repct = await fetch(API_ODER);
    const data = await repct.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postApioder = async (value) => {
  try {
    const repct = await fetch(API_ODER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    return await repct.json();
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
//prd Apii
export const getApiprd = async () => {
  try {
    const repct = await fetch(API_PRODUCT);
    const data = await repct.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postApiprd = async (value) => {
  try {
    const repct = await fetch(API_PRODUCT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    return await repct.json();
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
// api get oder detail
export const GetapidetailOder = async (id) => {
  try {
    const repct = await fetch(`https://ngochieuwedding.io.vn/api/order/${id}`);
    const data = await repct.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// api update prd
export const putApiproduct = async (id, value) => {
  try {
    const API_PUT_PRD = `https://ngochieuwedding.io.vn/api/phuong/product/${id}`;
    const repct = await fetch(API_PUT_PRD, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    return await repct.json();
  } catch (error) {
    console.error(error);
  }
};
// Api delete prd 
export const DeleteApiproduct=async (id)=>{
  try{
    const API_DELET_PRD=`https://ngochieuwedding.io.vn/api/phuong/product/${id}`;
    const repct= await fetch(API_DELET_PRD,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    });
    const data= await repct.json();
    return data
  }
  catch(error){
    console.error(error);
  }
}
// Api update order
export const putApiorder = async (id, value) => {
  try {
    const API_PUT_ORDER = `https://ngochieuwedding.io.vn/api/order/${id}`;
    const repct = await fetch(API_PUT_ORDER, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
    return await repct.json();
  } catch (error) {
    console.error(error);
  }
};
// Api delete order
export const deleteApiorder = async (id) => {
  try {
    const API_DELETE_ORDER = `https://ngochieuwedding.io.vn/api/order/${id}`;
    const repct = await fetch(API_DELETE_ORDER, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    return await repct.json();
  } catch (error) {
    console.error(error);
  }
};
