import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API_BASE_URL } from "@/store/config"
const initialState = {
  isLoading: false,
  productList: []
}
export const addNewProduct = createAsyncThunk('/products/addnewproduct', async(formData)=> {
  const result = await axios.post(`${API_BASE_URL}/api/admin/products/add`, formData, {
    headers:
    { 
      'content-Type': 'application/json'
    }
  
  })
  
  return  result?.data
})


export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async()=> {
  const result = await axios.get(`${API_BASE_URL}/api/admin/products/get`)
  
  return  result?.data

})

export const editProduct = createAsyncThunk('/products/editProduct', async({id, formData})=> {

  const result = await axios.put(`${API_BASE_URL}/api/admin/products/edit/${id}`, formData, {
    headers:
    { 
      'content-Type': 'application/json'
    }
  
  })
  
  return  result?.data


})


export const deleteProduct = createAsyncThunk('/products/deleteProduct', async(id)=> {
  const result = await axios.delete(`${API_BASE_URL}/api/admin/products/delete/${id}`, )
  
  return  result?.data


})





const AdminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers : (builder)=> {
      builder.addCase(fetchAllProducts.pending, (state)=>{
        state.isLoading = true
      }).addCase(fetchAllProducts.fulfilled, (state,action)=> {
   
        state.isLoading = false
        state.productList = action.payload
      }).addCase(fetchAllProducts.rejected, (state,action)=> {
   
      
        state.isLoading = false
        state.productList = [];
      })
  }
})

export default AdminProductSlice.reducer