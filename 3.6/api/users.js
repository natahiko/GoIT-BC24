import express from "express";
import * as UserController from '../contollers/users.js'

const router = express.Router();

router.get('/', UserController.get)
router.post('/', UserController.post)

router.get('/:id', UserController.getById)
router.delete('/:id', UserController.softDeleteById)
router.put('/:id', UserController.updateById)

router.patch('/:id/statuses', UserController.updateStatusById)

export default router
