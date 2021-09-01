
const days = [ "Sunday","Monday", "Thursday", "Wednseday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];

const formatTime: Function = (time: number)=> {
    return (time < 10) ? `0${time}` : time;
}

export const getTimeToDisplay: Function =  () => {
    const date = new Date();
    let hours = formatTime(date.getHours());
    let minutes = formatTime(date.getMinutes());
    let seconds = formatTime(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
};

export const getBasicTimeFormatFromTimestamp: Function = (time: number): string => {
    const date = new Date(time);
    return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:`
}

export const getFormattedDate: Function = (): string => {
    const date = new Date();
    const dayInNumber = date.toLocaleDateString("en-GB").split("/").slice(0, 1)[0];
    return `${days[date.getDay()]} ${dayInNumber} ${months[date.getMonth()]}`;
}




