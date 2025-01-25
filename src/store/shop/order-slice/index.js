import { API_BASE_URL } from "@/store/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderId: null,
  isLoading: false,
  error: null,
  // RecentOrders: null,
};



export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://server-mern-cloth-shop.onrender.com/api/shop/orders/create`,
        orderData
      );
      return response.data; // Razorpay order details
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyPaymentandSaveOrder = createAsyncThunk("order/verifyAndSaveOrder", async({razorpayResponse, orderData}, {rejectWithValue}) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/api/shop/orders/verify`, {
      razorpay_order_id : razorpayResponse.razorpay_order_id,
      razorpay_payment_id : razorpayResponse.razorpay_payment_id,
      razorpay_signature: razorpayResponse.razorpay_signature, orderData
    }
  )

  return response.data
  }catch(error){
    return rejectWithValue(error.response.data.message || 'verification failed')
  }
})




export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/shop/orders/fetch`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Orders could not be fetched');
    }
  }
);
 

export const recentOrders = createAsyncThunk('order/recent-orders', async()=> {
  try{
    const response = await axios.get(`${API_BASE_URL}/api/shop/orders/recent-orders`)

    return response.data
  }catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Orders could not be fetched');
  }
})
const orderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
       
      })
      .addCase(verifyPaymentandSaveOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyPaymentandSaveOrder.fulfilled, (state, action) => {

        state.isLoading = false;
       
     
      })
      .addCase(verifyPaymentandSaveOrder.rejected, (state, action) => {
        state.isLoading = false;
      })   .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {

        state.isLoading = false;

     
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
      })


      .addCase(recentOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(recentOrders.fulfilled, (state, action) => {

        state.isLoading = false;
        // state.RecentOrders = action.payload
     
      })
      .addCase(recentOrders.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
