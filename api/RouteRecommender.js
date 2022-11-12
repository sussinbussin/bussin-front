import { BETTER_API_ROUTE } from "@env";
import ky from "ky";

const useRecommenderAPI = (token) => {
  const api = ky.create({
    prefixUrl: BETTER_API_ROUTE,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const recommend = async (coords) => {
    let data = null;
    try {
      const res = await api.post("routes", {
        json: {
          "Origin Latitude": coords.originLat,
          "Origin Longitude": coords.originLng,
          "Destination Latitude": coords.destLat,
          "Destination Longitude": coords.destLng,
        },
      });
      data = await res.json();
      return data;
    } catch (error) {
      return;
    }
  };

  return { recommend };
};

export { useRecommenderAPI };
