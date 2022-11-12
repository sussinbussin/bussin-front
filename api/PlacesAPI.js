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
    const result = await res.json();
    return result;
  };

  const getGeometry = async () => {
    const url = "https://maps.googleapis.com/maps/api/place/details/json?";
    const res = await fetch(
      url +
        new URLSearchParams({
          place_id: query,
          key: GOOGLE_API_KEY,
          fields: "geometry",
        })
    );

    const result = await res.json();
    return result.result.geometry.location;
  };

  const getDetails = async () => {
    const url = "https://maps.googleapis.com/maps/api/place/details/json?";
    const res = await fetch(
      url +
        new URLSearchParams({
          place_id: query,
          key: GOOGLE_API_KEY,
          fields: ["name", "formatted_address"],
        })
    );
    const result = await res.json();
    return result.result;
  };
  return { findPlaces, getGeometry, getDetails };
};

export { usePlacesAPI };
