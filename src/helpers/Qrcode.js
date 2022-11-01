import QRCode from "qrcode";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from 'path';

const generateQrcodeImage = (data) => {
    const promise = new Promise((resolve, reject) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const imagesDirecory = path.join(__dirname, "../data/images/");

        QRCode.toFile(imagesDirecory + data.id  + '.png',
            `${data.text}`,
            {
                width: "1000",
                color: {
                    dark: data.color,
                    light: data.background
                }
            },
            function (err) {
                if (err) reject()
                if (!err) resolve(`imagesDirecory ${+ Math.random()}+.png`)
            }
        )
    })

    return promise
}

export default generateQrcodeImage