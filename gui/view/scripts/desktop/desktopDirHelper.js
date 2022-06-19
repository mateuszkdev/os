const typeUtils = {
    dir: {
        buttonId: 'handleDirBtn',
        formDivId: 'dir'
    },
    special: {
        buttonId: 'handleSpecialBtn',
        formDivId: 'special'
    }
}

document.getElementById('dir').style.display = 'none';
document.getElementById('special').style.display = 'none';

const dirHandle = (type) => {

    const util = typeUtils[type];

    const el = document.getElementById(util.formDivId);

    if (el.style.display === 'none') {

        el.style.display = 'flex';
        document.getElementById(util.buttonId).style.display = 'none';

    }  else {

        el.style.display = 'none';
        document.getElementById(util.buttonId).style.display = 'flex';

    }

}