export const required = value => (value ? undefined : "Required");

export const mustBeNumber = value => (value !== undefined && isNaN(value) ? "Must be a number" : undefined);

export const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const maxValue = max => value =>
    isNaN(value) || value <= max ? undefined : `Should be less than ${max}`;


export function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return "Invalid Credit Card Number";

    return luhnCheck(number) ? undefined : "Invalid Credit Card Number";
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);