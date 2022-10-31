import generateQrcodeImage from "../helpers/Qrcode.js"
import fs from "fs"
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const createQrImage = (req, res, next) => {
    const { text, color, background } = req.body;

    generateQrcodeImage({ color: color, background: background, text: text })
        .then(result => {
            return res.status(202).json({ message: "created" })
        }).catch(error => {
            console.log(error)
            return res.status(500).json({ message: "server error" })
        })
}

export const getImageBystream = (req, res, next) => {
    const id = req.params.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const directory = path.join(__dirname, '../data/images/' + id + '.png');
    const image = fs.createReadStream(directory, (data, error) => {
        if (error) return res.status(404).json({ message: "image not found" })
    })

    image.pipe(res);
}
