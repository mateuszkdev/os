document.getElementById('home').style.display = 'none';

const switchHome = () => {

    const el = document.getElementById('home');
    console.log(el.style.display)
    if (el.style.display === 'none') el.style.display = 'flex';
    else el.style.display = 'none';

}