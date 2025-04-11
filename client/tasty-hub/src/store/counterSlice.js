import { createSlice } from '@reduxjs/toolkit'

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
        },
        incrementBy: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { incremented, decremented, incrementBy } = counterSlice.actions
export const counterReducer = counterSlice.reducer