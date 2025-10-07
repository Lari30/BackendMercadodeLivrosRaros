import LivrosDAO from "../DB/livroDAO.js";
export default class Livros{
    #id; 
    #titulo;
    #autor;
    #anoPublicacao;
    #editora;
    #genero;
    #descricao;
    #preco;
    #raridade;
    #dataCadastro;

    constructor(id, titulo, autor, anoPublicacao, editora, genero, descricao, preco, raridade, dataCadastro = new Date()) {
    this.#id = id;
    this.#titulo = titulo;
    this.#autor = autor;
    this.#anoPublicacao = anoPublicacao;
    this.#editora = editora;
    this.#genero = genero;
    this.#descricao = descricao;
    this.#preco = preco;
    this.#raridade = raridade;
    this.#dataCadastro = dataCadastro;
  }

    get id() {return this.#id;}
    set id(id) {this.#id = id;}

    get titulo() { return this.#titulo;}
    set titulo(titulo) {this.#titulo = titulo;}

    get autor() {return this.#autor;}
    set autor(autor) { this.#autor = autor;}

    get anoPublicacao() {return this.#anoPublicacao;}
    set anoPublicacao(anoPublicacao) {this.#anoPublicacao = anoPublicacao;}

    get editora() {return this.#editora;}
    set editora(editora) {this.#editora = editora;}

    get genero() {return this.#genero;}
    set genero(genero) {this.#genero = genero;}

    get descricao() {return this.#descricao;}
    set descricao(descricao) {this.#descricao = descricao;}

    get preco() {return this.#preco;}
    set preco(preco) {this.#preco = preco;}

    get raridade() {return this.#raridade;}
    set raridade(raridade) {this.#raridade = raridade;}

    get dataCadastro() {return this.#dataCadastro;}
    set dataCadastro(dataCadastro) {this.#dataCadastro = dataCadastro;}

    toJSON(){
        return {
            id: this.#id,
            titulo: this.#titulo,
            Autor: this.#autor,
            AnoPublicação: this.#anoPublicacao,
            Editora: this.#editora,
            Gênero: this.#genero,
            Descrição: this.#descricao,
            Preço: this.#preco,
            Raridade: this.#raridade,
            dataCadastro: this.#dataCadastro
        }
    }

    async gravar(){
        const livroDAO = new LivrosDAO();
        await livroDAO.gravar(this);
    }
    async alterar(){
        const livroDAO = new LivrosDAO();
        await livroDAO.alterar(this);
    }
    async excluir(){
        const livroDAO = new LivrosDAO();
        await livroDAO.excluir(this);
    }
    async consultar(){
        const livroDAO = new LivrosDAO();
        return await livroDAO.consultar()
    }


}