import { IGeocodingData } from "../services/reverseAndForwardGeocodingAPI"
import { ICoordinates } from "../services/wetherAPI"

export const getCoordinates = (geocodingData: IGeocodingData | undefined): ICoordinates => {
    return {
        lat: geocodingData?.latitude ?? 0,
        long: geocodingData?.longitude ?? 0
    }
}