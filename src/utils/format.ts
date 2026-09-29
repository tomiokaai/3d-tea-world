export function formatBrewingTime(seconds: number) {
  const minutes = Math.round(seconds / 60)
  if (minutes < 1) return `${seconds}s`
  return `${minutes} min`
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`
}
