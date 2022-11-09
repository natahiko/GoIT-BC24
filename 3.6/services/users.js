import User from "../schemas/user.js";

export const getUsers = (search) => {
    return User.find({ name: new RegExp(search, 'i'), isDeleted: {$ne: true}});
}

export const createUser = (user) => {
    return User.create(user);
}

export const getUserById = (id) => {
    return User.findById(id);
}

export const deleteUserById = (id) => {
    return User.findByIdAndDelete(id)
}

export const softDeleteUserById = (id) => {
    return User.updateOne({_id: id}, {$set: {isDeleted: true}})
}

export const updateUserById = (id, fieldsToUpdate) => {
    return User.findByIdAndUpdate(id, fieldsToUpdate, {new: true})
}
