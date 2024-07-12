import { useEffect } from "react";
import Router from "./router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  fetchDailyAndCurrentWeatherAsync,
  setCurrentCityRedux,
} from "./store/features/weatherSlice";
import Spinner from "./components/Spinner";
import Modal from "./components/Modal";

function App() {
  const dispatch = useAppDispatch();
  const { city } = useAppSelector((state) => state.weather);
  // To get current location
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      const city =
        data.address.city || data.address.town || data.address.village;
      dispatch(setCurrentCityRedux({ city: city }));
    });
  } else {
    console.log("Geolocation is not supported in this browser.");
  }

  useEffect(() => {
    city && dispatch(fetchDailyAndCurrentWeatherAsync({ city }));
  }, [city]);

  return (
    <>
      <Spinner />
      <Modal />
      <Router />
    </>
  );
}

export default App;
