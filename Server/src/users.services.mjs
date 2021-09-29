import { User } from "./db/User.model.mjs";
import mongo from 'mongodb';
const { ObjectId } = mongo;

export function getUsers() {
    return User.find();
}

export async function deleteUser(userId) {
    return User.findOneAndDelete({_id: ObjectId(userId)});
}

export async function editUser(id, newUser) {
    return User.findOneAndUpdate(
        {_id: ObjectId(id)},
        newUser
    );
}

export async function addToWishlist(id, movieId){
    const user = await User.findOne({_id: ObjectId(id)});
    if(user.wishlist.includes(movieId)) {
        const index = user.wishlist.indexOf(movieId);
        user.wishlist.splice(index, 1);
    } else {
        user.wishlist.push(movieId);
    }
    return user.save();   
}


// export async function editUser(id, movieId) {
//     const user = await getUserID(id);
//     if (user){
//         user.wishlist.push(movieId);
//         return user.save();
//     }else console.log('No user');
 

//     // return User.findOneAndUpdate(
//     //     {_id: ObjectId(id)},
//     //     newUser
//     // );
// }

export async function addUser(user) {
    const newUser = new User(user);
    return newUser.save();
}

export async function getUserID(id) {
    return User.findOne({_id: ObjectId(id)});
}


// export async function getUser(email) {
//     return User.findOne({email: email});
// }

export async function signup(email, username, password) {
    const newUser = new User({email, username, password});
    const user = await User.findOne({email, password});

    console.log(user);

    if (user){
        return false;
    }else{
    return newUser.save();
    }
}

export async function login(email, password) {
        const user = await User.findOne({email, password});
        console.log('user server: ', user);
        return (user);
    }

