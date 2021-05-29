import axios from "axios";

export const getCoordinatesByCityName = async (
  cityName: string
): Promise<{ lat: number; long: number } | undefined> => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName.toLowerCase()}&key=${
        process.env.REACT_APP_GEOCODING_API_KEY
      }`
    );
    if (res.status === 200) {
      return {
        lat: res.data.results[0].geometry.location.lat,
        long: res.data.results[0].geometry.location.lng,
      };
    }
  } catch (error) {
      console.log(error);
  }
};
