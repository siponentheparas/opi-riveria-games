javascript: (async () => {
    fetch("https://raw.githubusercontent.com/siponentheparas/opi-riveria-games/refs/heads/master/snek.js")
    .then(response => response.text())
    .then(text => eval(text));
})()