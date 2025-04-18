export const useValidation = () => {
    function Email(value) {
        let response = {
            isValid: false,
            message: '',
        }
        if (value === undefined) {
            response.isValid = false;
        } else if (value.length <= 0) {
            response.message = 'Field cannot be empty'
        } else if (!value.includes('@')) {
            response.message = `Email have to include '@'`
        } else {
            let domain = value.split('@')[1]
            let domainLevels = domain.split('.')
            if (domain.includes('.') &&
                domainLevels.length === 2 &&
                domainLevels[0].length > 0 &&
                domainLevels[1].length > 0 ) {
                response.isValid = true
            } else {
                response.message = `Invalid email domain`
            }
        }
        return response
    }

    function Password(value) {
        const lengthRule = [6, 24]
        let response = {
            isValid: false,
            message: '',
        }
        if (value === undefined) {
            response.isValid = false;
        } else if (value.length < lengthRule[0]) {
            response.message = `Password is too short`
        } else if (value.length > lengthRule[1]) {
            response.message = `Password is too long`
        } else {
            response.isValid = true
        }
        return response

    }

    function Username(value) {
        const lengthRule = [3, 24]

        let response = {
            isValid: false,
            message: '',
        }
        if (value === undefined) {
            response.isValid = false;
        } else if (value.length < lengthRule[0]) {
            response.message = `Username is too short`
        } else if (value.length > lengthRule[1]) {
            response.message = `Username is too long`
        } else {
            response.isValid = true
        }
        return response

    }

    function ConfirmationCode(value) {
        let response = {
            isValid: false,
            message: '',
        }
        if (value === undefined) {
            response.isValid = false;
        } else if (value >= 10000 && value <= 99999) {
            response.isValid = true
        }
        return response
    }


    return {
        Password,
        Username,
        Email,
        ConfirmationCode,
    }
}