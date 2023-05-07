import app from "./src/app.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`Servidor escutando em http://localhost:${port}`)
})