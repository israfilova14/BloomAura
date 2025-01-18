const backendDomen = process.env.REACT_APP_FRONTEND_URL

const SummaryApi = {
  // USER ROUTES
  sign_up: {
    url: `${backendDomen}/users/create-user`,
    method: 'post'
  },

  sign_in: {
    url: `${backendDomen}/users/auth-user`,
    method: 'post'
  },

  logoutUser: {
    url: `${backendDomen}/users/logout-user`,
    method: 'post'
  },

  allUsers: {
    url: `${backendDomen}/users/all-users`,
    method: 'get'
  },

  currentUserProfile: {
    url: `${backendDomen}/users/user-profile`,
    method: 'get'
  },

  updateUserProfile: {
    url: `${backendDomen}/users/update-profile`,
    method: 'put'
  },

  deleteUser: {
    url: `${backendDomen}/users/delete-user`,
    method: 'delete'
  },

  getUser: {
    url: `${backendDomen}/users/get-user`,
    method: 'get'
  },

  updateUser: {
    url: `${backendDomen}/users/update-user`,
    method: 'put'
  },

  // CATEGORY ROUTES
   createCategory: {
     url: `${backendDomen}/category/create-category`,
     method: "post"
   },

   updateCategory: {
      url: `${backendDomen}/category/update-category`,
      method: "put"
   },

   deleteCategory: {
      url: `${backendDomen}/category/delete-category`,
      method: "delete"
   },

   allCategories: {
      url: `${backendDomen}/category/all-categories`,
      method: "get"
   },

   getCategory: {
      url: `${backendDomen}/category`,
      method: "get"
   },

   // PRODUCTS ROUTES
   addProduct: {
       url: `${backendDomen}/products/add-product`,
       method: 'post'
   },

   updateProduct: {
        url: `${backendDomen}/products/update-product`,
        method: 'put'
   },

   deleteProduct: {
        url: `${backendDomen}/products/delete-product`,
        method: 'delete'
   },

   currentProducts: {
        url: `${backendDomen}/products/get-products`,
        method: 'get'
   },

   allProducts: {
        url: `${backendDomen}/products/all-products`,
        method: 'get'
   },

   getProduct: {
         url: `${backendDomen}/products`,
         method: 'get'
   },

   productReview: {
         url: `${backendDomen}/products/product-reviews`,
         method: 'post'
   },

   topProducts: {
         url: `${backendDomen}/products/top-products`,
         method: 'get'
   },

   newProducts: {
          url: `${backendDomen}/products/new-products`,
          method: 'get'
   },

   filteredProducts: {
          url: `${backendDomen}/products/filtered-products`,
          method: 'post'
   },

   // ORDER ROUTES
   createOrder: {
        url: `${backendDomen}/orders/create-order`,
        method: 'post'
   },

   allOrders: {
        url: `${backendDomen}/orders/all-orders`,
        method: 'get'
   },

   userOrders: {
        url: `${backendDomen}/orders/user-orders`,
        method: 'get'
   },

   totalOrders: {
       url: `${backendDomen}/orders/total-orders`,
       method: 'get'
   },

   totalSales: {
       url: `${backendDomen}/orders/total-sales`,
       method: 'get'
   },

   totalSalesByDate: {
        url: `${backendDomen}/orders/total-sales-by-date`,
        method: 'get'
   },

   findOrder: {
        url: `${backendDomen}/orders`,
        method: 'get'
   },

   markOrderAsPaid: {
        url: `${backendDomen}/orders/pay`,
        method: 'put'
   },

   markOrderAsDelivered: {
        url: `${backendDomen}/orders/deliver`,
        method: 'put'
   },

   getPayPalClientId: {
        url: `${backendDomen}/api/config/paypal`,
   }
}

export default SummaryApi