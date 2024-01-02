import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import Router from "next/router";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
export const _ = axios.create({
  baseURL: process.env.NEXT_PUBLIC_api_base_url as string,
  withCredentials: true,
});

async function getRefreshToken() {
  try {
    const response = await _.get("/refresh");
    if (response?.data?.status) {
      const old_cookie = cookie.get("user");
      cookie.set("user", {
        username: old_cookie?.username,
        token: old_cookie?.token,
      });
      return response?.data?.access_token;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

_.interceptors.request.use(
  async (
    _c: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const access_token = cookie.get("user")?.token;

    if (access_token) {
      _c.headers.Authorization = `Bearer ${access_token}`;
    }
    return _c;
  },
  (error) => {
    console.error("attarch brearer token:", error);
    return Promise.reject(error);
  }
);
_.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response.status === 400 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getRefreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log(originalRequest)
        return _(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
_.interceptors.request.use(
  (config: any) => {
    if (config.method === "options") {
      // Return a response for OPTIONS requests to satisfy CORS
      return Promise.resolve({ status: 200 });
    }
    return config;
  },
  (error) => {
    console.error("option request:", error);
    return Promise.reject(error);
  }
);
