import express from "express";
const router = express.Router();

router.post('/', (req, res) => {
    const params = req.body;
    res.render(params)
})

router.get('/:id', (req, res) => {
    res.send('hello unique user')
})

export default router
