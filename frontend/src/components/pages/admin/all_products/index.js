import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAllProductsQuery } from '../../../../redux/api/productApiSlice'
import moment from 'moment'
import Loader from '../../../helpers/loader'
import AdminMenu from '../admin_menu'

const AllProducts = () => {
  const { data: response, isLoading, isError } = useAllProductsQuery()
  const products = response?.allProducts || [] // Adjust based on API response structure

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(6)

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage)

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Error loading products</div>
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="container mx-[5rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-1">
          <div className="ml-[2rem] text-2xl font-semibold h-12 flex items-center gap-4">
            <p>
              All <span className="text-[#d81b60] relative">Products.</span>
            </p>
            <span className="text-xl absolute right-20">Total: {products.length}</span>
          </div>

          <div className="flex justify-between flex-wrap items-center">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="mb-4 overflow-hidden border border-[#2c2c2c] bg-[#ebedef] rounded-lg p-2 h-[12rem] w-[42rem]"
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[9rem] h-[10rem] object-scale-down mix-blend-multiply"
                  />
                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex justify-between">
                      <h5 className="text-lg font-semibold mb-2">{product?.name}</h5>
                      <p className="text-gray-700 text-sm">
                        {moment(product.createdAt).format('MMMM Do YYYY')}
                      </p>
                    </div>

                    <p className="text-gray-700 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] mb-4">
                      {product?.description}
                    </p>

                    <div className="flex justify-between">
                      <Link
                        to={`/admin/update-product/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
                           bg-[#d81b60] rounded-lg hover:bg-[#c2185b] focus:ring-2 focus:outline-none focus:ring-[#c2185b]
                           dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                      >
                        Update Product
                      </Link>
                      <p className="text-gray-700">${product?.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-1 border rounded ${
                  currentPage === index + 1
                    ? 'bg-[#d81b60] text-white'
                    : 'bg-white border-[#2c2c2c]'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  )
}

export default AllProducts
