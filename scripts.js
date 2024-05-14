// variaveis DOM

const modal = document.querySelector(".modal");
const tituloModalCadastro = document.querySelector("#tituloModalCadastro");
const iconeFecharModal = document.querySelector("#iconeFecharModal");
const btnModalVoltar = document.querySelector("#btnModalVoltar");
const BtnAddDespesa = document.querySelector("#BtnAddDespesa");
const descricao = document.querySelector("#descricao");
const tipo = document.querySelector("#tipo");
const tipoValorOriginal = tipo.value;
const valor = document.querySelector("#valor");
const msgCadastro = document.querySelector("#msgCadastro");

//const  = document.querySelector("");

// orientação a objetos

class Modal {
  constructor(modal) {
    this.modal = modal;
  }
  fecharModal() {
    this.modal.style.display = "none";
  }
  abrirModal() {
    this.modal.style.display = "flex";
  }
}

class ModalCentral extends Modal {
  constructor(modalPrincipal, titulo, mensagem, botao) {
    super(modalPrincipal);
    this.titulo = titulo;
    this.mensagem = mensagem;
    this.botao = botao;
  }
  sucessoCadastro() {
    this.abrirModal();
    this.titulo.textContent = "Cadastro bem sucedido";
    this.titulo.style.color = "green";
    this.mensagem.textContent = "Despesa adicionada com sucesso";
    this.botao.style.backgroundColor = "green";
  }
  erroCadastro() {
    this.abrirModal();
    this.titulo.textContent = "Erro ao cadastrar despesa";
    this.titulo.style.color = "red";
    this.mensagem.innerText = "Não foi possível adicionar despesa";
    this.botao.style.backgroundColor = "red";
  }
}

class Despesa {
  constructor(tipo, descricao, valor) {
    this.ano = new Date().getFullYear();
    this.mes = new Date().getMonth();
    this.dia = new Date().getDay();
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }
}

const SalvarDespesa = {
  salvar(despesa) {
    if (localStorage.getItem("listaDespesas")) {
      let despesas = JSON.parse(localStorage.getItem("listaDespesas"));
      despesas.push(despesa);
      localStorage.setItem("listaDespesas", JSON.stringify(despesas));
    } else {
      let despesas = [despesa];
      localStorage.setItem("listaDespesas", JSON.stringify(despesas));
    }
  },
};

class Campos extends ModalCentral {
  constructor(modalPrincipal, titulo, mensagem, botao) {
    super(modalPrincipal, titulo, mensagem, botao);
  }
  validaCampos(tipo, descricao, valor) {
    let valorNumero = Number(valor.value);
    if (
      tipo.value !== tipoValorOriginal &&
      isNaN(Number(descricao.value)) &&
      descricao.value !== "" &&
      !isNaN(valorNumero) &&
      valor.value !== ""
    ) {
      this.sucessoCadastro();

      SalvarDespesa.salvar(
        new Despesa(tipo.value, descricao.value, valorNumero)
      );
      this.zeraCampos(tipo, descricao, valor);
    } else {
      this.erroCadastro();
    }
  }
  zeraCampos(tipo, descricao, valor) {
    tipo.value = tipoValorOriginal;
    descricao.value = "";
    valor.value = "";
  }
}

let campos = new Campos(
  modal,
  tituloModalCadastro,
  msgCadastro,
  btnModalVoltar
);

// eventos
window.addEventListener("beforeunload", () => {});
btnModalVoltar.addEventListener("click", () => {
  campos.fecharModal();
});
iconeFecharModal.addEventListener("click", () => {
  campos.fecharModal();
});
BtnAddDespesa.addEventListener("click", () => {
  campos.validaCampos(tipo, descricao, valor);
});
