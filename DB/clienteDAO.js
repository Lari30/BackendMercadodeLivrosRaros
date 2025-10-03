import Cliente from "../Models/cliente";
import conectar from "./conexao.js";

export default class ClienteDAO {

    async gravar(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "INSERT INTO clientes (cli_cpf, cli_nome, cli_email, cli_telefone, cli_rua, cli_cidade, cli_estado, cli_cep, cli_data_cadastro) VALUE (?,?,?,?,?,?,?,?,?) ";
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.rua,
                cliente.cidade,
                cliente.estado,
                cliente.cep,
                cliente.dataCadastro
            ];
        }
    }
    async alterar(cliente){}
    async excluir(cliente){}
    async consultar(){}
}