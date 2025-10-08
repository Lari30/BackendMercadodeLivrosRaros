import express from 'express';
import clienteRouter from './Routes/rotaCliente.js';

const hostname = '0.0.0.0';
const port = 4000;

const app = express();

app.use(express.json());


app.use("/cliente", clienteRouter);

app.listen(port, hostname, () =>  {
    console.log(`Servidor rodando em http://${hostname}:${port}`);
});

