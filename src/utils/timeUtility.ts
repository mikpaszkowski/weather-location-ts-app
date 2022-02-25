const days = [
	'Sunday',
	'Monday',
	'Thursday',
	'Wednseday',
	'Thursday',
	'Friday',
	'Saturday',
];
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const formatTime: Function = (time: number) => {
	return time < 10 ? `0${time}` : time;
};

export const getTimeToDisplay: Function = () => {
	const date = new Date();
	let hours = formatTime(date.getHours());
	let minutes = formatTime(date.getMinutes());
	let seconds = formatTime(date.getSeconds());

	return `${hours}:${minutes}:${seconds}`;
};

export const getBasicTimeFormatFromTimestamp: Function = (
	time: number
): string => {
	const date = new Date(time * 1000);
	return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
};

export const shiftByTimezoneOffset = (timestamp: number, timezoneOffset: number): number => {
	const localTimeZoneOffset = new Date().getTimezoneOffset() * 60;
	return localTimeZoneOffset + timestamp + timezoneOffset
}

export const getFormattedDate: Function = (timestamp: number, timezoneOffset: number): string => {
	const timeStampShifted = shiftByTimezoneOffset(timestamp, timezoneOffset)
	const date = new Date( timeStampShifted * 1000);
	const dayInNumber = date
		.toLocaleDateString('en-GB')
		.split('/')
		.slice(0, 1)[0];
	return `${days[date.getDay()]} ${dayInNumber} ${months[date.getMonth()]} ${getBasicTimeFormatFromTimestamp(timeStampShifted)}`;
};

export const getDayFromTimeStamp: Function = (timeStamp: number) => {
	const date = new Date(timeStamp * 1000);
	return `${days[date.getDay()]}`;
};
