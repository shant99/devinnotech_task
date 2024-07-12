import { Routes, Route } from "react-router-dom";
import { constants } from "../assets/constants";
import HomePage from "../components/mainComponents/HomePage";
import WeatherPage from "../components/mainComponents/WeatherPage";
import { RouterTypes } from "../types";

const { paths } = constants;

const mainAppRoutes: RouterTypes[] = [
    {
        id: "Home_Page",
        path: paths.home,
        element: <HomePage />,
    },
    {
        id: "Weather_Page",
        path: paths.weather,
        element: <WeatherPage />,
    },
];

const Router = () => {
    return (
        <Routes>
            {mainAppRoutes.map(({ id, path, element }) => (
                <Route key={id} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default Router;
