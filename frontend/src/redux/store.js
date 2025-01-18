import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../redux/features/auth/authSlice.js'
import favoritesReducer from '../redux/features/favorites/favoriteSlice.js'
import cartSliceReducer from '../redux/features/cart/cartSlice.js'
import shopSliceReducer from '../redux/features/shop/shopSlice.js'
import { getFavoritesFromLocalStorage } from "../utilities/localStorage.js"

const initialFavorites = getFavoritesFromLocalStorage() || []


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopSliceReducer
  },

  preloadedState: {
    favorites: initialFavorites
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true
})

setupListeners(store.dispatch)
export default store