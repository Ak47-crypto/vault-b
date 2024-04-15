import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const directory = '/var/task/vault-b-backend/middlewares/public/temp/';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname, 'public', 'temp'))
        if (fs.existsSync(directory))
        console.log("temp folder exist")
        else
        console.log("not exist");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
        console.log(file.originalname)
    }
})
export const upload = multer({storage})
