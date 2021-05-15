
const days = ["Monday", "Thursday", "Wednseday", "Thursday", "Friday", "Saturday", "Sunday"];
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

export const getBasicTimeFormatFromTimestamp: Function = (time: number) => {
    const date = new Date(time);
    return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:`
}

export const getFullDateTime: Function = (time: number) => {
    return new Date(time);
}

export const getFormattedDate: Function = (time: number) => {
    const date = new Date(time);
    const dayInNumber = date.toLocaleDateString("en-GB").split("/").slice(0, 1)[0];

    return `${days[date.getDay()]} ${dayInNumber} ${months[date.getMonth()]}`;
}




