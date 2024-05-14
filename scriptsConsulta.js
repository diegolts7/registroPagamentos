// variaveis DOM

const btnExcluirDespesa = document.querySelector("#btnExcluirDespesa");
const conteinerDespesas = document.querySelector("#conteinerDespesas");
const valorTotal = document.querySelector("#valorTotal");
const pesquisarDespesas = document.querySelector("#pesquisarDespesas");
const inputValor = document.querySelector("#valor");
const inputDescricao = document.querySelector("#descricao");
const selectTipo = document.querySelector("#tipo");
const valorOriginalelectTipo = selectTipo.value;
const inputcampoDia = document.querySelector("#campoDia");
const inputcampoMes = document.querySelector("#campoMes");
const inputcampoAno = document.querySelector("#campoAno");

//const  = document.querySelector("");

// variaveis de logica

let contValor = 0;
let subtraiu = false;
let pesquisa = false;

// orientação a objetos

const listaDespesas = {
  lerDespesas() {
    return localStorage.getItem("listaDespesas")
      ? JSON.parse(localStorage.getItem("listaDespesas"))
      : [];
  },
  SalvarDespesas(listaDespesas) {
    localStorage.setItem("listaDespesas", JSON.stringify(listaDespesas));
  },
};

const ZeraCampos = {
  zerar() {
    inputDescricao.value = "";
    inputValor.value = "";
    inputcampoAno.value = "";
    inputcampoDia.value = "";
    inputcampoMes.value = "";
    selectTipo.value = valorOriginalelectTipo;
  },
};

class Campos {
  constructor(dia, mes, ano, tipo, descricao, valor) {
    this.dia = dia;
    this.mes = mes;
    this.ano = ano;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }
  camposNulo() {
    if (
      this.descricao === "" &&
      this.dia === "" &&
      this.mes === "" &&
      this.valor === "" &&
      this.tipo === valorOriginalelectTipo
    ) {
      return true;
    }
    return false;
  }
}

class Despesas {
  constructor(listaDespesas) {
    this.listaDespesas = listaDespesas;
  }
  imprimirDespesas(array, conteiner) {
    conteiner.innerHTML = "";

    array.forEach((element, indice) => {
      let linha = document.createElement("tr");
      linha.id = `${indice}`;

      let data = document.createElement("td");
      data.textContent = `${element.dia}/${element.mes}/${element.ano}`;

      let tipo = document.createElement("td");
      tipo.textContent = element.tipo;

      let descricao = document.createElement("td");
      descricao.textContent = element.descricao;

      let valor = document.createElement("td");
      valor.textContent = `${element.valor} R$`;

      let colunaExcluir = document.createElement("td");

      let btnExcluir = document.createElement("button");
      btnExcluir.setAttribute("class", "btn btn-primary");
      btnExcluir.style.backgroundColor = "red";

      btnExcluir.addEventListener("click", () => {
        subtraiu = true;
        contValor = contValor - element.valor;

        if (contValor !== 0) {
          valorTotal.textContent = `Total ${contValor} R$`;
        } else {
          valorTotal.textContent = "";
        }

        this.excluirDespesa(indice, conteiner);
        linha.remove();
      });

      let iconeBtn = document.createElement("i");
      iconeBtn.setAttribute("class", "bx bx-x");
      iconeBtn.style.fontSize = "20px";

      conteiner.appendChild(linha);
      linha.appendChild(data);
      linha.appendChild(tipo);
      linha.appendChild(descricao);
      linha.appendChild(valor);
      btnExcluir.appendChild(iconeBtn);
      colunaExcluir.appendChild(btnExcluir);
      linha.appendChild(colunaExcluir);

      if (subtraiu !== true && pesquisa !== true) {
        contValor += element.valor;
        valorTotal.textContent = `Total: ${contValor} R$`;
      }
    });
  }
  excluirDespesa(indice, conteiner) {
    this.listaDespesas.splice(indice, 1);
    listaDespesas.SalvarDespesas(this.listaDespesas);
    this.imprimirDespesas(this.listaDespesas, conteiner);
  }
  pesquisar(camposNulo, campos, conteiner) {
    pesquisa = true;

    if (camposNulo) {
      this.imprimirDespesas(this.listaDespesas, conteiner);
    } else {
      let listaFiltro = this.listaDespesas.filter((element) => {
        return (
          element.dia === Number(campos.dia) ||
          element.mes === Number(campos.mes) ||
          element.ano === Number(campos.ano) ||
          element.tipo === campos.tipo ||
          element.descricao
            .slice(
              0,
              campos.descricao !== ""
                ? campos.descricao.length
                : element.descricao.length
            )
            .trim() === campos.descricao.trim() ||
          element.valor === Number(campos.valor)
        );
      });

      this.imprimirDespesas(listaFiltro, conteiner);
      ZeraCampos.zerar();
    }
  }
}

let despesas = new Despesas(listaDespesas.lerDespesas());

// lista de eventos

window.addEventListener("DOMContentLoaded", () => {
  despesas.imprimirDespesas(despesas.listaDespesas, conteinerDespesas);
});
pesquisarDespesas.addEventListener("click", () => {
  let todosCampos = new Campos(
    inputcampoDia.value,
    inputcampoMes.value,
    inputcampoAno.value,
    selectTipo.value,
    inputDescricao.value,
    inputValor.value
  );
  despesas.pesquisar(todosCampos.camposNulo(), todosCampos, conteinerDespesas);
});
