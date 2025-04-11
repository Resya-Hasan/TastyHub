import { configureStore } from "@reduxjs/toolkit";
import { counterReducer, incremented, decremented } from './counterSlice.js'
import { productReducer } from "./productSlice.js";

const store = configureStore({
    reducer : {
        counter: counterReducer,
        products: productReducer
    }
})

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(incremented())
// store.dispatch(incremented())
// store.dispatch(decremented())

export default store