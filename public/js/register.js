const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");

function register(e) {
    e.preventDefault();

    let user = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    fetch('/api/session/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(result => {
        if(!result.ok)
            throw Error(result.status)

        result.json();
    })
    .then(json => {
        console.log(json);
        window.location.replace("/");
    }).catch(error => {
        console.log(error);
        if(error.message == 500) {
            swal("Register error", '', "error", {button: false, timer: 1000});
        }
    });
}