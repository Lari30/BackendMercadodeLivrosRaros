import Cliente from "../Models/cliente.js";

export default class ClienteController {

  gravar(requisicao, resposta) {
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      if (dados.cpf && dados.nome && dados.email && dados.telefone && dados.endereco && dados.estado) {
        const cliente = new Cliente(dados.cpf, dados.nome, dados.email, dados.telefone, dados.endereco, dados.estado);
        cliente.gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Cliente gravado com sucesso"
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o cliente: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados do cliente (CPF, Nome, Email, Telefone, Endereço, Estado)"
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  };

  alterar(requisicao, resposta) {
    if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cpf = requisicao.params.cpf;
      if (cpf && dados.nome && dados.email && dados.telefone && dados.endereco && dados.estado) {
        const cliente = new Cliente(cpf, dados.nome, dados.email, dados.telefone, dados.endereco, dados.estado);
        cliente.alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Cliente atualizado com sucesso"
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o cliente: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados do cliente (Nome, Email, Telefone, Endereço, Estado). O CPF deve ser informado na url."
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  }

  excluir(requisicao, resposta) {
    if (requisicao.method === "DELETE") {
      const cpf = requisicao.params.cpf;
      if (cpf) {
        const cliente = new Cliente();
        cliente.consultarPorCPF(cpf)
          .then((listaEspera) => {
            const cliente = listaEspera[0];
            if (cliente) {
              cliente.excluir()
                .then(() => {
                  resposta.status(200).json({
                    status: true,
                    mensagem: "Cliente excluído com sucesso"
                  });
                })
                .catch((erro) => {
                  resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao excluir o cliente: " + erro.message
                  });
                });
            } else {
              resposta.status(400).json({
                status: false,
                mensagem: "Cliente não encontrado para exclusão"
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao buscar cliente: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o CPF do cliente"
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  }

  consultar(requisicao, resposta) {
    if (requisicao.method === "GET") {
      const cpf = requisicao.params.cpf;
      const cliente = new Cliente();
      if (cpf) {
        cliente.consultarPorCPF(cpf)
          .then((resultado) => {
            resposta.status(200).json(resultado);
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar cliente: " + erro.message
            });
          });
      } else {
        cliente.consultar()
          .then((resultado) => {
            resposta.status(200).json(resultado);
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar clientes: " + erro.message
            });
          });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida"
      });
    }
  }
}
