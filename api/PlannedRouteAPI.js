import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const usePlannedRouteAPI = (token) => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const getSuggestion = async (tripStart, tripEnd) => {
    let data = null;
    try {
      const res = await api.get("planned/suggestion", {
          searchParams: {
            tripStart: tripStart,
            tripEnd: tripEnd,
          },
        }),
        data = await res.json();
      return data;
    } catch (error) {
      return;
    }
  };

  return { getSuggestion };
};

export { usePlannedRouteAPI };
