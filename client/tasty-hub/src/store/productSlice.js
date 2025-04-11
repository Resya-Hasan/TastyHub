import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../api/http'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
    },
    reducers: {
        fetchProductsSuccess(state, action) {
            state.data = action.payload
        }
    }
})

export const { fetchProductsSuccess } = productSlice.actions
export const productReducer = productSlice.reducer


export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { dispatch}) => {
    try {
        const response = await http({
            method: "get",
            url: "/products",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const result = response.data
        console.log(response, "<<<< response dari api")
        dispatch(fetchProductsSuccess(result))
        // setProducts(result)
    } catch (error) {
        handleApiError(error);
    }
})