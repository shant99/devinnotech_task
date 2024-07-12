import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./features/weatherSlice";

const store = configureStore({
    reducer: {
        weather: weatherSlice,
    },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
