import { IGeocodingData } from '../services/api/reverseAndForwardGeocodingAPI';
import { ICoordinates } from '../services/api/wetherAPI';

export const getCoordinates = (
  geocodingData: IGeocodingData | undefined
): ICoordinates => {
  return {
    lat: geocodingData?.latitude ?? 0,
    long: geocodingData?.longitude ?? 0,
  };
};
