import express from "express";
import { readFile, writeFile } from "fs/promises";
const router = express.Router();

const FILENAME = './cats.json'
let cats = JSON.parse(await readFile(FILENAME))

// GET /cats
router.get('/', (req, res) => {
    res.json(cats)
})
// POST /cats
router.post('/', async (req, res) => {
    //TODO: add validation
    const newCat = {
        id: new Date().getTime().toString(),
        ...req.body
    };
    cats.push(newCat)
    await writeFile(FILENAME, JSON.stringify(cats))
    res.status(201).send('created')
})
// GET /cats/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const cat = cats.find(cat => cat.id === id)
    res.json(cat)
})
// PUT /cats/:id
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    //TODO: validation
    const updatedCat = {
        id,
        ...req.body
    };
    const catIndex = cats.findIndex(cat => cat.id === id)
    if(catIndex < 0) {
        //add a new one
        cats.push(updatedCat)
    } else {
        //update existed one
        cats[catIndex] = updatedCat;
    }
    await writeFile(FILENAME, JSON.stringify(cats))
    res.json(catIndex > 0 ? cats[catIndex] : updatedCat)
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const cat = cats.find(cat => cat.id === id)
    if(!cat) {
        res.status(404).send('oh, sorry! Cat not found')
        return;
    }
    cats = cats.filter(cat => cat.id !== id)
    await writeFile(FILENAME, JSON.stringify(cats))
    res.json(cat)
})

export default router
