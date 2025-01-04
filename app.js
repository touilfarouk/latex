// Dynamically render the mathematical expression using KaTeX
function renderMath() {
    const input = document.getElementById("mathInput").value;
    const output = document.getElementById("output");
    try {
        output.innerHTML = katex.renderToString(input, {
            throwOnError: false,
        });
    } catch (err) {
        output.innerHTML = `<span style="color: red;">Error: ${err.message}</span>`;
    }
}

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker Registration Failed:', err));
}
