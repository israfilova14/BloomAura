import {createBrowserRouter} from 'react-router-dom'
import App from '../App'

// PRIVATE ROUTE
import PrivateRoute from '../components/helpers/private_route'

// AUTHENTICATE ROUTES
import Login from '../components/pages/authenticate/login' 
import SignUp from '../components/pages/authenticate/signup'

// USER ROUTES
import Profile from '../components/pages/user/profile'

// ADMIN ROUTES
import AdminRoute from '../components/pages/admin/admin_route'
import UsersList from '../components/pages/admin/users_list'
import AllProducts from '../components/pages/admin/all_products'

// PRODUCTS ROUTES
import UploadProduct from '../components/pages/admin/upload_product'
import UpdateProduct from '../components/pages/admin/update_product'

// CATEGORY ROUTES
import CategoryList from '../components/pages/admin/category_list'
import Home from '../components/pages/home'

// FAVORİTES ROUTES
import Favorites from '../components/pages/products/favorites'
import ProductDetails from '../components/pages/products/product_details'
import Cart from '../components/pages/cart'
import Shop from '../components/pages/shop'
import Shipping from '../components/pages/orders/shipping'
import PlaseOrder from '../components/pages/orders/place_order'
import Order from '../components/pages/orders/order'
import UserOrders from '../components/pages/user/user_orders'
import OrderList from '../components/pages/admin/order_list'
import AdminDashboard from '../components/pages/admin/admin_dashboard'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
      children: [
        {
           path: '',
           element: <Home/>
        },
        {
          path: '/sign-in',
          element: <Login/>
        },
        {
          path: '/sign-up',
          element: <SignUp/>
        },
        {
          path: '/favorites',
          element: <Favorites/>
        },
        {
          path: '/product/:id',
          element: <ProductDetails/>
        },
        {
          path: '/cart',
          element: <Cart/>
        },
        {
          path: '/shop',
          element: <Shop/>
        },
        { 
           path: '/user-orders',
           element: <UserOrders/>
        },
        {
          path: '',
          element: <PrivateRoute/>,
          children: [
             {
                path: '/profile',
                element: <Profile/>
             },
             {
                path: '/shipping',
                element: <Shipping/>
             },
             {
                path: '/placeorder',
                element: <PlaseOrder/> 
             },
             {
                path: '/order/:id',
                element: <Order/>
             }
          ]
        },
        {
           path: '/admin',
           element: <AdminRoute/>,
           children: [
             {
               path: '/admin/users-list',
               element: <UsersList/>
             },
             {
              path: '/admin/category-list',
              element: <CategoryList/>
             },
             {
               path: '/admin/upload-product',
               element: <UploadProduct/>
             },
             {
                path: '/admin/update-product/:id',
                element: <UpdateProduct/>
             },
             {
                path: '/admin/all-products',
                element: <AllProducts/>
             },
             {
                path: '/admin/order-list',
                element: <OrderList/>
             },
             {
                 path: '/admin/dashboard',
                 element: <AdminDashboard/>
             }
           ]
        },
      ]
    }
  ]
)

export default router 