import mongoose from 'mongoose';
import { authorSchema } from './authorSchema.js';

const chatCollectionName = 'mensajes';

const chatSchema = new mongoose.Schema({
    autor: { type: authorSchema, required: true },
    text: { type: String, required: true }
}, { versionKey: false });

chatSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    }
});

const chatModel = mongoose.model(chatCollectionName, chatSchema);

export { chatSchema, chatModel };