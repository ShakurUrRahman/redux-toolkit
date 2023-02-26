import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteSomething, fetchSomething, postSomething } from './counterAPI';

const initialState = {
    count: 0,
    something: [],
    postSuccess: false,
    deleteSuccess: false,
    isLoading: false,
    isError: false,
    error: "",
};

export const getSomething = createAsyncThunk("something/getSomething", async () => {
    const something = fetchSomething();
    return something;
})

export const addSomething = createAsyncThunk("something/addSomething", async (data) => {
    const something = postSomething(data);
    return something;
})

export const removeSomething = createAsyncThunk("something/removeSomething", async (id) => {
    const something = deleteSomething(id);
    return something;
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
        },
        togglePostSuccess: (state) => {
            state.postSuccess = false
        }
        // above one for hot toast
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSomething.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getSomething.fulfilled, (state, action) => {
                state.something = action.payload;
                state.isLoading = false;
            })
            .addCase(getSomething.rejected, (state, action) => {
                state.something = [];
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(addSomething.pending, (state) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            })
            .addCase(addSomething.fulfilled, (state) => {
                state.postSuccess = true;
                state.isLoading = false;
            })
            .addCase(addSomething.rejected, (state, action) => {
                state.something = [];
                state.isLoading = false;
                state.postSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(removeSomething.pending, (state) => {
                state.isLoading = true;
                state.deleteSuccess = false;
                state.isError = false;
            })
            .addCase(removeSomething.fulfilled, (state) => {
                state.deleteSuccess = true;
                state.isLoading = false;
            })
            .addCase(removeSomething.rejected, (state, action) => {
                state.something = [];
                state.isLoading = false;
                state.deleteSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;