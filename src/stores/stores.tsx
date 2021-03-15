import {  combineReducers, configureStore } from '@reduxjs/toolkit';
import interventionSlice from './intervention.store';

const reducer = combineReducers({
    intervention: interventionSlice,
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export default store;