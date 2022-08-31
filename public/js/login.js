const email = document.getElementById("email");
const password = document.getElementById("password");

function login(e) {
    e.preventDefault();

    let user = {
        email: email.value,
        password: password.value
    };

    fetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result => result.json())
    .then(json => {
        console.log(json);
        window.location.replace("/");
    });
}