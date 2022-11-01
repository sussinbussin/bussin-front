import { BETTER_API_ROUTE } from "@env";
import ky from "ky";

const useRecommenderAPI = () => {
  const api = ky.create({
    prefixUrl: BETTER_API_ROUTE,
  });
  const recommend = async (coords) => {
    console.log(coords);
    let data = null;
    try {
      const res = await api.post("routes", {
        json: {
          "Origin Latitude": coords.originLat,
          "Origin Longitude": coords.originLng,
          "Destination Latitude": coords.destLat,
          "Destination Longitude": coords.destLng,
          //"Departure Time": coords.time,
        },
      });
      data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return { recommend };
};

export { useRecommenderAPI };
