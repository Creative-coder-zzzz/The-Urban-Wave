import { API_BASE_URL } from "@/store/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: []
}

export const addNewAddress = createAsyncThunk('/addAddress', async(formData)=>{

  
 const response = await axios.post(`${API_BASE_URL}/api/shop/address/add`, formData)
 return response.data;
})

export const fetchAllAddress = createAsyncThunk('/fetchAllAddress', async(userId)=>{
  const response = await axios.get(`${API_BASE_URL}/api/shop/address/get/${userId}`)
  return response.data;
 })


 export const editAddress = createAsyncThunk('/editAddress', async({userId, addressId, formData}) => {
  const response = await axios.put(`${API_BASE_URL}/api/shop/address/update/${userId}/${addressId}`, formData);
  return response.data;
});


 export const deleteAddress = createAsyncThunk('/deleteAddress', async({userId, addressId})=>{
  const response = await axios.delete(`${API_BASE_URL}/api/shop/address/delete/${userId}/${addressId}`)
  return response.data;
 })


const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers:{},
  extraReducers : (builder) => {
   builder .addCase(addNewAddress.pending, (state)=> {
    state.isLoading =  true
   })
   .addCase(addNewAddress.fulfilled, (state, action)=> {
    state.isLoading =  true

   })
   .addCase(addNewAddress.rejected, (state)=> {
    state.isLoading =  false

   })


   .addCase(fetchAllAddress.pending, (state)=> {
    state.isLoading =  true
   })
   .addCase(fetchAllAddress.fulfilled, (state, action)=> {
    state.isLoading =  true
    state.addressList = action.payload.data
   })
   .addCase(fetchAllAddress.rejected, (state)=> {
    state.isLoading =  false,
    state.addressList = []
   })


   
   .addCase(editAddress.pending, (state)=> {
    state.isLoading =  true
   })
   .addCase(editAddress.fulfilled, (state, action)=> {
    state.isLoading =  true
    state.addressList = action.payload.data
   })
   .addCase(editAddress.rejected, (state)=> {
    state.isLoading =  false,
    state.addressList = []
   })


   
   .addCase(deleteAddress.pending, (state)=> {
    state.isLoading =  true
   })
   .addCase(deleteAddress.fulfilled, (state, action)=> {
    state.isLoading =  true
    state.addressList = action.payload.data
   })
   .addCase(deleteAddress.rejected, (state)=> {
    state.isLoading =  false,
    state.addressList = []
   })
  }
})


export default addressSlice.reducer