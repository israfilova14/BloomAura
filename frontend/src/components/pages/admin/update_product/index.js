import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../../../redux/api/productApiSlice"
import { useGetAllCategoriesQuery } from "../../../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "../admin_menu"

const UpdateProduct = () => {
  const params = useParams()
  const navigate = useNavigate();

  const { data: productData, refetch } = useGetProductByIdQuery(params.id)
  const { data: categories = [] } = useGetAllCategoriesQuery()

  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    description: "",
    price: "",
    quantity: "",
    countInStock: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (productData && productData._id) {
      setData({
        name: productData.name || "",
        brand: productData.brand || "",
        category: productData.category || "",
        image: productData.image || "",
        description: productData.description || "",
        price: productData.price || "",
        quantity: productData.quantity || "",
        countInStock: productData.countInStock || "",
      })
      setImagePreview(productData.image || "")
    }
  }, [productData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target
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
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
      toast.success("Image Uploaded Successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("brand", data.brand);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("countInStock", data.countInStock);

      const result = await updateProduct({ productId: params.id, formData });
      console.log('update result', result);
      

      if (result?.error) {
        toast.error(result.error.message || "Product update failed.");
      } else {
        toast.success("Product Updated Successfully");
        refetch()
        navigate("/admin/all-products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try again");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm('Are you sure you want to delete this product?')

      if(answer){
        const result = await deleteProduct(params.id);
        if (result?.error) {
          toast.error(result.error.message || "Failed to delete product.");
        } else {
          toast.success("Product Deleted Successfully");
          refetch()
          navigate("/admin/all-products");
        }
      }

      if(!answer) return
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-2xl font-semibold">Update <span className="text-[#d81b60]">Product.</span></div>
          {imagePreview && (
            <div className="text-center">
              <img
                src={imagePreview}
                alt="product"
                className="block mx-auto h-[200px] w-[200px] object-scale-down"
              />
            </div>
          )}

          <div className="mb-3">
            <label
              className="border border-[#2c2c2c] bg-white px-4 block w-[99%] text-center text-base 
              rounded-lg cursor-pointer font-semibold py-11"
            >
              {data.image ? "Image Uploaded" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-3">
              <div className="flex flex-wrap justify-between">
                <div className="one">
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="p-4 mb-2 w-[30rem] border rounded-lg"
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
                    className="p-4 mb-2 w-[30rem] border rounded-lg"
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
                    className="p-4 mb-2 w-[30rem] border rounded-lg"
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
                    className="p-4 mb-2 w-[30rem] border rounded-lg"
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
                className="p-2 mb-2 border rounded-lg w-[99%]"
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
                    className="p-4 mb-2 w-[30rem] border rounded-lg"
                    placeholder="Enter stock count..."
                    value={data?.countInStock}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="label">
                  <label htmlFor="category">Category</label>
                  <br />
                  <select
                    name="category"
                    className="p-4 mb-2 w-[30rem] border rounded-lg"
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

            <div className="p-3 flex gap-12">
              <button
                type="submit"
                className="py-3 px-10 mt-1 rounded-lg text-base font-semibold bg-[#007f5f] text-white hover:bg-[#00a375]"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-3 px-10 mt-1 rounded-lg text-base font-semibold bg-[#e53935] text-white hover:bg-[#d32f2f]"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
