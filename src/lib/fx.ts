export const shake = (el:any, duration?:number) : any => {
    if (!el) {
        return;
    }

    el.classList.add('short-shake');
    setTimeout(() => {
        el.classList.remove('short-shake');
    }, duration || 500);
};

export const onCountdownEnd = () => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.reload();
    }, 4000);
};
