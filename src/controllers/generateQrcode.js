import generateQrcodeImage from "../helpers/Qrcode.js"
import fs from "fs"
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import QRschema from "../database/schemas/QRschema.js";
import { deleteQRimage } from "../helpers/schedule.js"


export const createQrImage = async (req, res, next) => {
    const { text, color, background } = req.body;

    try {
        const createImage = await new QRschema({
            text: text,
            background: background,
            color: color
        })

        const generateImage = await generateQrcodeImage({
            color: color,
            background: background,
            text: text,
            id: createImage.id
        })

        deleteQRimage(createImage.id)

        return res.status(202).json({
            message: "image created",
            id: createImage.id,
            data: { ...createImage }
        })
    } catch (error) {
        return res.status(501).json({ message: "server err" })
    }
}

export const getImageBystream = async (req, res, next) => {
    const id = req.params.id;
    const createImage = QRschema.findById(id)
    if (!createImage) return res.status(404).json({ message: "Enable to find the image." })

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const directory = path.join(__dirname, '../data/images/' + id + '.png');
    const image = fs.createReadStream(directory, (data, error) => {
        if (error) return res.status(404).json({ message: "image not found" })
    })

    image.pipe(res);
}
