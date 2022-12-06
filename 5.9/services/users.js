import User from "../schemas/user.js";

//from lecture 3.6

export const getUsers = (search, page = 0, limit = 10) => {
    return User.find({ name: new RegExp(search, 'i'), isDeleted: {$ne: true}}).skip(limit * page).limit(limit).sort('-name');
}

export const createUser = (user) => {
    return User.create(user);
}

export const getUserById = (id) => {
    return User.findById(id, {isDeleted: {$ne: true}});
}

export const softDeleteUserById = (id) => {
    return User.updateOne({_id: id}, {$set: {isDeleted: true}})
}

export const updateUserById = (id, fieldsToUpdate) => {
    return User.findByIdAndUpdate(id, fieldsToUpdate, {new: true})
}
