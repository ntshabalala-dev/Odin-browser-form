import "../src/main.css";

// Inputs
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postalCode = document.querySelector("#postalCode");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const form = document.querySelector("form");
const countryErrorSpan = document.querySelector(`.form-group.country .error`);
// All text inputs
const inputs = document.querySelectorAll(".form-group input");

function passwordConfirmation(onSubmit = false) {
    const confirmPasswordErrorSpan = document.querySelector(
        `.form-group.confirmPassword .error`,
    );

    if (onSubmit) {
        if (confirmPassword.value !== password.value) {
            confirmPasswordErrorSpan.textContent = "Passwords do not match.";
            confirmPasswordErrorSpan.className = "error active";
        }
    } else if (confirmPassword.value !== "" && password.value !== "") {
        if (confirmPassword.value !== password.value) {
            confirmPasswordErrorSpan.textContent = "Passwords do not match.";
            confirmPasswordErrorSpan.className = "error active";
        } else {
            confirmPasswordErrorSpan.className = "error";
            confirmPasswordErrorSpan.textContent = "";
        }
    }
}

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

    errorMessageSpan.className = "error active";
}

function showDropDownError(input, errorMessageSpan) {
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

function showPasswordError(input, errorMessageSpan) {
    if (input.validity.valueMissing) {
        errorMessageSpan.textContent = "You need to enter a password.";
    } else if (input.validity.tooShort) {
        // If the value is too long,
        errorMessageSpan.textContent = `Password should be 
            more than ${input.minLength} characters; you entered ${input.value.length}.`;
    }

    errorMessageSpan.className = "error active";
}

function showConfirmPasswordError(input, errorMessageSpan) {
    if (input.validity.valueMissing) {
        errorMessageSpan.textContent = "You need to confirm your password.";
    }

    errorMessageSpan.className = "error active";

    passwordConfirmation();
}

// Maps an input id to the function that renders its error message.
// Used by `validateField` to dispatch to the right handler at runtime.
const actions = {
    showEmailError: showEmailError,
    showPostalCodeError: showPostalCodeError,
    showPasswordError: showPasswordError,
    showConfirmPasswordError: showConfirmPasswordError,
};

// Attach a live validation listener to every text input.
inputs.forEach((input) => {
    // Each input has a matching error span stored under `.form-group.<id> .error`.
    const errorName = input.id;
    const error = document.querySelector(`.form-group.${errorName} .error`);

    // Validate as the user types.
    input.addEventListener("input", () => {
        // An empty field shouldn't be blocked by `required` while typing.
        if (input.value.trim().length === 0) {
            input.required = false;
        }

        validateField(input, error, errorName);
    });

    // Validate the moment the user leaves the field.
    input.addEventListener("blur", () => {
        // Leaving a required field empty is an error, so enforce `required` now.
        if (input.value.trim().length === 0) {
            input.required = true;
        }

        validateField(input, error, errorName);
    });
});

// Validate a single field: clear its error when valid, otherwise show the
// matching error message. Also re-checks password match for the password fields.
function validateField(input, error, errorName) {
    if (input.validity.valid) {
        error.textContent = ""; // Remove the message content
        error.className = "error"; // Removes the `active` class
    } else {
        // Build the matching handler name, e.g. `showEmailError`, from the id.
        const s = errorName.charAt(0).toUpperCase() + errorName.slice(1);
        const functionName = `show${s}Error`;
        actions[functionName](input, error);
    }

    // Re-check password match whenever either password field changes.
    if (input.id === "confirmPassword" || input.id === "password") {
        passwordConfirmation();
    }
}

form.addEventListener("submit", (event) => {
    // Keep the browser from submitting so we can validate everything ourselves.
    event.preventDefault();

    // On submit, empty fields should count as invalid (unlike while typing).
    inputs.forEach((input) => {
        if (input.value.trim().length === 0) {
            input.required = true;
        }
    });

    // Show the right error for each field that fails validation.
    if (!email.validity.valid) {
        const emailError = document.querySelector(".form-group.email .error");

        showEmailError(email, emailError);
    }

    if (!country.validity.valid) {
        showDropDownError(country, countryErrorSpan);
    }

    if (!postalCode.validity.valid) {
        const postalCodeErrorSpan = document.querySelector(
            `.form-group.postalCode .error`,
        );
        showPostalCodeError(postalCode, postalCodeErrorSpan);
    }

    if (!password.validity.valid) {
        const passwordErrorSpan = document.querySelector(
            `.form-group.password .error`,
        );

        showPasswordError(password, passwordErrorSpan);
    }

    if (!confirmPassword.validity.valid) {
        const confirmPasswordErrorSpan = document.querySelector(
            `.form-group.confirmPassword .error`,
        );

        showConfirmPasswordError(confirmPassword, confirmPasswordErrorSpan);
    } else {
        // Valid but might not match — force a final match check.
        passwordConfirmation(true);
    }
});

country.addEventListener("change", () => {
    if (country.validity.valid) {
        countryErrorSpan.textContent = ""; // Remove the message content
        countryErrorSpan.className = "error"; // Removes the
    }
});
