import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { constants } from "../../../assets/constants";
import { Link } from "react-router-dom";
import {
  changeCelsiusStatusRedux,
  fetchDailyAndCurrentWeatherAsync,
  setWhichDayRedux,
} from "../../../store/features/weatherSlice";
import styles from "./weather_page.module.css";

const WeatherPage = () => {
  const { paths } = constants;
  const dispatch = useAppDispatch();
  const {
    dailyList,
    dailyList: { whichDay },
    celsiusOrFahrenheit: { isCelsius },
    currentWeatherData,
    choosedDaysWeather,
  } = useAppSelector((state) => state.weather);

  const [cityName, setCityName] = useState<string>("");

  let mainDegree;
  if (choosedDaysWeather) {
    mainDegree = isCelsius
      ? choosedDaysWeather
      : (choosedDaysWeather * (9 / 5) + 32).toFixed(1);
  } else {
    mainDegree = isCelsius
      ? currentWeatherData.main.temp.toFixed(1)
      : (currentWeatherData.main.temp * (9 / 5) + 32).toFixed(1);
  }
  const today = new Date().toISOString().split("T")[0];
  const dailyWeatherByTime = [
    { dt_txt: today, ...currentWeatherData },
    ...dailyList.list.filter(
      (item) => !item.dt_txt.includes(today) && item.dt_txt.includes("15:00:00")
    ),
  ];
  const dailyWeatherByDay = dailyList.list.filter((item) =>
    item.dt_txt.includes(whichDay)
  );

  const celsiusOrFahrenheit = isCelsius ? "°C" : "°F";

  const changeCityValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const changeCelsiusStatus = (type: boolean) =>
    dispatch(changeCelsiusStatusRedux({ isCelsius: type }));
  const changeWhichDay = (day: string, choosedDaysWeather: number) => {
    dispatch(
      setWhichDayRedux({
        whichDay: day,
        choosedDaysWeather: dailyWeatherByTime[0].dt_txt.includes(day)
          ? 0
          : choosedDaysWeather,
      })
    );
  };

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      cityName &&
        dispatch(fetchDailyAndCurrentWeatherAsync({ city: cityName }));
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [cityName]);

  return (
    <div className={styles.weather_page_wrapper}>
      <div className={styles.weather_header}>
        <Link to={paths.home} className={styles.back_btn}>
          Back to Home Page
        </Link>
        <div className={styles.weather_search}>
          <input
            type="search"
            placeholder="Please write a City"
            className={styles.weather_input}
            onChange={changeCityValue}
            value={cityName}
          />
        </div>
        <div>
          <div className={styles.weather_celsius}>
            <button
              className={`${styles.weather_type_btn} ${
                isCelsius && styles.active
              }`}
              onClick={() => changeCelsiusStatus(true)}
            >
              &#8451;
            </button>
            <button
              className={`${styles.weather_type_btn} ${
                !isCelsius && styles.active
              }`}
              onClick={() => changeCelsiusStatus(false)}
            >
              &#8457;
            </button>
          </div>
        </div>
      </div>

      <div className={styles.weather_info_wrapper}>
        <div className={styles.weather_today_wrapper}>
          <div className={styles.weather_today}>
            <p>{currentWeatherData.name}</p>
            <p>
              {mainDegree} {celsiusOrFahrenheit}
            </p>
            {currentWeatherData.weather[0].icon && (
              <img
                src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            )}
          </div>
          <div className={styles.weather_daily}>
            {dailyWeatherByDay.map((item) => {
              let degree = isCelsius
                ? item.main.temp.toFixed(1)
                : (item.main.temp * (9 / 5) + 32).toFixed(0);
              return (
                <div key={item.dt_txt} className={styles.daily_weather_item}>
                  <span>{item.dt_txt?.split(" ")[1]}</span>
                  <span>
                    {degree}
                    {celsiusOrFahrenheit}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="weather"
                    className={styles.daily_weather_icon}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.weather_for_five_days_wrapper}>
          {dailyWeatherByTime.map((item) => {
            let degree = isCelsius
              ? item.main.temp.toFixed(1)
              : (item.main.temp * (9 / 5) + 32).toFixed(0);
            return (
              <div
                className={`${styles.weather_for_day} ${
                  item.dt_txt.includes(whichDay) && styles.active
                }`}
                key={item.dt_txt}
                onClick={() =>
                  changeWhichDay(item.dt_txt.split(" ")[0], item.main.temp)
                }
              >
                <p>{item.dt_txt.split(" ")[0]}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt=""
                />
                <p>
                  {degree} {celsiusOrFahrenheit}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
