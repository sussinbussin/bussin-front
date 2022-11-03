import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useBookedRideApi = (token) => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const getBooking = async (rideId) => {
    let data = null;
    try {
      const res = await api.get(`ride/${rideId}`);
      data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return { getBooking };
};

export { useBookedRideApi };
