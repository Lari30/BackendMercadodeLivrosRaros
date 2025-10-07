import Livro from "../Models/livros.js";
import conectar from "./conexao.js";

export default class LivroDAO {

    async gravar(livro){
        if(livro instanceof Livro){
            const conexao = await conectar();
            const sql = `
                INSERT INTO livros 
                (liv_titulo, liv_autor, liv_ano_publicacao, liv_editora, liv_genero, liv_descricao, liv_preco, liv_raridade) 
                VALUES (?,?,?,?,?,?,?,?)
            
            `;
            const parametros = [
            livro.titulo ?? null,
            livro.autor ?? null,
            livro.anoPublicacao ?? null,
            livro.editora ?? null,
            livro.genero ?? null,
            livro.descricao ?? null,
            livro.preco ?? null,
            livro.raridade ?? null,
      ];
      const [result] = await conexao.execute(sql, parametros);
      await conexao.release();

      livro.id = result.insertId;
    }
  }
    async alterar(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql = `
        UPDATE livros SET 
          liv_titulo = ?, 
          liv_autor = ?, 
          liv_ano_publicacao = ?, 
          liv_editora = ?, 
          liv_genero = ?, 
          liv_descricao = ?, 
          liv_preco = ?, 
          liv_raridade = ? 
        WHERE liv_id = ?
      `;
      const parametros = [
        livro.titulo ?? null,
        livro.autor ?? null,
        livro.anoPublicacao ?? null,
        livro.editora ?? null,
        livro.genero ?? null,
        livro.descricao ?? null,
        livro.preco ?? null,
        livro.raridade ?? null,
        livro.id ?? null,
      ];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  
  async excluir(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql = "DELETE FROM livros WHERE liv_id = ?";
      const parametros = [livro.id ?? null];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }

  
  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * FROM livros ORDER BY liv_titulo";
    const [registros] = await conexao.query(sql);
    await conexao.release();

    let lista = [];
    for (const registro of registros) {
      const livro = new Livro(
        registro.liv_id,
        registro.liv_titulo,
        registro.liv_autor,
        registro.liv_ano_publicacao,
        registro.liv_editora,
        registro.liv_genero,
        registro.liv_descricao,
        registro.liv_preco,
        registro.liv_raridade,
        registro.liv_data_cadastro
      );
      lista.push(livro);
    }
    return lista;
  }
}

