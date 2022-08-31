import { Router } from "express";
import { chat } from '../DAOs/index.js';
import { normalize, schema, denormalize } from 'normalizr';

const router = Router();

router.get('/normalizados', async (req, res) => {
    let mensajes = await chat.getAll();
    let mensajesJson = JSON.parse(JSON.stringify(mensajes));
    let objNormalizar = {
        id: 'mensaje',
        mensajes: mensajesJson
    };

    const autorSchema = new schema.Entity('autor', {}, { idAttribute: "email" });
    const mensajesSchema = new schema.Entity('mensajes', { autor: autorSchema });
    const chatSchema = new schema.Entity('chat', { mensajes: [mensajesSchema] });
    const normalizedData = normalize(objNormalizar, chatSchema);

    // const denormalizedObject = denormalize(normalizedData.result, chatSchema, normalizedData.entities);
    // console.log(JSON.stringify(denormalizedObject, null, '\t'))

    res.json(normalizedData);
});

router.get('/:id?', async (req, res) => {
    let mensajes;
    if (req.params.id) {
        mensajes = await chat.getById(req.params.id)
    } else {
        mensajes = await chat.getAll()
    }
    res.json(mensajes ?? { error: "Mensaje no encontrado" });
});

router.post('/', async (req, res) => {
    res.json({ id: await chat.add(req.body) });
});

export default router;