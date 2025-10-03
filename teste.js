import Cliente from "./Models/cliente.js";


const cliente = new Cliente("Larissa", "larynha_santos@yahoo.com.br", "376.182.308-89", "(18)98156-1129", "Julio Peruche, 725", "Presidente Prudente", "SP", "19026-260", ["Romance"]);

cliente.cep = "54321-678";
console.log(cliente.toString());