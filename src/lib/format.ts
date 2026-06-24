/** Format a numeric price as a New Taiwan Dollar string, e.g. 2999 -> "NT$ 2,999". */
export function formatPrice(amount: number): string {
  return `NT$ ${amount.toLocaleString('zh-TW')}`
}
