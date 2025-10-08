import Cliente from "../Models/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO {

    async gravar(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = ` 
            INSERT INTO clientes 
            (cli_cpf, cli_nome, cli_email, cli_telefone, cli_rua, cli_cidade, cli_estado, cli_cep, cli_data_cadastro) 
            VALUES (?,?,?,?,?,?,?,?,?)
             `;
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

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
    async alterar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `
            UPDATE clientes 
            SET cli_nome = ?, cli_email = ?, cli_telefone = ?, cli_rua = ?, 
                cli_cidade = ?, cli_estado = ?, cli_cep = ?, cli_dataCadastro = ?, 
            WHERE cli_cpf = ?
            `;
            const parametros = [
                
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.rua,
                cliente.cidade,
                cliente.estado,
                cliente.cep,
                cliente.dataCadastro,
                cliente.cpf
            ];

            await conexao.execute(sql, parametros);
            conexao.release();  //devolve conexão para o pool

        }
    }
    async excluir(cliente){
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = "DELETE FROM clientes WHERE cli_cpf = ?";
            const parametros = [cliente.cpf];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
  async consultar() {
    const conexao = await conectar();
    const sql = `
    SELECT 
        c.cli_cpf,
        c.cli_nome,
        c.cli_email,
        l.list_id,
        l.liv_id,
        l.list_data_interesse
    FROM clientes c
    INNER JOIN lista_espera l ON c.cli_cpf = l.cli_cpf
    LIMIT 0, 1000;
  `;
  
  const [registros] = await conexao.query(sql);
  await conexao.release();

  let listaEspera = [];
  for(const registro of registros){
    const cliente = new Cliente (
        registro.cli_cpf,
        registro.cli_nome,
        registro.cli_email
    );

    const espera = new ListaEspera(
        registro.list_id,
        cliente,
        registro.liv_id,
        registro.list_data_interesse
    );

    listaEspera.push(espera);

  } 

  return listaEspera;
}

async consultarPorCPF(cpf) {
  const conexao = await conectar();
  const sql = `
    SELECT 
        c.cli_cpf,
        c.cli_nome,
        c.cli_email,
        l.list_id,
        l.liv_id,
        l.list_data_interesse
    FROM clientes c
    INNER JOIN lista_espera l ON c.cli_cpf = l.cli_cpf
    WHERE c.cli_cpf = ?
  `;
  
  const [registros] = await conexao.query(sql, [cpf]);
  await conexao.release();

  let listaEspera = [];
  for (const registro of registros) {
    const cliente = new Cliente(
      registro.cli_cpf,
      registro.cli_nome,
      registro.cli_email
    );

    const espera = new ListaEspera(   // 👈 use "ListaEspera" (classe) e não "listaEspera"
      registro.list_id,
      cliente,
      registro.liv_id,
      registro.list_data_interesse
    );

    listaEspera.push(espera);
  }

  return listaEspera;
}


}