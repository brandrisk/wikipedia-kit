// document.querySelector('header a.mw-logo span.mw-logo-container').remove();
// const searchBox = document.querySelector('#p-search');
// const header = document.querySelector('header.vector-header.mw-header');
// header.parentElement.insertAdjacentElement('afterend', searchBox);

browser.storage.local.get(['font', 'scrollButton', 'cleanCopy']).then((res) => {
    // default false

    if (res.font) {
        addFont(res.font);
    }

    if (res.scrollButton) {
        attachScrollButton();
    }

    // default true

    if (res.cleanCopy != false) {
        cleanCopy();
    }
});

function cleanCopy() {
    attachStyle(`
    sup.reference, sup.noprint {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }`);
}

function attachScrollButton() {
    const sttButton = document.createElement('div');
    sttButton.id = 'x-wk-stt-button';
    document.body.append(sttButton);

    sttButton.addEventListener('click', () => {
        if (window.scrollY == 0) {
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            window.scrollTo(0, 0);
        }
    });

    handleScroll();

    document.addEventListener('scroll', () => {
        handleScroll();
    });

    handleResize();

    window.addEventListener('resize', () => {
        handleResize();
    });

    function handleResize() {
        if (window.innerWidth < 1120) {
            sttButton.style.display = 'flex';
        } else {
            sttButton.style.display = 'none';
        }
    }

    function handleScroll() {
        if (window.scrollY == 0) {
            sttButton.innerHTML = `<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m8.5.5-4 4-4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 8)"/></svg>`;
        } else {
            sttButton.innerHTML = `<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m.5 4.5 4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 8)"/></svg>`;
        }
    }
}

function addFont(font) {
    const parts = new URL(font).pathname.split('/');
    const fontPath = parts[parts.length - 1];
    const fontName = fontPath.replaceAll('+', ' ');

    attachStyle(`
        @import url("https://fonts.googleapis.com/css2?family=${fontPath}");
        body, .mw-body h1, .mw-body .mw-heading1, .mw-body-content h1, .mw-body-content .mw-heading1, .mw-body-content h2, .mw-body-content .mw-heading2 {
            font-family: "${fontName}"
        }`);
}

function attachStyle(styleText) {
    const styleElement = document.createElement('style');
    styleElement.textContent = styleText.trim().replaceAll(/[\t\n]/g, '');
    document.body.append(styleElement);
}
