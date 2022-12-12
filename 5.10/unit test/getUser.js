const getFullName = require('./getFullName.js')

function getUser (firstName, lastName, date = new Date()) {
    if(firstName === '' || lastName === '')
        return null
    return {
        firstName,
        lastName,
        fullName: getFullName(firstName, lastName),
        company: 'GoIT',
        createdAt: date
    }
}

module.exports = getUser
