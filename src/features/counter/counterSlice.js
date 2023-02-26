import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    products: [],
    isLoading: false,
    isError: false,
    error: "",
};

export const getProducts = createAsyncThunk = ("action/name", async () => {
    const res = await fetch('http://localhost:5000/products')
    const data = await res.json();

    return data.data
})

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
        decrement: (state, action) => {
            state.count -= action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;