import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paramsSerializer = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(`${key}`, item);
      });
    } else {
      searchParams.append(key, value);
    }
  }

  return searchParams.toString();
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  prepareHeaders: async (headers) => {
    const storedData = localStorage.getItem("information");
    if (storedData) {
      const token = JSON.parse(storedData);
      if (token) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expiryTime = currentTime + token.expires_in;
        if (expiryTime <= currentTime) {
          const payload = {
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
            client_id:
              "personal-client-bb5c4fd7-9119-4576-906e-06406365d47e-1f4c55e7",
            client_secret: "9Pbq6bfgq6oCmUCy2THQ6zbMQHK4yVw6",
          };
          const res = await axios.post(
            "http://localhost:5000/api/refresh-token",
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          localStorage.setItem('information', JSON.stringify(res.data));
          headers.set("Authorization", `Bearer ${res.data.access_token}`);
        }
        headers.set("Authorization", `Bearer ${token.access_token}`);
      }
      return headers;
    }
  },
  paramsSerializer,
});

export const api = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
