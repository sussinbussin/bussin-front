import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useRideApi = (token) => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const createRide = async (ride) => {
    let result = null;

    try {
      const res = await api.post(`ride`, {
        json: ride
      });
      result = await res.json();
      return result;
    } catch (error) {
      console.error(error);
      return result;
    }
  };
  
  return { createRide }
};

export { useRideApi };
