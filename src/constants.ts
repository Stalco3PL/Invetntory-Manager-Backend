export const BASE_URL: string =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://vehicleinventorybackend.onrender.com";
export const VEHICLES_URL: string = "/api/vehicle";
