import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchDailyAndCurrentWeatherAsyncTypes, WeatherInitialStateTypes } from "../../types";

const initialState: WeatherInitialStateTypes = {
    weatherLoading: false,
    city: "",
    fetchDataError: false,
    celsiusOrFahrenheit: {
        isCelsius: true,
        degree: "",
    },
    currentWeatherData: {
        name: "",
        main: { temp: 0 },
        weather: [
            {
                description: "",
                icon: "",
                id: 0,
                main: "",
            },
        ],
    },
    choosedDaysWeather: 0,
    dailyList: {
        city: {
            name: "",
        },
        whichDay: new Date().toISOString().split("T")[0],
        list: [],
    },
};

export const fetchDailyAndCurrentWeatherAsync = createAsyncThunk(
    "account/fetchDailyAndCurrentWeatherAsync",
    async ({ city }: FetchDailyAndCurrentWeatherAsyncTypes) => {
        try {
            const [currentWeatherResponse, dailyForecastResponse] = await Promise.all([
                fetch(`${process.env.REACT_APP_BASE_URL}weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`).then((r) => r.json()),
                fetch(`${process.env.REACT_APP_BASE_URL}forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`).then((r) =>
                    r.json()
                ),
            ]);
            if (currentWeatherResponse.message || dailyForecastResponse.message)
                throw new Error(currentWeatherResponse.message || dailyForecastResponse.message);
            return { currentWeather: currentWeatherResponse, dailyForecast: dailyForecastResponse };
        } catch (error) {
            throw error;
        }
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCurrentCityRedux(state, action) {
            state.city = action.payload.city;
        },
        changeCelsiusStatusRedux(state, action) {
            state.celsiusOrFahrenheit.isCelsius = action.payload.isCelsius;
        },
        setWhichDayRedux(state, action) {
            state.dailyList.whichDay = action.payload.whichDay;
            state.choosedDaysWeather = action.payload.choosedDaysWeather;
        },
        resetErrorRedux(state) {
            state.fetchDataError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDailyAndCurrentWeatherAsync.pending, (state) => {
                state.weatherLoading = true;
            })
            .addCase(fetchDailyAndCurrentWeatherAsync.fulfilled, (state, action) => {
                state.weatherLoading = false;
                state.dailyList.city = action.payload.dailyForecast.city;
                state.dailyList.list = action.payload.dailyForecast.list;
                state.currentWeatherData.name = action.payload.currentWeather.name;
                state.currentWeatherData.main.temp = action.payload.currentWeather.main.temp;
                state.currentWeatherData.weather = action.payload.currentWeather.weather;
                state.fetchDataError = false;
            })
            .addCase(fetchDailyAndCurrentWeatherAsync.rejected, (state) => {
                state.weatherLoading = false;
                state.fetchDataError = true;
            });
    },
});

export const { setCurrentCityRedux, changeCelsiusStatusRedux, setWhichDayRedux, resetErrorRedux } = weatherSlice.actions;
export default weatherSlice.reducer;
