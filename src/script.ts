import normalizeTransaction from "./normalizeTransaction.js";
import fetchData from "./fetchData.js";
import Estatistics from "./Estatistics.js";
import { CountList } from "./countBy.js";

async function handleData() {
  const data = await fetchData<TransactionAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if (!data) return;
  const transactions = data.map(normalizeTransaction);
  fillTable(transactions);
  fillStatistics(transactions);
}

function fillStatistics(transactions: Transaction[]): void {
  const data = new Estatistics(transactions);

  fillList(data.payment, "payment");
  fillList(data.status, "status");

  const totalElement = document.querySelector<HTMLElement>("#total span");

  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  const dayElement = document.querySelector<HTMLElement>("#day");

  if (dayElement) {
    dayElement.innerText = data.betterDay[0];
  }
}

function fillList(list: CountList, countainerId: string): void {
  const containerElement = document.getElementById(countainerId);
  if (containerElement) {
    Object.keys(list).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${list[key]}</p>`;
    });
  }
}

function fillTable(transactions: Transaction[]): void {
  const table = document.querySelector("#transactions tbody");
  if (!table) return;

  transactions.forEach((transaction) => {
    table.innerHTML += `
      <tr>
        <td>${transaction.nome}</td>
        <td>${transaction.email}</td>
        <td>R$ ${transaction.moeda}</td>
        <td>${transaction.pagamento}</td>
        <td>${transaction.status}</td>
      </tr>
    `;
  });
}

handleData();
