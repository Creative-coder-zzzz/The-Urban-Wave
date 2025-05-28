import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { API_BASE_URL } from "@/store/config";
const initialState = { 
  cartItems: [],
  isLoading: false,
  error: null,
};

// Base API URL for convenience
const BASE_URL = `https://server-mern-cloth-shop-1.onrender.com/api/shop/cart`;

// Thunks for handling async operations
export const addToCart = createAsyncThunk(
  'shoppingCart/addToCart', 
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, {
        userId, productId, quantity
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  'shoppingCart/fetchCartItems', 
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'shoppingCart/deleteCartItem', 
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${userId}/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'shoppingCart/updateCartQuantity', 
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-cart`, {
        userId, productId, quantity
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add item to cart";
      })

      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch cart items";
      })

      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update cart quantity";
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete item from cart";
      });
  },
});

export default shoppingCartSlice.reducer;
