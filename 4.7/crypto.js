import bcrypt from 'bcrypt'

const password = '1234567'
//should be stored in .env
const salt = 8

//callback
bcrypt.hash(password, salt, (err, hash) => {
    if (err) console.log(err)
    else console.log('callback hash:', hash)
});

//await
const awaitedHash = await bcrypt.hash(password, salt)
console.log('awaitedHash', awaitedHash)

//then
bcrypt.hash(password, salt).then(hash => console.log('then: ', hash))

//sync
const syncHash = bcrypt.hashSync(password, salt)
console.log('syncHash:', syncHash)

const hashToCheck = "$2b$08$NWoEa16iXo3rHm2BjyZqN.iRvPPr9Cix3jYydNi//ey4pjlDnkFeu"
bcrypt.compare(password, hashToCheck, (err, res) => {
    console.log('compare res:', res)
})

//$2b$08$1sBhH47ajs48H9VL2z/eCeR1YQqxPAFD56t5Ulz0WCAoZZECjQda.
//$2b$08$NWoEa16iXo3rHm2BjyZqN.iRvPPr9Cix3jYydNi//ey4pjlDnkFeu
//$2b$08$QwnETE4T3Opj1T2YeaW4M.FiafBZewYogGCg.AakjIHP4Y7RuTR8G
//$2b$08$HQROdrmdJKnQtfH/6UvHb.mta0nzheTkg0yNmK.UOQXgYKAdDUR/e
