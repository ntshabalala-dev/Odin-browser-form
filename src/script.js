import "../src/main.css";

const log = console.log;
const email = document.querySelector('#email')
const form = document.querySelector('form');

log(email.validity.valid)

form.addEventListener("submit", (event) => {
    // if the email field is invalid
    if (!email.validity.valid) {
        // display an appropriate error message
        //showError();
        // prevent form submission
        event.preventDefault();
    }
});

email.addEventListener('input', () => {
    if (email.validity.valid) {
        log('email is valid');
    } else {
        log('email is not valid');
    }
});