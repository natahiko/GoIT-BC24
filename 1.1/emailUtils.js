import validator from 'validator'

export function isNewUser(email) {
    if(validator.isEmail(email)) {
        global.ERROR_MESSAGE = "hello"
        console.log('Yey, new user', email)
    } else {
        console.log(global.ERROR_MESSAGE)
    }
}

export function test() {
    console.log('test')
}
