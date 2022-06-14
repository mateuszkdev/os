const g = (id) => {
    return document.getElementById(id);
}

const els = {
    t1: g('text1'),
    t2: g('text2')
};

const texts = importedLanguage;

const mTime = 1;
const cTime = 0.25;

let textIndex = texts.length;
let time = new Date();
let index = 0;
let cooldown = cTime;

els.t1.innerText = texts[textIndex % texts.length];
els.t2.innerText = texts[(textIndex + 1) % texts.length];

const change = () => {

    index -= cooldown;
    cooldown = 0;

    let f = index / mTime;

    if (f > 1) {
        cooldown = cTime;
        f = 1;
    }

    setMorph(f);

}

const setMorph = (f) => {

    els.t2.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`;
    els.t2.style.opacity = `${Math.pow(f, 0.4) * 100}%`;

    f -= 1;

    els.t1.textContent = texts[textIndex % texts.length];
    els.t2.textContent = texts[(textIndex + 1) % texts.length];

}

const doCooldown = () => {

    index = 0;

    els.t2.style.filter = '';
    els.t2.style.opacity = '100%';

    els.t1.style.filter = '';
    els.t1.style.opacity = '0%';

}

const animate = () => {

    requestAnimationFrame(animate);

    let newTime = new Date();
    let sIIndex = cooldown > 0;

    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (sIIndex) textIndex++;
        change();
    } else {
        doCooldown();
    }

}

animate();