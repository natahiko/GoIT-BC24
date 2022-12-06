import express from "express";
import multer from 'multer'
import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from 'url';

const router = express.Router();
const ALLOWED = ['.png', '.jpg']

const upload = multer({dest: 'uploads/',
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname)
        if(!ALLOWED.includes(ext)) {
            return callback( new Error('Only images allowed!'))
        }
        callback(null, true)
    }})

const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.post('/', upload.single('avatar'), async (req, res, next) => {
    try {
        const url =  await uploadFile(req.file)
        res.json({url})
    } catch (err) {
        await fs.unlink(tempPath)
        next(err)
    }
})

async function uploadFile(file) {
    const { originalname, path: tempPath } = file;
    const newPath = path.join(__dirname, '../uploadedImages', originalname)
    await fs.rename(tempPath, newPath)
    return `http://${process.env.HOST}:${process.env.PORT}/images/${originalname}`
}

router.post('/many', upload.array('avatars'), async (req, res, next) => {
    // req.files.forEach(async file => {
    //     await uploadFile(file)
    // })

    const results = await Promise.all(req.files.map(file => uploadFile(file)))
    res.json(results)
})


export default router
