import app from "./src/app.js";
import * as dotenv from "dotenv";
import cors from "cors";
import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import swaggerOptions from './src/docs/head.js';


dotenv.config()

const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.listen(port, () =>{
    console.log(`Servidor escutando em http://localhost:${port}`)
})