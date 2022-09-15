import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import { carts, chat, products } from './src/DAOs/index.js';
import { config } from './src/Config/config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import viewsRouter from './src/routes/views.router.js';
import productsRouter from './src/routes/product.router.js';
import cartsRouter from './src/routes/cart.router.js';
import chatRouter from './src/routes/chat.router.js';
import sessionRouter from './src/routes/session.router.js';
import passport from 'passport';
import initializePassport from './src/Config/passport.config.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.urlMongoDB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 10000
    }),
    secret: config.secretSession,
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());

app.use('/', viewsRouter);
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartsRouter);
app.use('/api/mensajes', chatRouter);
app.use('/api/session', sessionRouter);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));               // con http://localhost:9090/
app.set("views", "./public/views");
app.set("view engine", "ejs");

// --- Conexión del Servidor ------------------------------------------------------------
const PORT = config.port;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
});
connectedServer.on("error", error => console.log(`Error en servidor ${error}`));
// --------------------------------------------------------------------------------------

// ----- WEBSOCKETS ----------------------------------------------------------------------
io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    socket.emit("productos", await products.getAll());
    socket.on('buscarProducto', async () => {
        socket.emit("productos", await products.getAll());
    });

    socket.emit("mensajes", await chat.getAll());
    socket.on('mensajeNuevo', async data => {
        chat.add(data);
        socket.emit("mensajes", await chat.getAll());
    });

    socket.on("borrarMensajes", async (autor) => {
        chat.deleteByAutor(autor);
        socket.emit("mensajes", await chat.getAll());
    });

    socket.on("borrarMensajesPorId", async (id) => {
        await chat.deleteById(id);
        socket.emit("mensajes", await chat.getAll());
    });

    socket.on('buscarCarrito', async (id) => {
        socket.emit("carritos", await carts.getById(id));
    });
});
