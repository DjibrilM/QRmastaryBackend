import mongoose, { mongo } from "mongoose";

export default class database {
 static    connect() {
        mongoose.connect("mongodb+srv://djibrilM:djibril2004@cluster0.qep8sf2.mongodb.net/?retryWrites=true&w=majority")
            .then(connection => {
                console.log('connected')
            }).catch(err => {
                console.log(err, 'authentication fails')
            })
    }
}