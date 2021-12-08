import { IGeocodingData } from '../services/api/reverseAndForwardGeocodingAPI';
import { ICoordinates } from '../services/api/wetherAPI';

export const getCoordinates = (
  geocodingData: IGeocodingData | undefined
): ICoordinates => {
  if(geocodingData?.lat && geocodingData?.lon){
    return {
      lat: Number.parseInt(geocodingData.lat),
      long: Number.parseInt(geocodingData.lon),
    };
  }
  return {
    lat: 0,
    long: 0,
  };
};
