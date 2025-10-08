import Livro from "../Models/livros.js";

export default class LivroController {

  gravar(requisicao, resposta) {
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      if (dados.titulo && dados.autor && dados.anoPublicacao && dados.editora && dados.genero && dados.descricao && dados.preco && dados.raridade) {
        const livro = new Livro(
          null,
          dados.titulo,
          dados.autor,
          dados.anoPublicacao,
          dados.editora,
          dados.genero,
          dados.descricao,
          dados.preco,
          dados.raridade
        );

        livro.gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Livro gravado com sucesso"
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o livro: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados do livro (Título, Autor, Ano de Publicação, Editora, Gênero, Descrição, Preço, Raridade)"
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
      const id = requisicao.params.id;
      if (id && dados.titulo && dados.autor && dados.anoPublicacao && dados.editora && dados.genero && dados.descricao && dados.preco && dados.raridade) {
        const livro = new Livro(
          id,
          dados.titulo,
          dados.autor,
          dados.anoPublicacao,
          dados.editora,
          dados.genero,
          dados.descricao,
          dados.preco,
          dados.raridade
        );

        livro.alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Livro atualizado com sucesso"
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o livro: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados do livro (Título, Autor, Ano de Publicação, Editora, Gênero, Descrição, Preço, Raridade). O ID deve ser informado na URL."
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
      const id = requisicao.params.id;
      if (id) {
        const livro = new Livro(id);
        livro.excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Livro excluído com sucesso"
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o livro: " + erro.message
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o ID do livro para exclusão"
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
      const id = requisicao.params.id;
      const livro = new Livro();
      if (id) {
        livro.consultarPorId(id)
          .then((resultado) => {
            resposta.status(200).json(resultado);
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar livro: " + erro.message
            });
          });
      } else {
        livro.consultar()
          .then((resultado) => {
            resposta.status(200).json(resultado);
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar livros: " + erro.message
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
