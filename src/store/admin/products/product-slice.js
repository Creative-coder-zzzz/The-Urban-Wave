import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading: false,
  productList: []
}
export const addNewProduct = createAsyncThunk('/products/addnewproduct', async(formData)=> {
  const result = await axios.post(`https://server-mern-cloth-shop.onrender.com/api/admin/products/add`, formData, {
    headers:
    { 
      'content-Type': 'application/json'
    }
  
  })
  
  return  result?.data
})


export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async()=> {
  const result = await axios.get(`https://server-mern-cloth-shop.onrender.com/api/admin/products/get`)
  
  return  result?.data

})

export const editProduct = createAsyncThunk('/products/editProduct', async({id, formData})=> {

  const result = await axios.put(`https://server-mern-cloth-shop.onrender.com/api/admin/products/edit/${id}`, formData, {
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