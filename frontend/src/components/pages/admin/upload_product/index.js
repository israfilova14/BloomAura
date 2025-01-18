import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../../../../redux/api/productApiSlice.js';
import { useGetAllCategoriesQuery } from '../../../../redux/api/categoryApiSlice.js';
import { toast } from 'react-toastify';
import AdminMenu from '../admin_menu/index.js';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: '',
    brand: '',
    category: '',
    image: '',
    description: '',
    price: '',
    quantity: '',
    countInStock: '',
  })

  const [imagePreview, setImagePreview] = useState(null)
  const { data: categories } = useGetAllCategoriesQuery()
  const [addProduct] = useAddProductMutation()
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        image: file, // Store the file object
      }));
      toast.success("Image Uploaded Successfully")
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!data.image) {
        return toast.error('Image not selected');
      }

      const productData = new FormData();
      productData.append('image', data.image);
      productData.append('name', data.name);
      productData.append('brand', data.brand);
      productData.append('description', data.description);
      productData.append('price', data.price);
      productData.append('category', data.category);
      productData.append('quantity', data.quantity);
      productData.append('countInStock', data.countInStock);

      const response = await addProduct(productData);

      if (response.error) {
        toast.error('Product creation failed. Try again');
      } else {
        toast.success('Product uploaded successfully');
        navigate('/admin/all-products');
      }
    } catch (error) {
      console.error(error);
      toast.error('Creating product failed, please try again');
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-2xl font-semibold">
            Upload <span className='text-[#d81b60]'>Product.</span>
          </div>
          {imagePreview && (
            <div className="text-center">
              <img
                src={imagePreview}
                alt="product"
                className="block mx-auto h-[210px] w-[210px] object-scale-down"
              />
            </div>
          )}

          <div className="mb-3">
            <label 
              className="border border-[#2c2c2c] bg-white px-4 block w-[99%] text-center text-base rounded-lg cursor-pointer font-semibold py-11"
            >
              {data.image ? 'Image Uploaded' : 'Upload Image'}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={onSubmitHandler}>
            <div className="p-3">
              <div className="flex flex-wrap justify-between">
                <div className="one">
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="p-4 mb-3 w-[30rem] border rounded-lg"
                    placeholder="Enter product name..."
                    value={data.name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="two">
                  <label htmlFor="price">Price</label>
                  <br />
                  <input
                    type="number"
                    name="price"
                    className="p-4 mb-3 w-[30rem] border rounded-lg"
                    placeholder="Enter product price..."
                    value={data.price}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap justify-between">
                <div className="three">
                  <label htmlFor="quantity">Quantity</label>
                  <br />
                  <input
                    type="number"
                    name="quantity"
                    className="p-4 mb-3 w-[30rem] border rounded-lg"
                    placeholder="Enter product quantity..."
                    value={data.quantity}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="four">
                  <label htmlFor="brand">Brand</label>
                  <br />
                  <input
                    type="text"
                    name="brand"
                    className="p-4 mb-3 w-[30rem] border rounded-lg"
                    placeholder="Enter brand name..."
                    value={data.brand}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="p-3">
              <label htmlFor="description" className="my-5">
                Description
              </label>
              <textarea
                name="description"
                className="p-2 mb-3 border rounded-lg w-[99%]"
                placeholder='Enter product description...'
                value={data.description}
                onChange={handleOnChange}
              ></textarea>
            </div>

            <div className="p-3">
              <div className="flex justify-between flex-wrap">
                <div className="label">
                  <label htmlFor="countInStock">Count In Stock</label>
                  <br />
                  <input
                    type="number"
                    name="countInStock"
                    className="p-4 mb-3 w-[30rem] border rounded-lg"
                    placeholder="Enter stock count..."
                    value={data.countInStock}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="label">
                  <label htmlFor="category">Category</label>
                  <br />
                  <select
                    name="category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg"
                    value={data.category}
                    onChange={handleOnChange}
                  >
                    <option value="" disabled>
                      Choose Category
                    </option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='p-3'>
              <button
                  type="submit"
                  className="py-3 px-10 mt-3 rounded-lg text-base font-semibold bg-[#d81b60] hover:bg-[#c2185b] text-white"
                >
                  Upload
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
