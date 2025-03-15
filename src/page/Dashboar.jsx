import React, { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { CiGrid41 } from "react-icons/ci"; // Import các icon từ react-icons/ci
import Header from "../component/Header";
import Navbarmenu from "../component/Navbar";
import ListOderprovider, { ListOderctx } from "../context/ListOderContext";
import Listprdprovider, { Listprdctx } from "../context/ListprdContext";
import TopProductChart from "../component/TopPrdchart";
///
const Displaychart = () => {
  const { orders } = useContext(ListOderctx);
  const { Products } = useContext(Listprdctx);

  // ngày
  const fromDay = (times) => {
    const date = new Date(times);
    return date.toISOString().split("T")[0];
  };
  // tháng
  const fromMonth = (times) => {
    const date = new Date(times);
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  };
  const fromYear = (times) => {
    return new Date(times).getFullYear().toString();
  };
  // tính doanh thu theo fitelfitel

  const processdatatotall = (orders, filter,Products) => {
    const revenueData = {};
    orders.forEach((item) => {
      let key;
      if (filter === "day") key = fromDay(item.createdAt);
      if (filter === "month") key = fromMonth(item.createdAt);
      if (filter === "year") key = fromYear(item.createdAt);
      console.log(key);
      
      const Findprd = Products.find((prd) => prd?._id === item?.product_id);
      const revenue = item?.quantity * Findprd?.price;
      if (!revenueData[key]) {
        revenueData[key] = 0;
      }
      revenueData[key] += revenue;            
    });
    //
    const chartData = [
      [
        filter === "day" ? "ngày" : filter === "month" ? "Tháng" : "Năm",
        "Doanh thu",
      ],
    ];
    Object.entries(revenueData).forEach(([date, Tortal]) => {
      chartData.push([date, Tortal]);
    });

    return chartData;
  };
  //
  const [chartData, setChartData] = useState([["Ngày", "Doanh thu"]]);
  const [filter, setFilter] = useState("day"); // Mặc định hiển thị theo ngày

  useEffect(() => {
    setChartData(processdatatotall(orders, filter, Products));
  }, [filter, Products, orders]);


  return (
    <div>
      <div className="p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          Doanh thu theo{" "}
          {filter === "day" ? "ngày" : filter === "month" ? "tháng" : "năm"}
        </h2>

        {/* Bộ lọc chọn ngày/tháng/năm */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Hiển thị theo:</label>
          <select
            className="border px-2 py-1 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="day">Ngày</option>
            <option value="month">Tháng</option>
            <option value="year">Năm</option>
          </select>
        </div>

        {/* Biểu đồ doanh thu */}
        {chartData && (
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={chartData}
            options={{
              title: `Doanh thu theo ${
                filter === "day" ? "ngày" : filter === "month" ? "tháng" : "năm"
              }`,
              hAxis: {
                title:
                  filter === "day"
                    ? "Ngày"
                    : filter === "month"
                    ? "Tháng"
                    : "Năm",
              },
              vAxis: { title: "Doanh thu (VNĐ)" },
              legend: "none",
              colors: ["#4CAF50"],
            }}
          />
        )}
      </div>
    </div>
  );
};

const Dashboar = () => {
  return (
    <Listprdprovider>
      <ListOderprovider>
        <div className="w-[1549px] h-[1618px] flex">
          <div className="w-[210px]">
            <Navbarmenu />
          </div>
          <div className="bg-gray-100 w-[1320px] ">
            <Header />
            <div className="flex">
              <CiGrid41 size={30} />
              <p className="font-bold">Tổng quan</p>
            </div>
            <div>
              <Displaychart />
            </div>
            <div>
              <TopProductChart/>
            </div>
          </div>
        </div>
      </ListOderprovider>
    </Listprdprovider>
  );
};

export default Dashboar;
