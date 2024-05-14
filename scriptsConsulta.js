// variaveis DOM

const btnExcluirDespesa = document.querySelector("#btnExcluirDespesa");
const conteinerDespesas = document.querySelector("#conteinerDespesas");
const valorTotal = document.querySelector("#valorTotal");

// variaveis de logica

let contValor = 0;
let subtraiu = false;

//const  = document.querySelector("");

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
      data.textContent = element.data;

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

      if (subtraiu != true) {
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
}

let despesas = new Despesas(listaDespesas.lerDespesas());

// lista de eventos

window.addEventListener("DOMContentLoaded", () => {
  despesas.imprimirDespesas(despesas.listaDespesas, conteinerDespesas);
});
