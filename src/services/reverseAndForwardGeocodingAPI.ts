import axios from "axios";

export const getCoordinatesByQuery = async (
  cityName: string
): Promise<{ lat: number; long: number } | undefined> => {
  try {
    const res = await axios.get(
      `http://api.positionstack.com/v1/forward
      ? access_key = ${process.env.REACT_APP_REVERSE_GEOCODING_API_KEY}
      & query = ${cityName.toLowerCase()}`
    );
    console.log(res)
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

export interface IGeocodingData {
  latitude: number,
  longitude: number,
  label: string,   
  name: string,
  type: string,
  distance: number,
  number: string,
  street: string,
  postal_code: string,
  confidence: number,
  region: string,
  region_code: string,
  administrative_area: null,
  neighbourhood: string,
  country: string,
  country_code: string,
  map_url: string,
}

export const getGeocodingDataByCoordinates = async (
  lat: number, long: number
): Promise<IGeocodingData | undefined> => {
  try {
    const res = await axios.get(
      `http://api.positionstack.com/v1/forward
      ? access_key = ${process.env.REACT_APP_REVERSE_GEOCODING_API_KEY}
      & query = ${lat},${long}`
    );
    console.log(res.data)
    if (res.status === 200) return res.data;
  } catch (error) {
      console.log(error);
  }
};
