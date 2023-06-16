import coinToNumber from "./coinToNumber.js";
import stringToDate from "./stringToDate.js";

declare global {
  type TransactionPagamento = "Boleto" | "Cartão de Crédito";
  type TransactionStatus =
    | "Paga"
    | "Recusada pela Operadora de cartão"
    | "Aguardando Pagamento"
    | "Estornada";

  export interface TransactionAPI {
    Nome: string;
    ID: number;
    Data: string;
    Status: TransactionStatus;
    Email: string;
    ["Valor (R$)"]: string;
    ["Forma de Pagamento"]: TransactionPagamento;
    ["Cliente Novo"]: number;
  }

  interface Transaction {
    nome: string;
    id: number;
    data: Date;
    dataNormal: string;
    status: TransactionStatus;
    email: string;
    moeda: string;
    valor: number | null;
    pagamento: TransactionPagamento;
    novo: boolean;
  }
}

export default function normalizeTransaction(
  transaction: TransactionAPI
): Transaction {
  return {
    nome: transaction.Nome,
    id: transaction.ID,
    data: stringToDate(transaction.Data),
    dataNormal: transaction.Data,
    status: transaction.Status,
    email: transaction.Email,
    moeda: transaction["Valor (R$)"],
    valor: coinToNumber(transaction["Valor (R$)"]),
    pagamento: transaction["Forma de Pagamento"],
    novo: Boolean(transaction["Cliente Novo"]),
  };
}
