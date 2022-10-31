export default function nameChecker(req, res, next) {
    console.log('here name')
    if(req.body.name === 'nata') req.body.name = 'natali'
    if(req.body.name === 'natasha') {
        res.send('No no no!')
    } else {
        next()
    }
}
