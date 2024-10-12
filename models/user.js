import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: [true, 'Email already exists']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters abd be unique!"]
    },
    image: {
        type: String
    }

});



const User = models.User || model('User', userSchema);


export default User;