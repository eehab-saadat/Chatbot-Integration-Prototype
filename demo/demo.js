function createIframe(question = "", email = "", source = "http://127.0.0.1:5000") {
    const iframe = document.createElement('iframe');
    let url = source;
    const params = [];
    if (email !== "") {
        params.push(`id=${encodeURIComponent(email)}`);
    }
    if (question !== "") {
        params.push(`q=${encodeURIComponent(question)}`);
    }
    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    // iframe styling
    iframe.src = url;
    iframe.style.width = "70vw";
    iframe.style.height = "70vh";
    iframe.style.border = "none";

    // document styling
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.documentElement.style.height = '100%';
    document.documentElement.style.margin = '0';
    document.body.appendChild(iframe);
}