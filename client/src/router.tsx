import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import App from "./App";
import Home from "./pages/home/Home";
import useTitle from "./hooks/useTitle";
import Planes from "./pages/subscripcion/Planes";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: () => {
      useTitle("Inicio de Sesión");
      return <Login />;
    },
  },
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: () => {
          useTitle("Inicio");
          return <Home />;
        },
      },
      {
        path: "/planes",
        Component: () => {
          useTitle("Planes de Subscripción");
          return <Planes />;
        },
      },
    ],
  },
]);
