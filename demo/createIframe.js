/**
 * Creates an iframe element with a specified question, email, and source URL.
 * @param {string} question - The question to be passed as a query parameter in the URL.
 * @param {string} email - The email to be passed as a query parameter in the URL.
 * @param {string} source - The source URL for the iframe.
 * @returns {HTMLIFrameElement} - The created iframe element.
 */
function createIframe(question = "", email = "", source = "http://127.0.0.1:5000") {
    const iframe = document.createElement('iframe');
    let url = source;
    const params = [];
    
    // Add email as a query parameter if provided
    if (email !== "") {
        params.push(`id=${encodeURIComponent(email)}`);
    }
    
    // Add question as a query parameter if provided
    if (question !== "") {
        params.push(`q=${encodeURIComponent(question)}`);
    }
    
    // Append query parameters to the URL if any exist
    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    // Set iframe properties
    iframe.src = url;
    iframe.style.width = "65vw";
    iframe.style.height = "65vh";
    iframe.style.border = "none";

    // Return the iframe object
    return iframe;
}