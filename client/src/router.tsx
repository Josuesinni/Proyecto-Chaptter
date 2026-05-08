import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import App from "./App";
import Home from "./pages/home/Home";
import useTitle from "./hooks/useTitle";
import Planes from "./pages/subscripcion/Planes";
import PanelActividades from "./pages/panel_actividades/PanelActividades";

export const router = createBrowserRouter([
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
        path: "/login",
        Component: () => {
          useTitle("Inicio de Sesión");
          return <Login />;
        },
      },
      {
        path: "/planes",
        Component: () => {
          useTitle("Planes de Subscripción");
          return <Planes />;
        },
      },
      {
        path: "/panel-actividades",
        Component: () => {
          useTitle("Panel de Actividades");
          return <PanelActividades />;
        },
      },
    ],
  },
]);
