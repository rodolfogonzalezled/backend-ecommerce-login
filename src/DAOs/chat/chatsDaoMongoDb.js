import MongoContainer from '../../contenedores/ContenedorMongoDb.js';
import { chatModel } from '../../models/chatSchema.js';


export default class ChatsMongoDBDao extends MongoContainer {
    constructor() {
        super(chatModel);
    }
    async desconectar() {
    }
}