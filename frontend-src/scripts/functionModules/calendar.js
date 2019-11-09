const calendarFunction = function () {
    const calendar = document.getElementById('calendar');
    const setDateTime = function () {
        const today = new Date();
        const formattedDate = ((today.getDate() < 10) ? `0${today.getDate()}` : `${today.getDate()}`);
        const formattedMonth = ((today.getMonth() + 1 < 10) ? `0${today.getMonth()+1}` : `${today.getMonth()+1}`);
        const date = formattedDate + '.' + formattedMonth + '.' + today.getFullYear();
        const formattedHours = ((today.getHours() < 10) ? `0${today.getHours()}` : `${today.getHours()}`);
        const formattedMinutes = ((today.getMinutes() < 10) ? `0${today.getMinutes()}` : `${today.getMinutes()}`);
        const time = formattedHours + ':' + formattedMinutes;
        const dateTime = date + ' | ' + time;

        calendar.innerHTML = dateTime;
    };

    setDateTime();

    setInterval(function () {
        setDateTime();
    }, 10000);

};
export default calendarFunction;