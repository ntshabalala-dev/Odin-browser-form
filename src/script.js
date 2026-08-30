import "../src/main.css";

const log = console.log;
// Inputs
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postalCode");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const inputs = document.querySelectorAll(".form-group input");

inputs.forEach((input) => {
    const errorName = input.id;
    const error = document.querySelector(`.form-group.${errorName} .error`);

    input.addEventListener("input", () => {
        if (input.value.trim().length === 0) {
            input.required = false;
        }

        if (input.validity.valid) {
            error.textContent = ""; // Remove the message content
            error.className = "error"; // Removes the 
        } else {

            const s = errorName.charAt(0).toUpperCase() + errorName.slice(1);
            const functionName = `show${s}Error`;
            log(functionName);
            actions[functionName](input, error);
        }
    });
});

const errorSpans = document.querySelectorAll(".form-group input ~ .error");

log(errorSpans);

const form = document.querySelector("form");
const countryErrorSpan = document.querySelector(
    `.form-group.country .error`,
);

// Submit button
form.addEventListener("submit", (event) => {

    inputs.forEach((input) => {
        if (input.value.trim().length === 0) {
            input.required = true;
        }
    })
    // if the email field is invalid
    event.preventDefault();
    log(email.validity.valid);
    if (!email.validity.valid) {
        // display an appropriate error message
        log("hello");
        const emailError = document.querySelector(".form-group.email .error");

        showEmailError(email, emailError);
    }

    if (!country.validity.valid) {
        // display an appropriate error message

        showDropDownError(country, countryErrorSpan);
    }

    if (!postalCode.validity.valid) {
        // display an appropriate error message
        const postalCodeErrorSpan = document.querySelector(
            `.form-group.postalCode .error`,
        );
        showPostalCodeError(postalCode, postalCodeErrorSpan);
    }
});

function showEmailError(input, errorMessageSpan) {
    if (input.validity.valueMissing) {
        // If empty
        errorMessageSpan.textContent = "You need to enter an email address.";
    } else if (input.validity.typeMismatch) {
        // If it's not an email address,
        errorMessageSpan.textContent =
            "Entered value needs to be an email address.";
    } else if (input.validity.tooShort) {
        // If the value is too short,
        errorMessageSpan.textContent = `Email should be at least ${email.minLength} characters; you entered ${input.value.length}.`;
    }

    log(errorMessageSpan.textContent);
    // Add the `active` class
    errorMessageSpan.className = "error active";
}

function showDropDownError(input, errorMessageSpan) {
    // log(country.validity)
    if (input.validity.valueMissing) {
        errorMessageSpan.textContent = "Please select an option from the list.";
    }

    errorMessageSpan.className = "error active";
}

function showPostalCodeError(input, errorMessageSpan) {
    if (input.validity.valueMissing) {
        errorMessageSpan.textContent = "You need to enter a postal code.";
    } else if (input.validity.tooLong) {
        // If the value is too long,
        errorMessageSpan.textContent = `Postal code should be 
            less than ${input.minLength} characters; you entered ${input.value.length}.`;
    }

    errorMessageSpan.className = "error active";
}

country.addEventListener('change', () => {
    if (country.validity.valid) {
        countryErrorSpan.textContent = ""; // Remove the message content
        countryErrorSpan.className = "error"; // Removes the 
    }
})

const actions = {
    showEmailError: showEmailError,
    showPostalCodeError: showPostalCodeError
};
