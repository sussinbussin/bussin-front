import { TRACK_API_ROUTE} from "@env";
import ky from "ky";

const useTrackApi = () => {

  const api = ky.create({
    prefixUrl:TRACK_API_ROUTE
  });

  const getTrack = async (id) => {
    let data = null;
    try {
      const res = await api.get(`api/collections/track/records/${id}`);
      data = await res.json();
      return data;
    } catch(error){
      console.log(error);
      return error;
    }
  }

  const getAllTrack = async () => {
    let data = null;
    try {
      const res = await api.get(`api/collections/track/records/`);
      data = await res.json();
      return data;
    } catch(error){
      console.log(error);
      return error;
    }
  }
  return { getTrack, getAllTrack}
}

export {useTrackApi};
