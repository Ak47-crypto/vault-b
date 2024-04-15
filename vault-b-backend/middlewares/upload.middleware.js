import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { tmpdir } from 'os';
const directory = '/var/task/vault-b-backend/tmp/';

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
        cb(null,'./')
        if (fs.existsSync(directory))
        console.log(" folder exist",directory)
        else
        console.log("not exist",directory,"temp dir",tmpdir());
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
        console.log(file.originalname)
    }
})
export const upload = multer({storage})
