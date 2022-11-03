import { scheduleJob } from "node-schedule";
import fs from "fs";
import QRschema from "../database/schemas/QRschema.js";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from 'path';

export const deleteQRimage = (id) => {
    const DataRef = new Date();
    const initialMinute = DataRef.getMinutes();
    DataRef.setMinutes(initialMinute + 5);
    
    scheduleJob(DataRef, () => {

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = path.join(__dirname, "../data/images/" + id + '.png');


        fs.unlink(filePath, (result, err) => {
            if (err) console.log(err)
        })

        QRschema.findByIdAndDelete(id)
    });
}
