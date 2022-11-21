import sha256 from 'crypto-js/sha256.js'

const secret = "sdfsdfsddf"

const hash = sha256("edghj" + secret).toString()

console.log('hash', hash)

