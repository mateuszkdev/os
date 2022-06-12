const fx = (num) => {
    if (num < 10) return `0${num}`;
    else return num;
}

const clock = () => {

    const now = new Date();

    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    document.getElementById('taskBarClock').innerHTML = `${fx(h)}:${fx(m)}:${fx(s)}`;

}

setInterval(clock, 900);