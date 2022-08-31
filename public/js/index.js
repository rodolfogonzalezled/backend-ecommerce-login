const socket = io.connect();

const btnLogout = document.getElementById('btnLogout')

btnLogout.addEventListener('click', evt => {
    fetch('/api/session/logout').then(result => result.json()).then(json => console.log(json));
})