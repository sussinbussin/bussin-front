import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";

const useDriverApi = (token) => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const getDriver = async (carPlate) => {
    let result = null;
    try {
      const res = await api.get(`driver/${carPlate}`);
      result = await res.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return { getDriver };
};

export { useDriverApi };
