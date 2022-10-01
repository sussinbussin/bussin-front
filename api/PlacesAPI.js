import { GOOGLE_API_KEY } from "@env";

const usePlacesAPI = (query) => {
  const findPlaces = async () => {
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
    const res = await fetch(
      url +
        new URLSearchParams({
          input: query,
          key: GOOGLE_API_KEY,
          locationbias: "ipbias",
        })
    );
    const result = await res.json(); //todo: error checking
    return result;
  };
  return { findPlaces };
};

export { usePlacesAPI };
