import { Link } from "react-router-dom";
import { constants } from "../../../assets/constants";
import { useAppSelector } from "../../../store/hooks";
import styles from "./home_page.module.css";

const HomePage = () => {
  const { paths } = constants;
  const { currentWeatherData } = useAppSelector((state) => state.weather);

  return (
    <div className={styles.home_page_wrapper}>
      <div className={styles.home_page_main_info}>
        <p className={styles.home_page_welcome}>Welcome to our page</p>
        <p className={styles.home_page_info}>
          To see the daily weather please click on bellow button
        </p>
        <Link to={paths.weather} className={styles.home_page_btn}>
          See daily Weather
        </Link>
      </div>
      <div className={styles.current_weather_wrapper}>
        <p>{currentWeatherData.name}</p>
        <p>{currentWeatherData.main.temp.toFixed(1)} &#8451;</p>
        {currentWeatherData.weather[0].icon && (
          <img
            src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
            alt="icon"
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
