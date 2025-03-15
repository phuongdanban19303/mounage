// TopProductChart.jsx
import React, { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { ListOderctx } from "../context/ListOderContext";
import { Listprdctx } from "../context/ListprdContext";

const TopProductChart = () => {
  const { orders } = useContext(ListOderctx);
  const { Products } = useContext(Listprdctx);
  const [filter, setFilter] = useState("month");
  const [chartData, setChartData] = useState([["Product", "Revenue"]]);
 orders.fo
  // Date formatting functions
  const fromDay = (times) => new Date(times).toISOString().split("T")[0];
  const fromMonth = (times) => `${new Date(times).getFullYear()}-${new Date(times).getMonth() + 1}`;
  const fromYear = (times) => new Date(times).getFullYear().toString();

  // Process data for top products
  const processTopProducts = ( filter) => {
    const productRevenue = {};

    orders.forEach((order) => {
      let shouldInclude = true;
      const orderDate = new Date(order.createdAt);
      const currentDate = new Date();

      // Filter by selected time period
      switch (filter) {
        case "day":
          shouldInclude = fromDay(orderDate) === fromDay(currentDate);
          break;
        case "month":
          shouldInclude = fromMonth(orderDate) === fromMonth(currentDate);
          break;
        case "year":
          shouldInclude = fromYear(orderDate) === fromYear(currentDate);
          break;
        default:
          break;
      }

      if (shouldInclude) {
        const product = Products.find((prd) => prd?._id === order?.product_id);
        if (product) {
          const revenue = order.quantity * product.price;
          const productName = product.name 
          
          if (!productRevenue[productName]) {
            productRevenue[productName] = 0;
          }
          productRevenue[productName] += revenue;
        }
      }
    });

    // Convert to array and sort by revenue
    const sortedProducts = Object.entries(productRevenue)
      .sort(([, revenueA], [, revenueB]) => revenueB - revenueA);
    
    // Prepare chart data
    const data = [["Product", "Revenue"], ...sortedProducts];
    return data;
  };

  useEffect(() => {
    if (orders && Products) {
      setChartData(processTopProducts(filter));
    }
  }, [orders, Products, filter]);

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        Top doanh thu sản phẩm theo
        {filter === "day" ? "(ngày)" : filter === "month" ? "(tháng)" : "(năm)"}
      </h2>

      {/* Filter selection */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Hiển thị theo:</label>
        <select
          className="border px-2 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="day">Ngày</option>
          <option value="month">Tháng </option>
          <option value="year">Năm</option>
          
        </select>
      </div>

      {/* Pie Chart */}
      {chartData.length > 1 ? (
        <Chart
          chartType="PieChart" // Thay đổi thành PieChart
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: `Doanh thu theo ${
              filter === "day" ? "ngày" : filter === "tháng" ? "Monthly" : "năm"
            }`,
            pieHole: 0.4, // Tạo hiệu ứng donut (tùy chọn)
            is3D: false, // Có thể đổi thành true nếu muốn 3D
            legend: {
              position: "right",
              alignment: "center",
            },
            chartArea: {
              width: "80%",
              height: "70%"
            },
            slices: {
              // Tùy chọn màu sắc cho các phần (có thể tùy chỉnh)
            },
          }}
        />
      ) : (
        <p>No data available for the selected period</p>
      )}
    </div>
  );
};

export default TopProductChart;