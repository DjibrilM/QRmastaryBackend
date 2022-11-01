import mongoose from 'mongoose';
const { Schema } = mongoose;

const QRschema = new Schema({
    background: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
});

const schema = mongoose.model('QRimage', QRschema);
export default schema