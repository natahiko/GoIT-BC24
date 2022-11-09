import { getUsers, createUser, getUserById, deleteUserById, softDeleteUserById, updateUserById} from "../services/users.js";

export const get = async (req, res, next) => {
    try{
        const search = req.query.search;
        const users = await getUsers(search)
        res.json(users)
    } catch (e) {
        console.log('fail during find users')
        next(e)
    }
}

export const post = async (req,res,next) => {
    try{
        const user = req.body;
        const createdUser = await createUser(user)
        res.json(createdUser)
    } catch (e) {
        console.log(e)
        res.status(400).json(e.message)
    }
}

export const getById = async (req, res) => {
    try{
        const id = req.params.id
        const user = await getUserById(id)
        res.json(user)
    } catch (e) {
        res.status(404).json(e)
    }
}

//hard delete
export const deleteById = async (req, res) => {
    try{
        const id = req.params.id
        const deletedUser = await deleteUserById(id)
        res.json(deletedUser)
    }catch (e){
        res.statusCode(500).send(e.message)
    }
}

//soft delete - recommended for production
export const softDeleteById =  async (req, res) => {
    try{
        const id = req.params.id
        const deletedUser = await softDeleteUserById(id)
        res.json(deletedUser)
    }catch (e){
        res.statusCode(500).send(e.message)
    }
}

export const updateById = async (req,res, next) => {
    try{
        const id = req.params.id;
        const fieldsToUpdate = req.body;
        const updatedUser = await updateUserById(id, fieldsToUpdate)
        res.json(updatedUser)
    } catch (e) {
        console.log('fail during update user by id')
        next(e)
    }
}

export const updateStatusById = async (req,res, next) => {
    try{
        const id = req.params.id;
        const status = req.body.status;
        const updatedUser = await updateUserById(id, {status})
        res.json(updatedUser)
    } catch (e) {
        console.log('fail during update user by id')
        next(e)
    }
}
