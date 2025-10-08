import ClienteDAO from "../DB/clienteDAO.js";

export default class Cliente {
    
    #nome
    #email
    #cpf
    #telefone
    #rua
    #cidade
    #estado
    #cep
    #preferenciasLiterais
    #dataCadastro

    constructor(nome = "", email = "", cpf = "", telefone = "", rua = "", cidade = "", estado = "", cep = "", preferenciasLiterarias = []) {
    
    this.#nome = nome;
    this.#email = email;
    this.#cpf = cpf;
    this.#telefone = telefone;
    this.#rua = rua;
    this.#cidade = cidade;
    this.#estado = estado;
    this.#cep = cep;
    this.#preferenciasLiterais = preferenciasLiterarias; 
    this.dataCadastro = new Date(); 
  }

    get nome(){
        return this.#nome
    }

    set nome(nome) {
        this.#nome = nome
    }

    get email(){
        return this.#email
    }

    set email(email) {
        this.#email = email
    }

    get cpf(){
        return this.#cpf
    }

    set cpf(cpf) {
        this.#cpf = cpf
    }

    get telefone(){
        return this.#telefone
    }

    set telefone(telefone) {
        this.#telefone = telefone
    }

    get rua(){
        return this.#rua
    }

    set rua(rua) {
        this.#rua = rua
    }

    get cidade(){
        return this.#cidade
    }

    set cidade(cidade) {
        this.#cidade = cidade
    }

    get estado(){
        return this.#estado
    }

    set estado(estado) {
        this.#estado = estado
    }
    get cep(){
        return this.#cep
    }

    set cep(cep) {
        this.#cep = cep
    }

    get preferenciasLiterarias(){
        return this.#preferenciasLiterais
    }

    set preferenciasLiterarias(preferenciasLiterarias) {
        this.#preferenciasLiterais = preferenciasLiterarias
    }

    get dataCadastro(){
        return this.#dataCadastro
    }

    set dataCadastro(dataCadastro) {
        this.#dataCadastro = dataCadastro
    }

    toString(){
        return `
            Nome Completo: ${this.#nome}\n
            E-mail: ${this.#email}\n
            CPF: ${this.#cpf}\n
            Telefone: ${this.#telefone}\n
            Rua: ${this.#rua}\n
            Cidade: ${this.#cidade}\n
            Estado: ${this.#estado}\n
            CEP: ${this.#cep}\n
            Preferências Literais: ${this.#preferenciasLiterais}\n
            Data Cadastro: ${this.#dataCadastro}\n

        
        `;
    }

     async gravar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
     }

     async alterar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
     }

     async excluir(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
     }

     async consultar(){
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar();
     }

     async consultarPorCPF(cpf){
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(cpf);
     }



}