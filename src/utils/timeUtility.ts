
const formatTime: Function = (time: number)=> {
    return (time < 10) ? `0${time}` : time;
}

export const getTime: Function =  () => {
    const date = new Date();
    let hours = formatTime(date.getHours());
    let minutes = formatTime(date.getMinutes());
    let seconds = formatTime(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
}




