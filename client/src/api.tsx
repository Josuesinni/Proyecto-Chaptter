import axios, { type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { configNotificaciones } from "./config/notificaciones";

export type AxiosMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface AxiosProps {
  url: string;
  method: AxiosMethod;
  data?: object;
  params?: object;
  customSuccessMessageResponse?: string;
  customErrorMessageResponse?: string;
}

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

function success(method: AxiosMethod) {
  if (method == "POST") return "Se ha registrado la información exitosamente";
  if (method == "PATCH" || method == "PUT")
    return "Se han guardado los cambios exitosamente";
  if (method == "DELETE") return "Se ha eliminado el registro exitosamente";
}

function error(method: AxiosMethod) {
  if (method == "POST")
    return "Se ha producido un error al registrar la información";
  if (method == "PATCH" || method == "PUT")
    return "Se ha producido un error al guardar la información";
  if (method == "DELETE")
    return "Se ha producido un error al eliminar el registro";
}

export const sendAxios = async ({
  url,
  method,
  data,
  params,
  customSuccessMessageResponse,
  customErrorMessageResponse,
}: AxiosProps) => {
  const res = (await toast.promise(
    async () => {
      const response = await api.request({
        method,
        url,
        data,
        params,
        timeout: 4000,
        timeoutErrorMessage: "Se ha agotado el tiempo de la petición",
      });
      const dataResponse = response.data;
      if (!dataResponse.success) {
        throw new Error(dataResponse.message || "La operación falló");
      }
      return response;
    },
    {
      pending: "Enviando información al servidor",
      success: customSuccessMessageResponse ?? success(method),
      error: customErrorMessageResponse ?? error(method),
    },
    configNotificaciones,
  )) as AxiosResponse;
  return res;
};
