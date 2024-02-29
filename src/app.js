import express from "express"
import handlebars from "express-handlebars";
import viewRouter from './routes/views.router.js'
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import {__dirname} from "./utils.js";
import { Server } from "socket.io";

const app = express()
const httpServer = app.listen(8080,()=>console.log("Server up"))
const socketServer = new Server(httpServer)

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars');
app.set('socketServer',socketServer)

app.use(express.static(__dirname+'/public'))
app.use('/', viewRouter)

app.use('/api/products/',productsRouter)
app.use('/api/carts/', cartsRouter)
