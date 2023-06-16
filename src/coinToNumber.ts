/**
 *
 * Receber string '1.200,50' retorna number: 1200.50
 */
export default function coinToNumber(coin: string): number | null {
  const number = Number(coin.replaceAll(".", "").replaceAll(",", "."));
  return isNaN(number) ? null : number;
}
