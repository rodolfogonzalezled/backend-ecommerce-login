import mongoose from 'mongoose';

export const authorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true }
});

authorSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    }
});
