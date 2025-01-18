import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useGetUsersQuery } from '../../../../redux/api/usersApiSlice.js'
import {
  useTotalOrdersQuery,
  useTotalSalesQuery,
  useTotalSalesByDateQuery
} from '../../../../redux/api/orderApiSlice.js'
import AdminMenu from '../admin_menu/index.js'
import OrderList from '../order_list/index.js'
import Loader from '../../../helpers/loader/index.js'
import { SiMoneygram } from "react-icons/si"
import { MdPeopleAlt } from "react-icons/md"
import { TbBorderSides } from "react-icons/tb"

// Add the necessary CSS import for ApexCharts
import 'apexcharts/dist/apexcharts.css'

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useTotalSalesQuery()
  const { data: customers, isLoading: loadingUsers } = useGetUsersQuery()
  const { data: orders, isLoading: loadingOrders } = useTotalOrdersQuery()
  const { data: salesDetails } = useTotalSalesByDateQuery()

  const [state, setState] = useState({
    options: {
      chart: {
        type: 'line' // Set to 'line' for line chart
      },
      tooltip: {
        theme: 'dark'
      },
      colors: ['#00805e'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Sales Trend',
        align: 'left'
      },
      grid: {
        borderColor: "#2c2c2c",
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Date'
        }
      },
      yaxis: {
        title: {
          text: 'Sales'
        },
        min: 0
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
    series: [
      { name: 'Sales', data: [] }
    ]
  });

  useEffect(() => {
    if (salesDetails) {
      // Log salesDetails to inspect data structure
      console.log(salesDetails);

      const formattedSalesDate = salesDetails.map((item) => ({
        x: item._id, // Assuming _id is the date or a unique identifier for categories
        y: item.totalSales // Assuming totalSales contains the sales number
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x)
          }
        },
        series: [
          { name: 'Sales', data: formattedSalesDate.map((item) => item.y) }
        ]
      }));
    }
  }, [salesDetails]);

  // Handle loading state for data
  const isLoading = loadingSales || loadingUsers || loadingOrders;

  return (
    <div>
      <AdminMenu />
      <section className='xl:ml-[7rem] md:ml-[0rem]'>
        <div className='w-[80%] flex justify-around flex-wrap'>
          <div className='rounded-lg p-5 w-[20rem] mt-5 bg-[#4c4c4c] text-white'>
            <div className='font-bold rounded-full w-[3rem] h-[3rem] bg-[#d81b60] text-center text-white flex items-center justify-center'>
              <SiMoneygram size={21} />
            </div>
            <p className='mt-5'>Sales</p>
            <h1 className='text-xl font-bold'>
              {isLoading ? <Loader /> : `$${sales?.toFixed(2)}`}
            </h1>
          </div>
          <div className='rounded-lg p-5 w-[20rem] mt-5 bg-[#4c4c4c] text-white'>
            <div className='font-bold rounded-full w-[3rem] h-[3rem] bg-[#d81b60] text-center text-white flex items-center justify-center'>
              <MdPeopleAlt size={21} />
            </div>
            <p className='mt-5'>Customers</p>
            <h1 className='text-xl font-bold'>
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className='rounded-lg p-5 w-[20rem] mt-5 bg-[#4c4c4c] text-white'>
            <div className='font-bold rounded-full w-[3rem] h-[3rem] bg-[#d81b60] text-center text-white flex items-center justify-center'>
              <TbBorderSides size={21} />
            </div>
            <p className='mt-5'>All Orders</p>
            <h1 className='text-xl font-bold'>
              {isLoading ? <Loader /> : orders}
            </h1>
          </div>
        </div>
        <div className='ml-[6rem] mt-[3rem]'>
          {/* Render the chart with correct type and state */}
          <Chart options={state.options} series={state.series} type='line' width='70%' />
        </div>
        <div className='mt-[4rem]'><OrderList/></div>
      </section>
    </div>
  );
}

export default AdminDashboard;
