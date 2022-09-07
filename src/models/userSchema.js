import mongoose from 'mongoose';

const userCollectionName = 'usuarios';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    }
});

const userModel = mongoose.model(userCollectionName, userSchema);

export { userSchema, userModel };