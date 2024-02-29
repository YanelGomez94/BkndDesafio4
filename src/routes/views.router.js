import { Router } from "express"
import ProductManager from '../managers/ProductManager.js'

const router = Router()
const manager = new ProductManager('../data/productos.json')

router.get('/',async(req,res)=>{
    let {limit} = req.query
    try {
        const products = await manager.getProducts()
        if(limit){
            const limited = products.slice(0,limit)
            res.render('home',{
                style:'index.css',
                limited
            })
        }else{
            res.render('home',{
                style:'index.css',
                products  
            })
        }
    } catch (error) {
        res.status(400).send({status:"Error", error: "Failed to load products"})
    }
})

router.get('/realtimeproducts', async(req,res)=>{
    try {
        const products = await manager.getProducts()
        const socketServer = req.app.get('socketServer');
        socketServer.on('connection', socket =>{
            console.log('Cliente conectado')
            socket.emit('productosActualizados',products)
        })
        res.render('realTimeProducts',{ })
    } catch (error) {
        res.status(400).send({status:"Error", error: "Failed to load products"})
    } 
})

export default router;