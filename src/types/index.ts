export interface ConstantsTypes {
    paths: {
        home: "/";
        weather: "/weather";
    };
}

export interface RouterTypes {
    id: string;
    path: string;
    element: JSX.Element;
}

export interface FetchCurrentWeatherDataAsyncTypes {
    city: string;
}

export interface FetchDailyWeatherDataAsyncTypes {
    city: string;
}
export interface FetchDailyAndCurrentWeatherAsyncTypes {
    city: string;
}
export interface WeatherInitialStateTypes {
    weatherLoading: boolean;
    city: string;
    fetchDataError: boolean;
    celsiusOrFahrenheit: {
        isCelsius: boolean;
        degree: string;
    };
    currentWeatherData: {
        name: string;
        main: { temp: number };
        weather: [
            {
                description: string;
                icon: string;
                id: number;
                main: string;
            }
        ];
    };
    choosedDaysWeather: number;
    dailyList: {
        city: {
            name: string;
        };
        whichDay: string;
        list: {
            dt_txt: string;
            main: { temp: number };
            weather: {
                description: string;
                icon: string;
                id: number;
                main: string;
            }[];
        }[];
    };
}
