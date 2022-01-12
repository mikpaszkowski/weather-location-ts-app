import axios from 'axios';

export interface IGeocodingData {
	"place_id": number,
	"licence": string,
	"osm_type": string,
	"osm_id": number,
	"lat": string,
	"lon": string,
	"display_name": string,
	"address": {
		"house_number": string,
		"road": string,
		"hamlet": string,
		"town": string,
		"village": string,
		"city": string,
		"county": string,
		"state_district": string,
		"state": string,
		"postcode": string,
		"country": string,
		"country_code": string
	},
	"boundingbox": string[]
}

const getGeocodingDataByCoordinates = async (
	lat: number,
	long: number
): Promise<IGeocodingData | undefined> => {
	try {
		const res = await axios.get(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
		);
		if (res.status === 200) return res.data;
	} catch (error) {
		console.log(error);
	}
};

const getGeocodingDataByCityName = async (
	cityName: string
): Promise<IGeocodingData | undefined> => {
	try {
		const res = await axios.get(
			`https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
		);
		if (res.status === 200) return res.data[0];
	} catch (error) {
		console.log(error);
	}
};

const geocodingService = {
	getGeocodingDataByCityName,
	getGeocodingDataByCoordinates,
};

export default geocodingService;
