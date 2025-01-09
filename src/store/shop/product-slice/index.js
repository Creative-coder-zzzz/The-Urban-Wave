import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "@/store/config"; // Import the centralized API base URL

const initialState = { 
  isLoading: false,
  productList: [],
  productDetails: null,
};

console.log(initialState.productList);

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    // Ensure that category and brand are correctly formatted as strings
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    }).toString();

    console.log("Formatted Query String:", query);

    const result = await axios.get(
      `${API_BASE_URL}/shop/products/get?${query}` // Updated to use API_BASE_URL
    );
    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchAllProductDetails",
  async (id) => {
    const result = await axios.get(
      `${API_BASE_URL}/shop/products/get/${id}` // Updated to use API_BASE_URL
    );
    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shopProductSlice.actions;
export default shopProductSlice.reducer;
