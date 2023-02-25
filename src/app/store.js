import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterSlice from '../features/counter/counterSlice';

const store = configureStore({
    // devTools: false,
    reducer: {
        counter: counterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;