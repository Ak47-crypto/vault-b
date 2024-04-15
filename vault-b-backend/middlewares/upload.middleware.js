import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const directory = '/var/task/vault-b-backend/static/';

// try {
//     fs.mkdirSync(directory, { recursive: true });
//     console.log('Directory created successfully:', directory);
// } catch (err) {
//     console.error('Error creating directory:', err);
// }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname, 'static', 'temp'))
        if (fs.existsSync(directory))
        console.log(" folder exist",directory)
        else
        console.log("not exist",directory);
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
        console.log(file.originalname)
    }
})
export const upload = multer({storage})
