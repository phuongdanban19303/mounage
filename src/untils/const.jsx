import { CiBoxList, CiGrid41 } from "react-icons/ci"; // Import các icon từ react-icons/ci
import { FiUser } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2"; // khách 
import { MdBookmarkBorder, MdOutlineManageAccounts } from "react-icons/md"; // đơn hàng
import { PiPackageThin } from "react-icons/pi"; // sản phẩm
; // quản lý



export const Objectmenu = [
  { icon: <CiGrid41 />, title: "Tổng quan",linkto:"/" },
  { icon: <HiOutlineUsers />, title: "Khách hàng",linkto:"/customers" },
  { icon: <PiPackageThin />, title: "Sản phẩm",linkto:"/products" },
  { icon: <CiBoxList />, title: "Danh mục",linkto:"/categories" },
  { icon: <MdBookmarkBorder />, title: "Đơn hàng",linkto:"/orders" },
  { icon: <FiUser/>, title: "Tài khoản",linkto:"/login" },
  { icon: <MdOutlineManageAccounts />, title: "Quản lý",linkto:"/roles" },
 
];

export const ListPrd= [
  {
    id: 1,
    name: "Áo phông nam oversize",
    categories: ["Áo phông", "Thời trang nam"],
    price: 250000,
    quantity: 10,
    createdDate: "2024-03-04",
  },
  {
    id: 2,
    name: "Chân váy xoè",
    categories: ["Chân váy", "Thời trang nữ"],
    price: 320000,
    quantity: 15,
    createdDate: "2024-03-02",
  },
  {
    id: 3,
    name: "Áo len Quảng Châu",
    categories: ["Thời trang thu đông", "Thời trang nữ"],
    price: 450000,
    quantity: 20,
    createdDate: "2024-03-01",
  },
  {
    id: 4,
    name: "Áo polo nam",
    categories: ["Áo polo", "Thời trang nam"],
    price: 280000,
    quantity: 25,
    createdDate: "2024-02-28",
  },
  {
    id: 5,
    name: "Váy hoa nhí",
    categories: ["Thời trang nữ"],
    price: 300000,
    quantity: 30,
    createdDate: "2024-02-27",
  }
  
  ]
// đơn hàng 
export const ListOder= [
  {
    id: "DH12345",
    product: "Laptop Dell Inspiron 15",
    quantity: 1,
    name: "Nguyễn Văn A",
    phone: "0987654321",
    payment: "Bank Transfer",
    amount: 15000000,
    address: " Ho Chi Minh City",
    date: "2025-03-05"
  },
  {
    id: "DH12346",
    product: "iPhone 14 Pro",
    quantity: 2,
    name: "Trần Thị B",
    phone: "0978123456",
    payment: "Cash ",
    amount: 28000000,
    address: "District 5, Ho Chi Minh City",
    date: "2025-03-04"
  },
  {
    id: "DH12347",
    product: "Sony WH-1000XM5 p-4",
    quantity: 1,
    name: "Lê Hoàng ",
    phone: "0965234789",
    payment: "Bank Transfer",
    amount: 8500000,
    address: "Phan Xích Long, Phu Nhuan",
    date: "2025-03-03"
  },
  {
    id: "DH12348",
    product: "Canon EOS R6 Camera",
    quantity: 12,
    name: "Phạm Văn D",
    phone: "0956347892",
    payment: "Installment",
    amount: 54000000,
    address: "12 Võ Văn Kiệt",
    date: "2025-03-02"
  },
  {
    id: "DH12349",
    product: "Logitech G Pro X Keyboard",
    quantity: 3,
    name: "Đặng Thị E",
    phone: "0947586932",
    payment: "Cash",
    amount: 3200000,
    address: "34 Hoàng Hoa Thám",
    date: "2025-03-01"
  },
  {
    id: "DH12350",
    product: "Sihoo M57 Chair",
    quantity: 2,
    name: "Vũ Minh F",
    phone: "0938674521",
    payment: "Bank Transfer",
    amount: 6500000,
    address: " Ho Chi Minh City",
    date: "2025-02-28"
  }
];
//
export const KEY_USER_successful="successful"
