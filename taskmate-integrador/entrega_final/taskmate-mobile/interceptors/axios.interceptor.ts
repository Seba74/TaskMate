import { useEffect } from "react";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "components/Toast";
import { AxiosAdapterError } from "adapters/AxiosAdapter";

const AxiosInterceptors = () => {
  const { authState } = useAuth();

  useEffect(() => {
    // Interceptor de petición
    const requestInterceptor = axios.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        if (authState?.token) {
          request.headers.Authorization = `Bearer ${authState.token}`;
        }
        return request;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Interceptor de respuesta
    const responseInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        
        if (error.response) {
          const errors = AxiosAdapterError(error);
          showToast({
            type: "error",
            title: errors.length > 0 ? errors[0].name : "Error",
            description: errors.length > 0 ? errors[0].message : "Error desconocido",
          });
        } else {
          showToast({
            type: "error",
            title: "Error",
            description: "Error desconocido",
          });
        }
        return Promise.reject(error);
      }
    );

    // Clean desmonte component
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [authState]); 

  return null;
};

export default AxiosInterceptors;
