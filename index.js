// Test for HearX : Blessing Raolane : 15 August 2020.
// Bind onSubmit;


document.getElementById('mainForm').addEventListener('submit', (event) => {
    // Stop the form from submitting manually;
    event.preventDefault();

    // Make sure no input wrapper show as error.
    clearAllErrors();

    const formData = new FormData(event.target);
    const { error, data } = processData(formData);
    const toastBox = document.getElementById('toast');

    if (error) {
        toastBox.style.backgroundColor = 'red';
        toastBox.innerText = error.message;
        const element = document.getElementById(error.inputKey);
        element.style.border = '1px solid red';
        return;
    }
    toastBox.style.backgroundColor = 'green';
    toastBox.innerText = "Account successfully created.";

    // Clearn form
    document.forms[0].reset();
    console.log('capturedData', data);
});

function clearAllErrors() {
    var all = document.getElementsByClassName('wrapper');
    for (var i = 0; i < all.length; i++) {
        all[i].style.border = '1px solid rgba(0, 0, 0, .1)';
    }
}

// Put all inputs that need to be validated here, with message for non-null/required as base.
// @Hapi/Joi has a similar definition structure.

const inputObjects = [{
    key: 'first_name',
    validate: {
        base: "First Name cannot be empty"
    }
}, {
    key: 'last_name',
    validate: {
        base: "Last Name cannot be empty"
    }
}, {
    key: 'contact_number',
    match: /^\d+$/,
    validate: {
        base: "Contact number is required",
        match: "Contact number should be a number"
    }
}, {
    key: 'email',
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    validate: {
        base: "Provide Email Address",
        match: "Email is not valid"
    }
},
{
    key: 'gender',
    validate: {
        base: "Select an option for gender"
    }
}];

function processData(formData) {
    const inputs = inputObjects;
    const data = {};

    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const key = input.key;
        const value = formData.get(key);

        if (!value) {
            // Send back error object, 
            return {
                error: {
                    message: input.validate.base,
                    inputKey: key
                }
            };
        }

        if (input.match && !input.match.test(value)) {
            // Send back error object for regex matches, 
            return {
                error: {
                    message: input.validate.match,
                    inputKey: key
                }
            };
        }
        // Populate the data object;
        data[key] = value;
    }
    return {
        data: data,
    };
}