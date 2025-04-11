import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 10,
    },
    reducers: {
        incremented: (state) => {
            state.value += 1
        },
        decremented: (state) => {
            state.value -= 1
        }
    }
})

const { incremented, decremented} = counterSlice.actions

const store = configureStore({
    reducer: counterSlice.reducer
})

store.subscribe(() => console.log(store.getState()))

store.dispatch(incremented())
store.dispatch(incremented())
store.dispatch(decremented())