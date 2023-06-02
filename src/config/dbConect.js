import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( response => {
    console.log('MongoDB Connection Succeeded.')
}).catch(error => {
    console.log('Error in DB connection:' + error)
});


let db = mongoose.connection;

export default db;