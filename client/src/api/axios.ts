//to retrieve the token from cookies
import axios from "axios";

// Create an axios instance pointing to the BE starting api
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, //  send cookies (refreshToken) automatically
});

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

//interceptor? a function that runs before every HTTP request made with "api"
api.interceptors.request.use(config => {
  // Attach accessToken to Authorization header if present
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// -----------------------------
// Response Interceptor when the token expires (auto-refresh)
// -----------------------------
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // If we got 401 Unauthorized and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint, backend will check HttpOnly cookie
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        // Save new access token
        setAccessToken(data.accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed, forcing logout");
        
        return Promise.reject(refreshError);
      }
    }

    
  }
);

export default api;
