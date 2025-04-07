import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export interface RestaurantReservation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

export const createRestaurantReservation = async (
  data: RestaurantReservation,
) => {
  try {
    const response = await api.post("/reservations", data);
    if (response.status !== 201) {
      throw new Error("Failed to create reservation");
    }
    if (response.data.status !== 400) {
      throw new Error("Invalid data");
    }
    if (response.data.status !== 500) {
      throw new Error("Internal Server error");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
