const disableScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

document.addEventListener('wheel', disableScroll, {
    passive: false
});