//DINAMICA DEI FORM
import { signIn } from "auth-astro/client";




// CONTROLLO REGISTRAZIONE E LOGIN

let Check = {
    email: false,
    password: false,
    rPassword: false
}

let lCheck = {
    email: false,
    password: false
}


function submitLCheck(event) {
    let fCheck = 0;
    const Flerr = document.querySelector('.FL-err');
    for (let c in lCheck) {
        if (lCheck[c] === true) {
            fCheck++;
        }

        if (fCheck === 2) {
            Flerr.style.visibility = "visible";
            Flerr.style.color = "#162938";
            Flerr.textContent = "Welcome";
        } else {
            Flerr.style.visibility = "visible";
            Flerr.style.color = "red";
            Flerr.textContent = "Something went wrong";
        }
    }

}

function submitCheck(event) {
    let fCheck = 0;
    for (let c in Check) {
        if (Check[c] === true) {
            fCheck++;
            console.log(fCheck);
        }
    }
    if (fCheck === 3) {
        document.querySelector('.F-err').style.visibility = "visible";
        document.querySelector('.F-err').textContent = "All fields are Valid";
        document.querySelector('.F-err').style.color = "#162938";
    } else {
        document.querySelector('.F-err').style.visibility = "visible";
        event.preventDefault();
        fCheck = 0;
    }



}



function jsonCheckuser(json) {
    console.log(json);
    if (json.error === "User already exists") {
        document.querySelector('.E-err').style.color = "red";
        document.querySelector('.E-err').textContent = "user in uso";
        Check.user = false;
    } else if (json.hasOwnProperty('success')) {
        document.querySelector('.E-err').style.visibility = "visible";
        document.querySelector('.E-err').textContent = "This user is Valid";
        document.querySelector('.E-err').style.color = "green";
        Check.user = true;
    }
}


function jsonCheckLuser(json) {
    console.log(json);
    if (json.hasOwnProperty('success')) {
        document.querySelector('.EL-err').style.visibility = "visible";
        document.querySelector('.EL-err').textContent = "This user is Valid";
        document.querySelector('.EL-err').style.color = "green";
        lCheck.user = true;
    } else if (json.error === "user not available") {
        document.querySelector('.EL-err').style.color = "red";
        document.querySelector('.EL-err').textContent = "This user is not Registered";
        lCheck.user = false;
    }
}


function fetchResponse(response) {
    console.log(response);
    return (response.ok ? response.json() : null);
}
function Checkuser(event) {
    const user = document.querySelector('input[name="r_user"]');
    if (user.value.length < 6) {
        document.querySelector('.E-err').style.visibility = "visible";
        document.querySelector('.E-err').textContent = "User must have at least 6 characters";
        Check.user = false;
    }
    else {
        //fetch(BASE_URL + 'checkuser/'+ encodeURIComponent(String(user.value)).toLowerCase()).then(fetchResponse).then(jsonCheckuser);
    }
}

function CheckLuser(event) {
    const user = document.querySelector('input[name="user"]');
    if (user.value.length < 6) {
        document.querySelector('.EL-err').style.visibility = "visible";
        document.querySelector('.EL-err').textContent = "User must have at least 6 characters";
        Check.user = false;
    }
    else {
        //fetch(BASE_URL + 'check/'+ encodeURIComponent(String(user.value)).toLowerCase()).then(fetchResponse).then(jsonCheckLuser);
        signIn("credentials")

    }
}


function CheckPassword(event) {
    const password = document.querySelector('input[name="r_password"]');
    const Perr = document.querySelector('.P-err');
    if (password.value.length < 8) {

        Perr.style.visibility = "visible";
        Perr.textContent = "Password must be at least 8 characters";
        Check.password = false;
    } else {
        Perr.style.visibility = "hidden";
        Check.password = true;

    }
}

function CheckLPassword(event) {
    const password = document.querySelector('input[name="password"]');
    const Perr = document.querySelector('.PL-err');
    if (password.value.length < 8) {

        Perr.style.visibility = "visible";
        Perr.textContent = "Password must be at least 8 characters";
        lCheck.password = false;
    } else {
        Perr.style.visibility = "hidden";
        lCheck.password = true;
    }
}



function CheckRepeatPassword(event) {
    const rPassword = document.querySelector('input[name="repeat_password"]');
    const password = document.querySelector('input[name="r_password"]');
    const Rperr = document.querySelector('.Rp-err');
    if (password.value !== rPassword.value) {
        Rperr.style.visibility = "visible";
        Rperr.textContent = "Passwords do not match";
        Check.rPassword = false;
    } else {
        Rperr.style.visibility = "hidden";
        Check.rPassword = true;
    }
}


document.forms['login'].addEventListener('submit', submitLCheck);
document.forms['registration'].addEventListener('submit', submitCheck);
document.querySelector('input[name="user"]').addEventListener('blur', CheckLuser);
document.querySelector('input[name="password"]').addEventListener('blur', CheckLPassword);
document
    .querySelector("form")
    .addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("login attemtp")
        CheckLuser();
        // Handle the response, e.g., display a success message
    });
document.querySelector('input[name="r_password"]').addEventListener('blur', CheckPassword);
document.querySelector('input[name="repeat_password').addEventListener('blur', CheckRepeatPassword);