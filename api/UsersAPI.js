import { BACKEND_API_ENDPOINT } from "@env";
import ky from "ky";
import jwtDecode from "jwt-decode";

const useUserAPI = (token, email) => {
  const api = ky.create({
    prefixUrl: BACKEND_API_ENDPOINT,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const getUser = async () => {
    let data = null;
    try {
      const res = await api.get(`users/byEmail/${email}`);
      data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return;
    }
  };

  const updateUser = async(userId, userDTO) => {
    let data = null;
    try {
      const res = await api.put(`users/${userId}`, {
        json: userDTO
      });
      data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  }
  return { getUser, updateUser };
};

export { useUserAPI };
