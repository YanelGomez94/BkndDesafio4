import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url) //leyendo url del archivo
const __dirname2 =  dirname(__filename)

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null,__dirname2+'/public/images')
    },
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})
export const __dirname = dirname(__filename)
export const uploader = multer({storage})