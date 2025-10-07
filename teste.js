import Cliente from "./Models/cliente.js";
import Livros from "./Models/livros.js";


//const cliente = new Cliente("Larissa", "larynha_santos@yahoo.com.br", "376.182.308-89", "(18)98156-1129", "Julio Peruche, 725", "Presidente Prudente", "SP", "19026-260", ["Romance"]);
const cliente = new Cliente("Rose", "financeiro.madeireirase@hotmail.com", "206.471.838-97", "(18)99132-1113", "Rua Romeu Cavalcante, 54", "Presidente Prudente", "SP", "19050-180", ["Ficção"]);

await cliente.gravar();
console.log("Cliente gravado com sucesso.");


//const livro = new Livros(null,'Dom Casmurro', 'Machado de Assis', 1989, 'Editora Garnier', 'Romance', 'Edição rara e original', 1200.00, 'raro');
//const livro2 = new Livros(null,'O Guarani', 'José de Alencar', 1957, 'Typographia Nacional', 'Romance', 'Primeira edição', 1500.00, 'muito raro');

//await livro2.gravar();
//console.log("Livro gravado com sucesso.");
//console.log("O livro recebeu o seguinte id: " + livro2.id);